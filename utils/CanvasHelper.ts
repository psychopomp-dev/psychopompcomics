import { Dimension } from '../components/comicReader/DimensionType';
import { DrawImageProps } from '../components/comicReader/IDrawImageProps';
import Page from '../components/comicReader/Page';
import { loadImageAndCache } from './imageCache';

/**
 *
 * @param canvas: HTMLCanvasElement
 * @param imgUrl: string  URL of the image source
 * @param canvasPropsStart: DrawImageProps  Initial offset x, offset y, width and heigt of the image
 * @param canvasPropsEnd: DrawImageProps  Final offset x, offset y, width and heigt of the image
 */
export async function zoomPan(
	canvas: HTMLCanvasElement,
	imgUrl: string,
	canvasPropsStart: DrawImageProps,
	canvasPropsEnd: DrawImageProps
) {
	const ctx = canvas.getContext('2d');
	if (ctx) {
		const img = await loadImageAndCache(imgUrl);
		window.requestAnimationFrame(function () {
			animateCanvasMove(
				ctx,
				canvasPropsStart.offsetX,
				canvasPropsEnd.offsetX,
				canvasPropsStart.offsetY,
				canvasPropsEnd.offsetY,
				canvasPropsStart.scaledWidth,
				canvasPropsEnd.scaledWidth,
				canvasPropsStart.scaledHeight,
				canvasPropsEnd.scaledHeight,
				0,
				60,
				1,
				img
			);
		});
	}
}

/**
 * Animats the canvas's scale/offset to move from a starting offset/scale to the new offset/scale
 * This is used to smoothly move between to views of the image
 * @param ctx:  CanvasRenderingContext2D  Canvas 2d contect on where image will be drawn
 * @param x1:  number Starting X offset
 * @param x2:  number Ending X offset
 * @param y1:  number Starting Y offset
 * @param y2:  number Ending Y offset
 * @param scaledWidth1:  number Starting width
 * @param scaledWidth2:  number Ending width
 * @param scaledHeight1:  number Starting height
 * @param scaledHeight2:  number Ending height
 * @param current:  number  Current progress in the animation
 * @param max:  number  Total number of steps over which to animate (roughtly corresponding the the number of frams)
 * @param delta:  number  Step size to change current
 * @param img:  HTMLImageElement  The image to draw on the canvas
 */
function animateCanvasMove(
	ctx: CanvasRenderingContext2D,
	x1: number,
	x2: number,
	y1: number,
	y2: number,
	scaledWidth1: number,
	scaledWidth2: number,
	scaledHeight1: number,
	scaledHeight2: number,
	current: number,
	max: number,
	delta: number,
	img: HTMLImageElement
) {
	if (current < max) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		current += delta;
		const t: number = current / max;
		const tEazy = easeInOutCubic(t);
		ctx.drawImage(
			img,
			lerp(x1, x2, tEazy),
			lerp(y1, y2, tEazy),
			lerp(scaledWidth1, scaledWidth2, tEazy),
			lerp(scaledHeight1, scaledHeight2, tEazy)
		);
		window.requestAnimationFrame(function () {
			animateCanvasMove(
				ctx,
				x1,
				x2,
				y1,
				y2,
				scaledWidth1,
				scaledWidth2,
				scaledHeight1,
				scaledHeight2,
				current,
				max,
				delta,
				img
			);
		});
	}
}

export async function jumpToPanel(
	canvas: HTMLCanvasElement,
	page: Page,
	panelIndex: number
) {
	const img = await loadImageAndCache(page.imageUrl);
	const props = getDrawImagePropsFromPage(page, canvas, panelIndex);
	console.log(props);
	const ctx = canvas.getContext('2d');
	console.log(img);
	// ctx?.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(
		img,
		props.offsetX,
		props.offsetX,
		props.scaledWidth,
		props.scaledHeight
	);
}

/**
 * Gets the offset x, offset y and width/height to write the image/panel
 * to fit on the canvas while fitting the image within the canvas
 * @param page: Page  A page object
 * @param canvas: HTMLCanvasElement Canvas image will be drawn on
 * @param panelIndex: number  Index of panel to draw on the canvas, -1 is the whole image while >=0 is a panel
 * @returns DrawImageProps
 */
