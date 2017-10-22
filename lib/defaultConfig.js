module.exports = {
  "GIVE_X11_TIME_TIMEOUT": 80,
  "POLL_ALL_APPS_STARTED_INTERVAL": 2000,
  "POLL_ALL_MAX_TIMEOUT": 120000,
  "SAVE_SESSION_IN_PRETTY_FORMAT": true,
  "WM_CLASS_AND_EXECUTABLE_FILE_MAP": {
    "sun-awt-X11-XFramePeer.jetbrains-idea": "jetbrains-idea.desktop",
    "gnome-terminal-server.Gnome-terminal": "gnome-terminal",
    "VirtualBox.VirtualBox": "virtualbox.desktop",
    "Navigator.Firefox": "firefox.desktop",
    "Navigator.Pale": "palemoon.desktop",
    "nautilus.Nautilus": "nautilus.desktop"
  },
  "WM_CLASS_EXCLUSIONS": [
    "N/A",
    "tilda.Tilda",
    "Popup.desktop",
    "update-manager.Update-manager",
    "desktop_window.Nautilus",
    "electron.Electron",
    "guake.Main.py"
  ],
  "WM_META_MAP": {
    "WM_CLASS(STRING)": "wmClassName",
    "_NET_WM_STATE(ATOM)": "states",
    "_NET_WM_DESKTOP(CARDINAL)": "wmCurrentDesktopNr",
    "WM_NAME(UTF8_STRING)": "wmTitle",
    "_NET_WM_PID(CARDINAL)": "wmPid",
    "_NET_WM_WINDOW_TYPE(ATOM)": "wmType",
    "_BAMF_DESKTOP_FILE(STRING)": "executableFile"
  },
  "WM_META_MAP_NUMBER_TYPES": [
    "_NET_WM_PID(CARDINAL)",
    "_NET_WM_DESKTOP(CARDINAL)"
  ],
  "CMD": {
    "LOCATE": "locate",
    "GET_DISPLAY_ID": "xrandr --query | grep '[^s]connected '",
    "XPROP_ID": "xprop -id"
  }
};
