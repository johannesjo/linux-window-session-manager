# Linux Window Session Manager

This is a library / command line tool that let's you save and reload your opened programs and the positions of their windows. 
Supports Unity and Gnome Desktops and possibly all other compositing window managers using X.
 
There's also a [companion tool in form of an indicator applet](https://github.com/johannesjo/linux-window-session-manger-indicator) if you like such things but this package can also be used standalone.
 
## Installation
```
npm install -g
linux-window-session-manager
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

## Known Quirks
In order to resize and move the windows the X window manager is used. Unfortunately it has some bugs:  
* Windows moved to the very left of the screen will always be off by some pixels in Unity
* Sometimes a window can't be restored properly any more. In those cases it helps to close the window and restart the application. 

## ❤ contribute ❤
I'm happy for any reported [issue or feature request](https://github.com/johannesjo/ng-fab-form/issues).
