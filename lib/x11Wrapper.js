'use strict';

const x11 = require('x11');
let X;
let root;
let CFG = {
  GIVE_X11_TIME_TIMEOUT: 50,
};
let X11Client;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    setState: wrapX11(setState),
    goToViewport: wrapX11(goToViewport),
    restoreWindowPosition: wrapX11(restoreWindowPosition),
    getWindowGeometry: wrapX11(getWindowGeometry),
    closeWindow: wrapX11(closeWindow),
    goToWorkspace: wrapX11(goToWorkspace),
    getWindowInfo: wrapX11(getWindowInfo),
    X
  };
};

function catchGenericErr(err) {
  console.error('x11Wrapper: ', err, err.stack);
}

function wrapX11(fn) {
  return function () {
    const args = arguments;
    const that = this;

    return initX11()
      .then(() => {
        const mainFnResult = fn.apply(that, args);
        if (mainFnResult && mainFnResult.then) {
          mainFnResult
            .then(function () {
              // instead of this:
              // return Promise.resolve(...arguments);
              // we use this to be compatible with older versions of node
              return Promise.resolve.apply(Promise, arguments);
            }).catch(catchGenericErr);
        }
        return mainFnResult;
      }).catch(catchGenericErr);
  };
}

let isClientInitialized = false;
let initPromise;

function initX11() {
  console.log(initPromise, isClientInitialized);

  if (initPromise) {
    return initPromise;
  }
  initPromise = new Promise((fulfill, reject) => {
    if (isClientInitialized) {
      fulfill();
      return;
    }

    x11.createClient((err, display) => {
      if (err) {
        reject(err);
      } else {
        X = display.client;
        root = display.screen[0].root;
        isClientInitialized = true;
        fulfill();
      }
    }).on('error', (err) => {
      console.error(err);
    });
  }).catch(catchGenericErr);
  return initPromise;
}

// METHODS
// -------
function getWindowGeometry(winId) {
  const geo = {};

  return new Promise((fulfill, reject) => {
    X.TranslateCoordinates(winId, root, 0, 0, (err, res) => {
      if (err) {
        reject(err);
      } else {
        geo.x = res.destX;
        geo.y = res.destY;

        X.GetGeometry(winId, (err, res) => {
          if (err) {
            reject(err);
          } else {
            geo.width = res.width;
            geo.height = res.height;
            fulfill(geo);
          }
        });
      }
    });
  }).catch(catchGenericErr);
}

function restoreWindowPosition(win) {
  const STATES_TO_RESET = [
    '_NET_WM_STATE_MAXIMIZED_VERT',
    '_NET_WM_STATE_MAXIMIZED_HORZ'
  ];
  return new Promise((fulfill, reject) => {
    setState(win.windowId, 'remove', STATES_TO_RESET)
      .catch(reject)
      .then(() => {
        X.MoveResizeWindow(win.windowId, win.x, win.y, win.width, win.height);
        setState(win.windowId, 'add', win.states)
          .catch(reject)
          .then(() => {
            fulfill();
          });
      })
      .catch(reject);
  }).catch(catchGenericErr);
}

function closeWindow(winId) {
  return sendX11ClientMessage(winId, '_NET_CLOSE_WINDOW');
}

function goToWorkspace(winId, workSpaceNr) {
  // NOTE: if it doesn't work we might also want to use _WIN_WORKSPACE
  return sendX11ClientMessage(winId, '_NET_WM_DESKTOP', [{
    value: workSpaceNr,
  }]);
}

function goToViewport(x, y) {
  return sendX11ClientMessage(root, '_NET_DESKTOP_VIEWPORT', [
      {value: x},
      {value: y},
    ]
  );
}

function setState(wid, actionStr, statesToHandle) {
  const ACTIONS_MAP = {
    remove: 0,
    add: 1,
    toggle: 2,
  };
  const action = ACTIONS_MAP[actionStr];
  let properties = [
    {value: action},
  ];

  // all properties need to be looked up for their atom id
  if (Array.isArray(statesToHandle) && statesToHandle.length > 0) {
    statesToHandle.forEach((stateProperty) => {
      properties.push({
        isAtom: true,
        value: stateProperty,
      });
    });
    return sendX11ClientMessage(wid, '_NET_WM_STATE', properties);
  } else {
    return Promise.resolve();
  }
}

// HELPER
// ------
function counter(initialVal, modifier) {
  // to start at val we need to subtract the modifier first
  let val = initialVal - modifier;
  return () => {
    val += modifier;
    return val
  };
}

function getAtoms(list, cb) {
  const res = {};
  const getAtom = () => {
    if (list.length === 0) {
      return cb(null, res);
    } else {
      const name = list.shift();
      X.InternAtom(false, name, (err, atom) => {
        if (err) {
          return cb(err);
        } else {
          res[name] = atom;
          getAtom();
        }
      });
    }
  };
  getAtom();
}

