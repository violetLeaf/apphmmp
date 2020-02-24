

  export interface Media {
    id: number;
    type: string;
    caption: string;
    text?: string;
    url?: string;
  }

  export interface Station {
    id: number;
    name: string;
    media: Media[];
  }

  export interface Area {
    id: number;
    title: string;
    position: number;
    stations: Station[];
  }

  export default interface TourModel {
    id: number;
    title: string;
    reversible: boolean;
    guide: string;
    date: Date;
    areas: Area[];
    
    folderName: string;
    completePath: string;
  }

