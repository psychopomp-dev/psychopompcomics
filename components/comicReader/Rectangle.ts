import { IRectangle } from './IRectangle';
import { Point } from './IShape';
import { ShapeType } from './ShapeType';

export class Rectangle implements IRectangle {
    shapeType: ShapeType = ShapeType.Rectangle;

    constructor(public length: number, public width: number, public center: Point) {
        this.length = length;
        this.width = width;
        this.center = center;
    }
}
