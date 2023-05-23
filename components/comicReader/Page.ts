import Panel from './Panel';
import {
	zoomPan,
	getDrawImagePropsFromPage,
	jumpToPanel,
} from '../../utils/CanvasHelper';

export interface PageDimension {
	width: number;
	height: number;
}

interface Point {
	x: number;
	y: number;
}

interface PageOptions {
	imageUrl: string;
	panels: Panel[];
	// currentPanel?: number;
	pageDimensions: PageDimension;
	center?: Point;
}

class Page {
	imageUrl: string;
	displayImage: string;
	panels: Panel[];
	// currentPanel: number;
	pageDimensions: PageDimension;
	center?: Point;
	ref?: React.RefObject<HTMLCanvasElement>;

	constructor(options: PageOptions) {
		const { imageUrl, panels, pageDimensions, center } = options;
		this.imageUrl = imageUrl;
		this.displayImage = imageUrl;
		this.panels = panels;
		// this.currentPanel = -1;
		this.pageDimensions = pageDimensions;
		this.center = center;
		if (this.center === undefined) {
			this.center = {
				x: this.pageDimensions.width / 2,
				y: this.pageDimensions.height / 2,
			};
		}
	}

	isOnPageImage(currentPanel: number) {
		return currentPanel === -1;
	}

	// nextImage(currentPanel: number) {
	// 	return this.hasNextPanel(currentPanel) ? currentPanel + 1 : currentPanel;
	// }

	// prevImage(currentPanel: number) {
	// 	return this.hasPrevPanel(currentPanel) ? currentPanel - 1 : currentPanel;
	// }

	hasPanels() {
		return this.panels.length > 0;
	}

	goToNextPanel(currentPanel: number): number {
		if (this.hasNextPanel(currentPanel)) {
			currentPanel = this.nextPanel(currentPanel);
			console.log('currentPanel NOW: ' + currentPanel);
			return currentPanel;
		}
	}

	goToPrevPanel(currentPanel: number): number {
		if (this.hasPrevPanel(currentPanel)) {
			currentPanel = this.prevPanel(currentPanel);
			console.log('currentPanel NOW: ' + currentPanel);
			return currentPanel;
		}
	}

	goToPanel(from: number, to: number): number {
		if (this?.ref?.current) {
			const canvasPropsOld = getDrawImagePropsFromPage(
				this,
				this.ref.current,
				from
			);
			const canvasPropsNew = getDrawImagePropsFromPage(
				this,
				this.ref.current,
				to
			);
			zoomPan(this.ref.current, this.imageUrl, canvasPropsOld, canvasPropsNew);
			// this.currentPanel = to;
			console.log('currentPanel NOW: ' + to);
			return to;
		}
	}

	nextPanel(currentPanel: number): number {
		return this.goToPanel(currentPanel, currentPanel + 1);
	}

	hasNextPanel(currentPanel: number) {
		return currentPanel < this.panels.length - 1;
	}

	prevPanel(currentPanel: number): number {
		return this.goToPanel(currentPanel, currentPanel - 1);
	}

	hasPrevPanel(currentPanel: number) {
		return currentPanel >= 0;
	}

	// setPanel(panelIdx: number) {
	//     if (this.panels[panelIdx] !== undefined) this.currentPanel = panelIdx;
	// }

	getPanel(panelIdx: number): Panel {
		if (this.panels[panelIdx] === undefined)
			throw new Error(
				`Panel index out of range, given ${panelIdx}, must be between 0 and ${this.panels.length}`
			);
		return this.panels[panelIdx];
	}

	getCurrentPanel(currentPanel: number): Panel {
		return this.getPanel(currentPanel);
	}

	goToFirstPanel(currentPanel: number): number {
		if (this.hasPanels()) {
			this.goToPanel(currentPanel, 0);
			currentPanel = 0;
		}
		return currentPanel;
	}

	goToLastPanel(currentPanel: number): number {
		if (this.hasPanels()) {
			currentPanel = this.goToPanel(currentPanel, this.panels.length - 1);
		}
		return currentPanel;
	}

	goToWholePagePanel(currentPanel: number): number {
		this.goToPanel(currentPanel, -1);
		console.log('currentPanel NOW whole page Panel: ' + -1);
		return -1;
	}

	goToPanelInstant(panelIdx: number): number {
		if (this.panels[panelIdx] === undefined && panelIdx !== -1)
			throw new Error(
				`Panel index out of range, given ${panelIdx}, must be between 0 and ${this.panels.length}`
			);
		console.log(this.ref.current);
		this.goToPanel(panelIdx, panelIdx);

		return panelIdx;
	}
}

export default Page;