// "WM_CLASS(STRING)": "wmClassName",
//   "_NET_WM_STATE(ATOM)": "states",
//   "_NET_WM_DESKTOP(CARDINAL)": "wmCurrentDesktopNr",
//   "WM_NAME(UTF8_STRING)": "wmTitle",
//   "_NET_WM_PID(CARDINAL)": "wmPid",
//   "_NET_WM_WINDOW_TYPE(ATOM)": "wmType",
//   "_BAMF_DESKTOP_FILE(STRING)": "executableFile"
function getWindowInfo(wid) {

  // X.GetWindowAttributes(wid, function (err, attrs) {
  //   console.log(err, attrs);
  // });

  // X.GetGeometry(wid, function (err, clientGeom) {
  //   console.log("window geometry: ", clientGeom);
  // });

  // X.GetProperty(0, wid, X.atoms.WM_CLASS, X.atoms.STRING, 0, 10000000, function (err, prop) {
  //   var propvalget = prop.data.toString();
  //   console.log(propvalget);
  //   console.log(propvalget.split('\u0000'));
  // });

  // X.ListProperties(wid, function (err, props) {
  //   props.forEach(function (p) {
  //     X.GetProperty(0, wid, p, 0, 0, 10000000, function (err, propValue) {
  //       X.GetAtomName(propValue.type, function (err, typeName) {
  //         X.GetAtomName(p, function (err, propName) {
  //           // decodeProperty(typeName, propValue.data, function (decodedData) {
  //           //   console.log(propName + '(' + typeName + ') = ' + decodedData);
  //           // });
  //         });
  //       });
  //     });
  //   })
  // });
  // X.on('event', console.log);
  // X.on('error', console.error);


  // const properties = new Promise((fulfil) => {
  //   X.ListProperties(wid, function (err, props) {
  //     setTimeout(() => {
  //       fulfil(props);
  //     }, 200);
  //   });
  // });
  //
  // properties.then((props) => {
  //   console.log(props);
  //   props.forEach((p) => {
  //     X.GetProperty(0, wid, p, X.atoms.STRING, 0, 100000000, function (err, prop) {
  //       var propvalget = prop.data.toString();
  //       console.log(propvalget);
  //       console.log(propvalget.split('\u0000'));
  //     });
  //   });
  // });

}


function sendX11ClientMessage(wid, eventName, eventProperties, optionalEventMask) {
  if (!eventProperties) {
    eventProperties = [];
  }

  if (eventProperties.length > 4) {
    throw 'only supports 4 properties at once max';
  }

  const offsetCounter = counter(4, 4);
  const eventMask = optionalEventMask || x11.eventMask.SubstructureRedirect;

  // create atoms to look up
  let atomsList = [];
  atomsList.push(eventName);
  eventProperties.forEach((eventProperty) => {
    if (eventProperty.isAtom) {
      atomsList.push(eventProperty.value);
    }
  });

  // start buffer input
  const data = new Buffer(32);
  data.fill(0);
  data.writeInt8(33, 0); // 33 = ClientMessage
  data.writeInt8(32, 1); // format
  data.writeUInt32LE(wid, offsetCounter());

  return new Promise((fulfill, reject) => {
    getAtoms(atomsList, (err, atoms) => {
      if (err) {
        reject(err);
        throw err;
      } else {
        data.writeUInt32LE(atoms[eventName], offsetCounter());

        eventProperties.forEach((eventProperty) => {
          if (eventProperty.isAtom) {
            data.writeUInt32LE(atoms[eventProperty.value], offsetCounter());
          } else {
            data.writeUInt32LE(eventProperty.value, offsetCounter());
          }
        });

        let sourceIndication = 1;
        data.writeUInt32LE(sourceIndication, offsetCounter());

        X.SendEvent(root, 0, eventMask, data);

        // we need a little time for the buffer to be processed
        setTimeout(fulfill, CFG.GIVE_X11_TIME_TIMEOUT);
      }
    });
  }).catch(catchGenericErr);
}

//const testFn = wrapX11(closeWindow);
//testFn('0x04a00001').then((geo) => {
//});

//const testFn = wrapX11(goToWorkspace);
//testFn('0x04e00001 ', 2);

//const testFnX = wrapX11(restoreWindowPosition);
//testFnX({
//  windowId: '0x04a00001',
//  x: 0,
//  y: 0,
//  width: 500,
//  height: 500,
//  states: [
//    '_NET_WM_STATE_MAXIMIZED_VERT'
//  ]
//});

//const testFn2 = wrapX11(setState);
//testFn2('0x04a00001', 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT', '_NET_WM_STATE_MAXIMIZED_HORZ', '_NET_WM_STATE_FULLSCREEN'])
//  .then((res) => {
//    console.log('NORMAL', res);
//  });
