

  export interface Medium {
    type: string;
    path: string;
    text: string;
  }

  export interface Station {
    name: string;
    media: Medium[];
  }

  export interface Area {
    name: string;
    stations: Station[];
  }

  export default interface TourModel {
    name: string;
    folderName: string;
    date: string;
    areas: Area[];
    completePath: string;
  }

