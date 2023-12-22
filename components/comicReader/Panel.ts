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

	constructor(options: IPanel) {
		this.panelDimensions = {
			width: options.dimensions.w,
			height: options.dimensions.h,
		};
		this.center = {
			x: options.center.x,
			y: options.center.y,
		};
	}
}

export default Panel;
