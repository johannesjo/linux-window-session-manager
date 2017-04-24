const x11 = require('x11');
const x11prop = require('x11-prop');
const getProperty = x11prop.get_property;
const setProperty = x11prop.set_property;
let X;
let root;
let CFG = {
  GIVE_X11_TIME_TIMEOUT: 50,
};
const TEST_WIN_ID = 79691844;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    setState: wrapX11(setState),
    goToViewport: wrapX11(goToViewport),
    restoreWindowPosition: wrapX11(restoreWindowPosition),
  };
};

// Get all windows via:
// xprop -root|grep ^_NET_CLIENT_LIST

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
              X.terminate();
              return Promise.resolve(...arguments);
            });
        } else {
          X.terminate();
        }
        return mainFnResult;
      });
  };
}

//const testFn = wrapX11(goToViewport);
//testFn(0, 0);

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

function initX11() {
  return new Promise((fulfill, reject) => {
    x11.createClient((err, display) => {
      if (err) {
        reject(err);
      } else {
        X = display.client;
        root = display.screen[0].root;
        fulfill();
      }
    }).on('error', (err) => {
      console.error(err);
    });
  });
}

// METHODS
// -------
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
      });
  });
}

function goToViewport(x, y) {
  return sendX11ClientMessage(root, '_NET_DESKTOP_VIEWPORT', [
      { value: x },
      { value: y },
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
    { value: action },
  ];

  // all properties need to be looked up for their atom id
  statesToHandle.forEach((stateProperty) => {
    properties.push({
      isAtom: true,
      value: stateProperty,
    });
  });
  return sendX11ClientMessage(wid, '_NET_WM_STATE', properties);
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

function sendX11ClientMessage(wid, eventName, eventProperties, optionalEventMask) {
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
  });
}

//X.require('render', function (err, Render) {
//  X.Render = Render;

//X.MoveWindow(TEST_WIN_ID, -50, -50);
//X.MoveResizeWindow(TEST_WIN_ID, -50, -50, 800, 800);

//X.GetProperty(0, TEST_WIN_ID, X.atoms.WM_CLASS, X.atoms.STRING, 0, 10000000, (err, prop) => {
//  console.log('HERE', prop.data, prop.data.toString());
//});

//X.GetWindowAttributes(TEST_WIN_ID, function (err, res) {
//  console.log(err, res);
//});
//X.GetGeometry(TEST_WIN_ID, (err, res) => {
//  console.log(err, res);
//});
//X.QueryTree(TEST_WIN_ID, true, (err, res) => {
//  console.log(err, res);
//})

//getProperty(X, TEST_WIN_ID, 'WM_CLASS', 'STRING', (err, res) => {
//  if (!err) {
//    console.log(res);
//    const newRes = decodeBuffer(res);
//    console.log(newRes, 'ASD');
//  }
//});
//

//
//function decodeBuffer(input) {
//  function decode(bufferToDecode) {
//    if (Buffer.isBuffer(bufferToDecode)) {
//      return bufferToDecode.toString();
//    } else {
//      return bufferToDecode;
//    }
//  }
//
//  if (Array.isArray(input)) {
//    const parsedArray = [];
//    input.forEach((entry) => {
//      parsedArray.push(decode(entry));
//    });
//    return parsedArray;
//  } else {
//    return decode(input);
//  }
//}