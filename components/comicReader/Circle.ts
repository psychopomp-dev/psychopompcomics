import { ICircle } from './ICircle';
import { Point } from './IShape';
import { ShapeType } from './ShapeType';

export class Circle implements ICircle {
    shapeType: ShapeType = ShapeType.Circle;

    constructor(public radius: number, public center: Point) {
        this.radius = radius;
        this.center = center;
    }
}