export function getDrawImagePropsFromPage(
	page: Page,
	canvas: HTMLCanvasElement,
	panelIndex: number = -1
): DrawImageProps {
	const width =
		panelIndex === -1
			? page.pageDimensions.width
			: page.getPanel(panelIndex).panelDimensions.width;
	const height =
		panelIndex === -1
			? page.pageDimensions.height
			: page.getPanel(panelIndex).panelDimensions.height;
	const centerX =
		panelIndex === -1 ? width / 2 : page.getPanel(panelIndex).center.x;
	const centerY =
		panelIndex === -1 ? height / 2 : page.getPanel(panelIndex).center.y;

	const imageToCanvasScale = getImageToCanvasScale(width, height, canvas);
	const offsetX = getImageOffset(canvas.width, centerX, imageToCanvasScale);
	const offsetY = getImageOffset(canvas.height, centerY, imageToCanvasScale);
	const scaledWidth = page.pageDimensions.width * imageToCanvasScale;
	const scaledHeight = page.pageDimensions.height * imageToCanvasScale;
	return {
		offsetX,
		offsetY,
		scaledWidth,
		scaledHeight,
	};
}

/**
 * Gets the scale value that will result in the supplied image dimension fitting on the canvas
 * @param imageW: number  Width of the image/panel
 * @param imageHeight: number Height of the image/panel
 * @param canvas: HTMLCanvasElement Canvas on which to scale the image
 * @returns
 */
export function getImageToCanvasScale(
	imageW: number,
	imageHeight: number,
	canvas: HTMLCanvasElement
): number {
	let scaleX = canvas.width / imageW;
	let scaleY = canvas.height / imageHeight;
	return Math.min(scaleX, scaleY);
}

/**
 * Get the coordinates on the canvas of where to start the image clip
 * @param canvasSideLength: number  Lenght of the canvas
 * @param centerCoord: number Coordinate on the image on which to center the canvas
 * @param imageToCanvasScale: number  Scale percentage that will fit the image/panel to the canvas
 * @returns number  The provided axis offest for drawImage that will center on the provided point
 */
export function getImageOffset(
	canvasSideLength: number,
	centerCoord: number,
	imageToCanvasScale: number
): number {
	return canvasSideLength / 2 - centerCoord * imageToCanvasScale;
}

/**
 * this helps to scale the canvas for higher dpi displays,
 * i.e. pixelRatio > 1  like Retina displays or phones
 * @param dimension: Dimension (width | height)
 * @returns number  The dimension value in pixels to use for the canvas
 */
export function getCanvasDimension(
	canvas: HTMLCanvasElement,
	dimension: Dimension
): number {
	const pixelRatio = window.devicePixelRatio;
	if (dimension.valueOf() === 'width') {
		return canvas.getBoundingClientRect().width * pixelRatio;
	} else {
		return canvas.getBoundingClientRect().height * pixelRatio;
	}
}

export async function drawCanvas(
	canvas: HTMLCanvasElement,
	page: Page,
	panelIndex: number
): Promise<void> {
	// update the canvas dimensions
	canvas.width = getCanvasDimension(canvas, Dimension.Width);
	canvas.height = getCanvasDimension(canvas, Dimension.Height);
	// redraw the current panel
	let ctx: CanvasRenderingContext2D | null | undefined =
		canvas.getContext('2d');
	const img = await loadImageAndCache(page.imageUrl);

	if (ctx) {
		ctx.canvas.height = getCanvasDimension(canvas, Dimension.Height);
		ctx.canvas.width = getCanvasDimension(canvas, Dimension.Width);

		const { offsetX, offsetY, scaledWidth, scaledHeight } =
			getDrawImagePropsFromPage(page, canvas, panelIndex);

		ctx.drawImage(
			img,
			offsetX,
			offsetY,
			scaledWidth, //scales the image up/down to fit the canvas
			scaledHeight //scales the image up/down to fit the canvas
		);
	}
}

/**
 * Easing using the Cubic function
 * @param x Number from 0-1 representing the stage of completion of the animation effect
 * @returns number
 */
function easeInOutCubic(x: number): number {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Function for interpolating points between two points
 * @param p1: number  Starting Point
 * @param p2: number  Ending Point
 * @param t: number Current progress between the two point (0-1)
 * @returns number: current interpolation between numbers
 */
function lerp(p1: number, p2: number, t: number): number {
	return p1 + (p2 - p1) * t;
}
