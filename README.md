[![npm version](https://badge.fury.io/js/linux-window-session-manager.svg)](https://badge.fury.io/js/linux-window-session-manager)

# Linux Window Session Manager

This is a library / command line tool that let's you save and reload your opened programs and the positions of their windows. 
Supports Unity and Gnome Desktops and possibly all other compositing window managers using X (including XWayland).
 
There's also a [companion tool in form of an indicator applet](https://github.com/johannesjo/linux-window-session-manger-indicator) and a [gnome-shell-extension](https://github.com/johannesjo/gnome-shell-extension-window-session-manager) if you like such things but this package can also be used standalone.
 
## Installation
NodeJs needs to be installed.

```
npm install -g linux-window-session-manager
```

For older distros, you also might need to install the `locate` command via `sudo apt-get install mlocate`.
 
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

### Adjusting the configuration
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

## Troubleshooting
In some cases lwsm might be unable to guess the right path for the desktop file of an application. There are a couple of things, that you can do:

You can locate the executable or desktop file manually for the application  which isn't started (e.g. via the locate command), and add it to `~/.lwsm/{currentSessionName}.json`. 
If you want to persist that mapping you might also want to open `~/.lwsm/config.json`  and edit the `WM_CLASS_AND_EXECUTABLE_FILE_MAP` property. 

If there is a desktop file for the application you might want to add it's location to the `DESKTOP_FILE_LOCATIONS` property in `~/.lwsm/config.json` to make sure this folder is also searched the next lwsm tries to guess an desktop file path. You can find out which property name to use by executing `xprop` and clicking on an open window of the application. Look for `WM_CLASS(STRING)`.

If you want lwsm to ignore the application, you can add it to the ignore list in `~/.lwsm/config.json` which is located under the `WM_CLASS_EXCLUSIONS` property.

If everything fails [please open up an issue](https://github.com/johannesjo/linux-window-session-manager/issues).

## ❤ contribute ❤
I'm happy for any reported [issue or feature request](https://github.com/johannesjo/linux-window-session-manager/issues).
