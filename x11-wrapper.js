const x11 = require('x11');
const x11prop = require('x11-prop');
const getProperty = x11prop.get_property;
const setProperty = x11prop.set_property;
let X;
let root;
let CFG;
const TEST_WIN_ID = 79691844;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    setState: wrapX11(setState),
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
        if (mainFnResult.then) {
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

//const testFn = wrapX11(setState);

//testFn('0x04c00001', 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT', '_NET_WM_STATE_MAXIMIZED_HORZ', '_NET_WM_STATE_FULLSCREEN'])
//  .then((res) => {
//    console.log(res);
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

function setState(wid, actionP, props) {
  if (props.length > 3) {
    throw 'only supports 3 attributes at once max';
  }

  function offsetCounter() {
    offsetCounterOffset += 4;
    return offsetCounterOffset;
  }

  const type = '_NET_WM_STATE';
  let offsetCounterOffset = 0;
  const actions = {
    remove: 0,
    add: 1,
    toggle: 2,
  };
  const data = new Buffer(32);
  const action = actions[actionP];
  let atomsList = [];

  data.fill(0);
  data.writeInt8(33, 0); // 33 = ClientMessage
  data.writeInt8(32, 1); // format
  data.writeUInt32LE(wid, offsetCounter());

  atomsList.push(type);
  atomsList = atomsList.concat(props);

  return new Promise((fulfill, reject) => {
    getAtoms(atomsList, (err, atoms) => {
      if (err) {
        reject(err);
        throw err;
      } else {
        data.writeUInt32LE(atoms[type], offsetCounter());
        data.writeUInt32LE(action, offsetCounter());
        props.forEach((prop) => {
          data.writeUInt32LE(atoms[prop], offsetCounter());
        });
        let sourceIndication = 1;
        data.writeUInt32LE(sourceIndication, offsetCounter());

        X.SendEvent(root, 0, x11.eventMask.SubstructureRedirect, data);

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