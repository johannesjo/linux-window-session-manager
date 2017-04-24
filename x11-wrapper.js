const x11 = require('x11');
const x11prop = require('x11-prop');
const getProperty = x11prop.get_property;
const setProperty = x11prop.set_property;
let X;
let root;

const STATE_INT = 393;
const TEST_WIN_ID = 79691844;
// const TEST_WIN_ID = 19490153;

// Get all windows via:
// xprop -root|grep ^_NET_CLIENT_LIST

x11.createClient(function (err, display) {
  X = display.client;
  root = display.screen[0].root;

  X.require('render', function (err, Render) {
    X.Render = Render;

    //X.MoveWindow(TEST_WIN_ID, -50, -50);
    //X.MoveResizeWindow(TEST_WIN_ID, -50, -50, 800, 800);

    X.GetProperty(0, TEST_WIN_ID, X.atoms.WM_CLASS, X.atoms.STRING, 0, 10000000, (err, prop) => {
      console.log('HERE', prop.data, prop.data.toString());
    });

    //X.GetWindowAttributes(TEST_WIN_ID, function (err, res) {
    //  console.log(err, res);
    //});
    X.GetGeometry(TEST_WIN_ID, (err, res) => {
      console.log(err, res);
    });
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

    getProperty(X, TEST_WIN_ID, '_NET_WM_STATE', (err, res) => {
      if (!err) {
        const newRes = decodeBuffer(res);
        console.log(newRes, 'ASD');
      } else {
        console.log(err);
      }
    });

    //setState(TEST_WIN_ID, 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT', '_NET_WM_STATE_MAXIMIZED_HORZ', '_NET_WM_STATE_FULLSCREEN']);
    //setState(TEST_WIN_ID, 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT', '_NET_WM_STATE_MAXIMIZED_HORZ', '_NET_WM_STATE_FULLSCREEN', '_NET_WM_STATE_ABOVE']);
    setState(TEST_WIN_ID, 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT']);
  });
}).on('error', function (err) {
  console.error(err);
}).on('event', function (ev) {
  console.log(ev);
});

function decodeBuffer(input) {
  function decode(bufferToDecode) {
    if (Buffer.isBuffer(bufferToDecode)) {
      return bufferToDecode.toString();
    } else {
      return bufferToDecode;
    }
  }

  if (Array.isArray(input)) {
    const parsedArray = [];
    input.forEach((entry) => {
      parsedArray.push(decode(entry));
    });
    return parsedArray;
  } else {
    return decode(input);
  }
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
  const data = new Buffer(48);
  const action = actions[actionP];
  let atomsList = [];

  data.fill(0);
  data.writeInt8(33, 0); // 33 = ClientMessage
  data.writeInt8(32, 1); // format
  data.writeUInt32LE(wid, offsetCounter());

  atomsList.push(type);
  atomsList = atomsList.concat(props);

  getAtoms(atomsList, (err, atoms) => {
    if (err) {
      throw err;
    }

    data.writeUInt32LE(atoms[type], offsetCounter());
    data.writeUInt32LE(action, offsetCounter());
    props.forEach((prop) => {
      data.writeUInt32LE(atoms[prop], offsetCounter());
    });
    let sourceIndication = 1;
    data.writeUInt32LE(sourceIndication, bitCounter());

    X.SendEvent(root, 0, x11.eventMask.SubstructureRedirect, data);
  });
}