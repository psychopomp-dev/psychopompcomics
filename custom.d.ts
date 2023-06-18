// Extend the Document interface
interface Document {
	webkitExitFullscreen?: () => void;
}

// Extend the HTMLElement interface
interface HTMLElement {
	webkitRequestFullscreen?: () => void;
}
