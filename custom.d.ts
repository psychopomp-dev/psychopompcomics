import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		mode: string;
		breakpoints: {
			xxs: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
		};
		spaces: Record<string, string>;
		motion: {
			pageTransitionVariants: any;
		};
		[key: string]: any;
	}
}

// Extend the Document interface
interface Document {
	webkitExitFullscreen?: () => void;
}

// Extend the HTMLElement interface
interface HTMLElement {
	webkitRequestFullscreen?: () => void;
}
