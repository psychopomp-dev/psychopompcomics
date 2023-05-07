import Panel from './Panel';
import { zoomPan, getDrawImagePropsFromPage } from '../../utils/CanvasHelper';

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
    currentPanel?: number;
    pageDimensions: PageDimension;
    center?: Point;
}

class Page {
    imageUrl: string;
    displayImage: string;
    panels: Panel[];
    currentPanel: number;
    pageDimensions: PageDimension;
    center?: Point;
    ref?: React.RefObject<HTMLCanvasElement>;

    constructor(options: PageOptions) {
        const { imageUrl, panels, pageDimensions, center } = options;
        this.imageUrl = imageUrl;
        this.displayImage = imageUrl;
        this.panels = panels;
        this.currentPanel = -1;
        this.pageDimensions = pageDimensions;
        this.center = center;
        if (this.center === undefined) {
            this.center = {
                x: this.pageDimensions.width / 2,
                y: this.pageDimensions.height / 2
            };
        }
    }

    isOnPageImage() {
        return this.currentPanel === -1;
    }

    nextImage() {
        this.goToNextPanel();
    }

    prevImage() {
        this.goToPrevPanel();
    }

    hasPanels() {
        return this.panels.length > 0;
    }

    goToNextPanel() {
        if (this.hasNextPanel()) {
            this.nextPanel();
            console.log('currentPanel NOW: ' + this.currentPanel);
        }
    }

    goToPrevPanel() {
        if (this.hasPrevPanel()) {
            this.prevPanel();
            console.log('currentPanel NOW: ' + this.currentPanel);
        }
    }

    goToPanel(from: number, to: number) {
        if (this?.ref?.current) {
            const canvasPropsOld = getDrawImagePropsFromPage(this, this.ref.current, from);
            const canvasPropsNew = getDrawImagePropsFromPage(this, this.ref.current, to);
            zoomPan(this.ref.current, this.imageUrl, canvasPropsOld, canvasPropsNew);
            this.currentPanel = to;
            console.log('currentPanel NOW: ' + this.currentPanel);
        }
    }

    nextPanel() {
        this.goToPanel(this.currentPanel, this.currentPanel + 1);
    }

    hasNextPanel() {
        return this.currentPanel < this.panels.length - 1;
    }

    prevPanel() {
        this.goToPanel(this.currentPanel, this.currentPanel - 1);
    }

    hasPrevPanel() {
        return this.currentPanel >= 0;
    }

    setPanel(panelIdx: number) {
        if (this.panels[panelIdx] !== undefined) this.currentPanel = panelIdx;
    }

    getPanel(panelIdx: number): Panel {
        if (this.panels[panelIdx] === undefined) throw new Error(`Panel index out of range, given ${panelIdx}, must be between 0 and ${this.panels.length}`);
        return this.panels[panelIdx];
    }

    getCurrentPanel(): Panel {
        return this.getPanel(this.currentPanel);
    }

    goToFirstPanel() {
        if (this.hasPanels()) {
            this.goToPanel(this.currentPanel, 0);
        }
    }

    goToLastPanel() {
        if (this.hasPanels()) {
            this.goToPanel(this.currentPanel, this.panels.length - 1);
        }
    }

    goToWholePagePanel() {
        this.goToPanel(this.currentPanel, -1);
        console.log('currentPanel NOW whole page Panel: ' + this.currentPanel);
    }
}

export default Page;
