export interface WinObjIdOnly {
  windowId: string;
  windowIdDec: number;
}

export interface WinObj extends WinObjIdOnly {
  states: string[];
  wmCurrentDesktopNr: number;
  wmType: string;
  wmRole: string;
  wmPid: number;
  wmClassName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  simpleName: string;
  executableFile: string;
  executableArgs: string;
  desktopFilePath?: string;
  instancesStarted?: number;
}
