export interface WinObjIdOnly {
    windowId: string;
    windowIdDec: number;
}

export interface WinObj extends WinObjIdOnly {
    states: string[];
    wmCurrentDesktopNr: number;
    wmType: string;
    wmPid: number;
    wmClassName: string;
    x: number;
    y: number;
    width: number;
    height: number;
    simpleName: string;
    executableFile: string;
    desktopFilePath?: string;
    instancesStarted?: number;
}

