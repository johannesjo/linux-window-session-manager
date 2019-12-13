<p align="center"><img src="logo.png"></p>

<p align="center">
 <a href="https://badge.fury.io/js/linux-window-session-manager"><img src="https://badge.fury.io/js/linux-window-session-manager.svg"></a>
 <a href="https://lbesson.mit-license.org"><img alt="MIT license" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>

This is a library / command line tool that let's you save and reload your opened programs and the positions of their windows. 
Supports Unity and Gnome Desktops and possibly all other compositing window managers using X (including XWayland).
 
There's also a [companion tool in form of an indicator applet](https://github.com/johannesjo/linux-window-session-manger-indicator), a [gnome-shell-extension](https://github.com/johannesjo/gnome-shell-extension-window-session-manager) and a [Ulauncher extension](https://github.com/kpost/ulauncher-lwsm) if you like such things but this package can also be used standalone.
 
## Installation
NodeJs needs to be installed *properly* before you can use lwsm. [Have a look at google](https://www.google.com/search?q=install+node+as+user+ubuntu&oq=install+node+as+user+ubuntu&aqs=chrome..69i57.9161j0j7&sourceid=chrome&ie=UTF-8) if you need help with that. 

```
npm install -g linux-window-session-manager
```

For older distros, you also might need to install the `locate` command via `sudo apt-get install mlocate`. 
 
## Updating
```
npm update -g linux-window-session-manager
# (optional) delete config to update it to the newest version
rm ~/.lwsm/config.json
```
 
## CMD Usage

### Saving a session:
```
# save the current session to ~/.lwsm/sessionData/DEFAULT.json
lwsm save

# save the current session to ~/.lwsm/sessionData/my-session.json
lwsm save my-session   
```
Note that the session are stored for the specific display combination, you're currently running. If you want to store a different layout for when you have an external monitor plugged in this is possible. Just run the save command again for the same session. 


### Restoring a session:
```
# restore the session from ~/.lwsm/sessionData/DEFAULT.json
lwsm restore

# restore the session from ~/.lwsm/sessionData/my-session.json
lwsm restore my-session   

# gracefully close all running apps before starting the session
lwsm restore --closeAllOpenWindows
```

### List saved sessions:
```
lwsm list
```

### Rename a saved session:
```
lwsm rename oldName newName
```

### Adjusting the configuration:
You can manually edit the config file present at `~/.lwsm/config.json` and the session files in `~/.lwsm/sessionData/[sessionName].json`.

### Command-line completion:
```
# Automatically install command-line completion
lwsm --setupCompletion
# Generate command-line completion code for bash and zsh shells for manual installation
lwsm --completion
# Generate command-line completion code for fish shell for manual installation
lwsm --completion-fish
```
Command-line completion implemented by [omelette](https://github.com/f/omelette), so you may refer it's README to check file where completion code will be added on automatic install.
Restart your shell after automatic install to apply changes.


## Known Quirks
In order to resize and move the windows the X window manager is used. Unfortunately it has some bugs:  
* Windows moved to the very left of the screen will always be off by some pixels in Unity
* Sometimes a window can't be restored properly any more. In those cases it helps to close the window and restart the application.
* When you're using Wayland as display manager all gnome applications won't be saved or restored. Only XWayland applications will work.
  *  You easily [switch back to Xorg](https://itsfoss.com/switch-xorg-wayland/)

## Troubleshooting & Issues
**!!! please read this before opening up an issue !!!**

**If you're using Wayland, have a look at above at the known qurks section**

### Application are not started/lwsm doesn't work 

Related error message: `undefined findDesktopFile cant find file`

lwsm needs to guess the right executable path for your applications. In some cases lwsm might be unable to do so. There are a couple of things, that you can do:

1. You can locate the executable or desktop file manually for the application  which isn't started (e.g. via the locate command), and add it to `~/.lwsm/{currentSessionName}.json`. 
If you want to persist that mapping you might also want to open `~/.lwsm/config.json`  and edit the `WM_CLASS_AND_EXECUTABLE_FILE_MAP` property. You can find out which property name to use by executing `xprop` and clicking on an open window of the application. Look for `WM_CLASS(STRING)` (Or just execute `xprop | grep "WM_CLASS(STRING)"`). For finding the desktop file the `locate` command is usful (e.g.: `locate google-chrome.desktop`).
```
# example  entry in ~/.lwsm/config.json:
# WM_CLASS(STRING)             Desktop file name
"google-chrome.Google-chrome": "google-chrome.desktop",
```

2. If the desktop files are consistently stored in a folder not mapped by lwsm you might want to add it's location to the `DESKTOP_FILE_LOCATIONS` property in `~/.lwsm/config.json` to make sure this folder is also searched the next lwsm tries to guess an desktop file path. If you think the path should be there per default [please open up an issue](https://github.com/johannesjo/linux-window-session-manager/issues).

You can also see [this comment for more detailed instructions](https://github.com/johannesjo/linux-window-session-manager/issues/45#issuecomment-536179295).

### Ignoring applications
If you want lwsm to ignore the application, you can add it to the ignore list in `~/.lwsm/config.json` which is located under the `WM_CLASS_EXCLUSIONS` property.

If everything fails [please open up an issue](https://github.com/johannesjo/linux-window-session-manager/issues).

### Gnome Terminal or other Gnome applications not restored
Chances are you're running Wayland as a display manager. I'd recommend [switching back to Xorg](https://askubuntu.com/questions/961304/how-do-you-switch-from-wayland-back-to-xorg-in-ubuntu-17-10).

## ❤ contribute ❤
I'm happy for any reported [issue or feature request](https://github.com/johannesjo/linux-window-session-manager/issues).
