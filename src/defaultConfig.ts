export const DEFAULT_CFG = {
  GIVE_X11_TIME_TIMEOUT: 80,
  POLL_ALL_APPS_STARTED_INTERVAL: 2000,
  POLL_ALL_MAX_TIMEOUT: 120000,
  SAVE_SESSION_IN_PRETTY_FORMAT: true,
  WM_CLASS_AND_EXECUTABLE_FILE_MAP: {
    "gnome-terminal-server.Gnome-terminal": "gnome-terminal",
    "google-chrome.Google-chrome": "google-chrome.desktop",
    "brave-browser.Brave-browser": "brave-browser.desktop",
    "Mail.Thunderbird": "thunderbird.desktop",
    "nautilus.Nautilus": "nautilus",
    "org.gnome.Nautilus.Org.gnome.Nautilus": "nautilus",
    "Navigator.Firefox": "firefox.desktop",
    "Navigator.Pale": "palemoon.desktop",
    "skype.Skype": "skypeforlinux.desktop",
    "sun-awt-X11-XFramePeer.jetbrains-idea": "jetbrains-idea.desktop",
    "VirtualBox.VirtualBox": "virtualbox.desktop",
    "Telegram.TelegramDesktop": "telegram-desktop_telegramdesktop.desktop",
    "telegram-desktop.TelegramDesktop": "telegramdesktop.desktop",
    "keepassxc.keepassxc": "keepassxc_keepassxc.desktop",
    "slack.Slack": "com.slack.Slack.desktop",
    "signal.Signal": "signal-desktop.desktop",
    "microsoft teams - preview.Microsoft Teams - Preview": "teams.desktop",
    "obsidian.obsidian": "md.obsidian.Obsidian.desktop"
  },
  WM_CLASS_EXCLUSIONS: [
    "N/A",
    "tilda.Tilda",
    "Popup.desktop",
    "update-manager.Update-manager",
    "desktop_window.Nautilus",
    "electron.Electron",
    "guake.Main.py",
    "gnome-software.Gnome-software"
  ],
  WM_META_MAP: {
    "WM_WINDOW_ROLE(STRING)": "wmRole",
    "WM_CLASS(STRING)": "wmClassName",
    "_NET_WM_STATE(ATOM)": "states",
    "_NET_WM_DESKTOP(CARDINAL)": "wmCurrentDesktopNr",
    "WM_NAME(UTF8_STRING)": "wmTitle",
    "_NET_WM_PID(CARDINAL)": "wmPid",
    "_NET_WM_WINDOW_TYPE(ATOM)": "wmType",
    "_BAMF_DESKTOP_FILE(STRING)": "executableFile"
  },
  WM_META_MAP_NUMBER_TYPES: [
    "_NET_WM_PID(CARDINAL)",
    "_NET_WM_DESKTOP(CARDINAL)"
  ],
  DESKTOP_FILE_LOCATIONS: [
    "{home}/.local/share/applications",
    "{home}/.gnome/apps",
    "/usr/share/applications",
    "/usr/local/share/applications",
    "/usr/share/app-install",
    "{home}/.config/autostart",
    "/var/lib/snapd/desktop/applications",
    "/var/lib/flatpak/app",
    "/var/lib/flatpak/exports/share/applications",
    "{home}/.local/share/flatpak/exports/share/applications",
    "/snap/bin"
  ]
};
