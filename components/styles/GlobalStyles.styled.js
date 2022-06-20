import { createGlobalStyle } from 'styled-components';
import 'swiper/css/bundle';

/* Drawn from https://web.dev/building-a-color-scheme/ */
export const GlobalStyle = createGlobalStyle`
	* {
		/* brand foundation */
		--brand-hue: ${({ theme }) => theme.brand.hsl.h};
		--brand-saturation: ${({ theme }) => theme.brand.hsl.s};
		--brand-lightness: ${({ theme }) => theme.brand.hsl.l};
		--brand-rgb: ${({ theme }) => theme.brand.rgb.r}, ${({ theme }) =>
	theme.brand.rgb.g}, ${({ theme }) => theme.brand.rgb.b};
	}

	:root {
		/* set defaults */
		--brand: hsl(var(--brand-hue), var(--brand-saturation), var(--brand-lightness));
		--text1: hsl(${({ theme }) => theme.text1.hsl.h}, ${({ theme }) =>
	theme.text1.hsl.s}, ${({ theme }) => theme.text1.hsl.l});
		--text2: hsl(${({ theme }) => theme.text2.hsl.h}, ${({ theme }) =>
	theme.text2.hsl.s}, ${({ theme }) => theme.text2.hsl.l});
		--text-on-brand: hsl(${({ theme }) => theme.textOnBrand.hsl.h}, ${({ theme }) =>
	theme.textOnBrand.hsl.s}, ${({ theme }) => theme.textOnBrand.hsl.l});
		--surface0: hsl(${({ theme }) => theme.surface0.hsl.h}, ${({ theme }) =>
	theme.surface0.hsl.s}, ${({ theme }) => theme.surface0.hsl.l});
		--surface1: hsl(${({ theme }) => theme.surface1.hsl.h}, ${({ theme }) =>
	theme.surface1.hsl.s}, ${({ theme }) => theme.surface1.hsl.l});
		--surface2: hsl(${({ theme }) => theme.surface2.hsl.h}, ${({ theme }) =>
	theme.surface2.hsl.s}, ${({ theme }) => theme.surface2.hsl.l});
		--surface3: hsl(${({ theme }) => theme.surface3.hsl.h}, ${({ theme }) =>
	theme.surface3.hsl.s}, ${({ theme }) => theme.surface3.hsl.l});
		--surface4: hsl(${({ theme }) => theme.surface4.hsl.h}, ${({ theme }) =>
	theme.surface4.hsl.s}, ${({ theme }) => theme.surface4.hsl.l});
		--box-shadow-xxs: ${({ theme }) => theme.boxShadow.xxs};
		--box-shadow-xs: ${({ theme }) => theme.boxShadow.xs};
		--box-shadow-sm: ${({ theme }) => theme.boxShadow.sm};
		--box-shadow-ms: ${({ theme }) => theme.boxShadow.ms};
		--box-shadow-md: ${({ theme }) => theme.boxShadow.md};
		--box-shadow-ml: ${({ theme }) => theme.boxShadow.ml};
		--box-shadow-lg: ${({ theme }) => theme.boxShadow.lg};
		--box-shadow-xl: ${({ theme }) => theme.boxShadow.xl};
		/* Breakpoints (variables don't work in media queries)*/
		--breakpoint-xxs: ${({ theme }) => theme.breakpoints.xxs};
		--breakpoint-xs: ${({ theme }) => theme.breakpoints.xs};
		--breakpoint-sm: ${({ theme }) => theme.breakpoints.sm};
		--breakpoint-md: ${({ theme }) => theme.breakpoints.md};
		--breakpoint-lg: ${({ theme }) => theme.breakpoints.lg};
		--breakpoint-xl: ${({ theme }) => theme.breakpoints.xl};
		/* Spacing Sizes */
		--space-zero:  ${({ theme }) => theme.spaces.zero};
		--space-xs:  ${({ theme }) => theme.spaces.xs};
		--space-sm:  ${({ theme }) => theme.spaces.sm};
		--space-ms:  ${({ theme }) => theme.spaces.ms};
		--space-md:  ${({ theme }) => theme.spaces.md};
		--space-ml:  ${({ theme }) => theme.spaces.ml};
		--space-lg:  ${({ theme }) => theme.spaces.lg};
		--space-xl:  ${({ theme }) => theme.spaces.xl};
		--space-xxl:  ${({ theme }) => theme.spaces.xxl};
		--space-xxxl:  ${({ theme }) => theme.spaces.xxxl};
		/* Font Sizes */
		--font-size-xxs:  ${({ theme }) => theme.fonts.sizes.xxs};
		--font-size-xs:  ${({ theme }) => theme.fonts.sizes.xs};
		--font-size-sm:  ${({ theme }) => theme.fonts.sizes.sm};
		--font-size-ms:  ${({ theme }) => theme.fonts.sizes.ms};
		--font-size-md:  ${({ theme }) => theme.fonts.sizes.md};
		--font-size-ml:  ${({ theme }) => theme.fonts.sizes.ml};
		--font-size-lg:  ${({ theme }) => theme.fonts.sizes.lg};
		--font-size-xl:  ${({ theme }) => theme.fonts.sizes.xl};
		--font-size-xxl:  ${({ theme }) => theme.fonts.sizes.xxl};
		--font-size-xxxl:  ${({ theme }) => theme.fonts.sizes.xxxl};
	}

	/* Box sizing rules */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	/* Set core root defaults */
	html:focus-within {
		scroll-behavior: smooth;
	}

	html {
		-webkit-font-smoothing: antialiased;
		touch-action: manipulation;
		text-rendering: optimizelegibility;
		text-size-adjust: 100%;
		font-size: 62.5%;
	}

	/* Remove default margin */
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	figure,
	blockquote,
	dl,
	dd,
	input,
	button {
		margin: 0;
	}

	h1 {
		margin-top: ${({ theme }) => theme.spaces.xl};
		&:first-child {
			margin-top: 0;
		}
	}

	h2 {
		margin-top: ${({ theme }) => theme.spaces.lg};
		&:first-child {
			margin-top: 0;
		}
	}

	h3 {
		margin-top: ${({ theme }) => theme.spaces.ml};
		&:first-child {
			margin-top: 0;
		}
	}

	h4,p {
		margin-top: ${({ theme }) => theme.spaces.ms};
		&:first-child {
			margin-top: 0;
		}
	}

	h1 + p {
		margin-top: ${({ theme }) => theme.spaces.ml};
	}

	h2 + p {
		margin-top: ${({ theme }) => theme.spaces.md};
	}

	h3 + p,
	h4 + p,
	h5 + p,
	h6 + p,
	p + p,
	h3 + ul,
	h3 + ol,
	h4 + ul,
	h4 + ol,
	h5 + ul,
	h5 + ol,
	h6 + ul,
	h6 + ol,
	p + ul,
	p + ol {
		margin-top: ${({ theme }) => theme.spaces.ms};
	}

	input {
		border: none;
	}

	body {
		position: relative;
		padding: 0;
		box-sizing: border-box;
		background-color: var(--surface1);
		text-rendering: optimizeSpeed;
		line-height: 1.5;
		font-family: ${({ theme }) => theme.fonts.secondary};
		color: var(--text1);
		font-feature-settings: "kern";

		background: ${({ theme }) => theme.texturedBackground};

		&::after {
			position: absolute;
			content: '';
			background: linear-gradient(rgba(${({ theme }) => theme.surface1.rgb.r}, ${({
	theme,
}) => theme.surface1.rgb.g}, ${({ theme }) =>
	theme.surface1.rgb.b},1), rgba(${({ theme }) => theme.surface1.rgb.r}, ${({
	theme,
}) => theme.surface1.rgb.g}, ${({ theme }) => theme.surface1.rgb.b},0.75));
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;
		}

	}

	body.no-scroll {
		overflow: hidden;
	}

	#__next {
		display: grid;
		grid-gap: ${({ theme }) => theme.spaces.md};
		grid-template-rows: auto auto 1fr auto;
		grid-template-areas:
			'nav'
			'main'
			'footer'
		;
		min-height: 100vh;

		& > nav {grid-area: nav; }
		& > main {grid-area: main; }
		& > footer {grid-area: footer; }
	}

	/* A elements that don't have a class get default styles */
	a:not([class]) {
		text-decoration-skip-ink: auto;
	}

	/* Make images easier to work with */
	img,
	picture {
		max-width: 100%;
		display: block;
	}

	h1,h2,h3,h4,h5,h6 {
		font-weight: 400;
		color: var(--brand);
	}

	h1,h2,h3 {
		font-family: ${({ theme }) => theme.fonts.primary};
	}

	h4,h5,h6,p,input,button,a {
		font-family: ${({ theme }) => theme.fonts.secondary};
	}

	p,input,button,a,ol,ul {
		font-size: ${({ theme }) => theme.fonts.sizes.sm};
		
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			font-size: ${({ theme }) => theme.fonts.sizes.xs};
		}
	}

	p,input,a,ul,ol {
		line-height: 1.375;
		
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			line-height: 1.333;
		}
	}

	h1 {
		line-height: 1.06;
		font-size: ${({ theme }) => theme.fonts.sizes.xxl};
		
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			font-size: ${({ theme }) => theme.fonts.sizes.lg};
			line-height: 1.18;
		}
	}

	h2 {
		font-size: ${({ theme }) => theme.fonts.sizes.ml};
		line-height: 1.12;
		
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			font-size: ${({ theme }) => theme.fonts.sizes.md};
			line-height: 1.21;
		}
	}

	h3 {
		font-size: ${({ theme }) => theme.fonts.sizes.ms};
		line-height: 1.27;
	}

	h4 {
		font-size: ${({ theme }) => theme.fonts.sizes.sm};
		line-height: 1.333;
	}

	h5 {
		font-size: ${({ theme }) => theme.fonts.sizes.xs};
		line-height: 1.25;
	}

	a {
		color: var(--brand);
		text-decoration: none;
		transition: color 300ms ease;
		:hover {
			color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.2)
			);
		}
		:active {
			color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.5)
			);
		}
	}

	.text-center {
		text-align: center;
	}

	/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
	@media (prefers-reduced-motion: reduce) {
		html:focus-within {
			scroll-behavior: auto;
		}

		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
`;
