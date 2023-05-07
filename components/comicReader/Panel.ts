import { IShape } from './IShape';
import { IPanel } from './IConfig';
import { ShapeType } from './ShapeType';

interface PanelDimension {
    width: number;
    height: number;
}

interface Point {
    x: number;
    y: number;
}

class Panel {
    panelDimensions: PanelDimension;
    center: Point;
    shape: IShape;
    transitionIn?: Function;
    transitionOut?: Function;

    constructor(options: IPanel) {
        this.panelDimensions = {
            width: options.dimensions.w,
            height: options.dimensions.h
        };
        this.center = {
            x: options.center.x,
            y: options.center.y
        };

        this.shape = {
            shapeType: ShapeType[options.shape as keyof typeof ShapeType]
        };
        this.transitionIn = function () {
            console.log('transitionIn');
        };
        this.transitionOut = function () {
            console.log('transitionOu');
        };
    }
}

export default Panel;
