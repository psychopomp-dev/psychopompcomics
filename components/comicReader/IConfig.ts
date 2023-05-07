export interface ICenter {
    x: number;
    y: number;
}

export interface IDimensions {
    w: number;
    h: number;
}

export interface IPanel {
    center: ICenter;
    dimensions: IDimensions;
    shape: string;
    transitionIn: string;
    transitionOut: string;
}

export interface IPage {
    imageUrl: string;
    panels: IPanel[];
    pageDimensions: IDimensions;
}

export interface IConfig {
    pages: IPage[];
}
