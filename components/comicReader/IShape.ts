import { ShapeType } from './ShapeType';

export type Point = {
    x: number;
    y: number;
};

export interface IShape {
    shapeType: ShapeType;
}
