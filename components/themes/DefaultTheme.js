/* Colors
	primary: '#8dc63f',
	primary50: '#f2f8e8',
	primary100: '#ddeec6',
	primary200: '#c7e3a1',
	primary300: '#b1d77b',
	primary400: '#9fcf5d',
	primary500: '#8dc63f',
	primary600: '#7eb637',
	primary700: '#69a22d',
	primary800: '#558e24',
	primary900: '#316c11',
	secondary: '#231F20',
	secondary50: '#fef8fa',
	secondary100: '#f9f3f5',
	secondary200: '#f2eced',
	secondary300: '#e3dedf',
	secondary400: '#c0babc',
	secondary500: '#a19b9d',
	secondary600: '#777374',
	secondary700: '#635f60',
	secondary800: '#444041',
	secondary900: '#231f20',
	white: '#fff',
	black: '#000',
	offblack: '#0f0f0f'
*/

const themeCommon = {
	brand: {
		hsl: {
			h: 85,
			s: '54%',
			l: '51%',
		},
		rgb: {
			r: 142,
			g: 198,
			b: 63,
		},
		hex: '#8dc63f',
	},
	textOnBrand: {
		hsl: {
			h: 0,
			s: '0%',
			l: '0%',
		},
		rgb: {},
	},
	fonts: {
		primary: '"Archive", sans-serif',
		secondary: '"Roboto", sans-serif;',
		sizes: {
			xxs: '1.4rem',
			xs: '1.6rem',
			sm: '1.8rem',
			ms: '2.2rem',
			md: '2.8rem',
			ml: '3rem',
			lg: '3.6rem',
			xl: '4.8rem',
			xxl: '5.2rem',
			xxxl: '6.4rem',
		},
	},
	breakpoints: {
		xxs: '367px',
		xs: '575px',
		sm: '767px',
		md: '991px',
		lg: '1279px',
		xl: '1599px',
	},
	spaces: {
		zero: '0',
		xs: '0.2rem',
		sm: '0.4rem',
		ms: '0.8rem',
		md: '1.2rem',
		ml: '1.6rem',
		lg: '2.4rem',
		xl: '3.2rem',
		xxl: '6.4rem',
		xxxl: '9.6rem',
	},

	motion: {
		pageTransitionVariants: {
			hidden: { opacity: 0, x: 0, y: 0 },
			visible: { opacity: 1, x: 0, y: 0 },
			exit: { opacity: 0, x: 0, y: -100 },
		},
	},
};

export const themeDark = {
	mode: 'dark',
	...themeCommon,
	surface0: {
		hsl: {
			h: 0,
			s: '0%',
			l: '0%',
		},
		rgb: {
			r: 255,
			g: 255,
			b: 255,
		},
	},
	surface1: {
		hsl: {
			h: 0,
			s: '0%',
			l: '5.9%',
		},
		rgb: {
			r: 15,
			g: 15,
			b: 15,
		},
	},
	surface2: {
		hsl: {
			h: 345,
			s: '6.1%',
			l: '12.9%',
		},
		rgb: {},
	},
	surface3: {
		hsl: {
			h: 345,
			s: '3%',
			l: '25.9%',
		},
		rgb: {},
	},
	surface4: {
		hsl: {
			h: 345,
			s: '2.1%',
			l: '38%',
		},
		rgb: {},
	},
	colorOpposite: {
		hsl: {
			h: 0,
			s: '0%',
			l: '100%',
		},
		rgb: {
			r: 255,
			g: 255,
			b: 255,
		},
		hex: '#fff',
	},
	text1: {
		hsl: {
			h: 0,
			s: '0%',
			l: '100%',
		},
		rgb: {},
	},
	text2: {
		hsl: {
			h: 82.5,
			s: '53.3%',
			l: '94.1%',
		},
		rgb: {},
	},
	boxShadow: {
		xxs: `
			.01rem .01rem .01rem rgba(0, 0, 0, 0.225),
			.01rem .01rem .01rem rgba(0, 0, 0, 0.323),
			.03rem .03rem .03rem rgba(0, 0, 0, 0.4),
			.04rem .04rem .04rem rgba(0, 0, 0, 0.477),
			.08rem .08rem .08rem rgba(0, 0, 0, 0.575)
			.2rem .2rem .2rem rgba(0, 0, 0, 0.8)`,
		xs: `
			.01rem .01rem .01rem rgba(0, 0, 0,  0.225),
			.03rem .03rem .03rem rgba(0, 0, 0, 0.323),
			.05rem .05rem .05rem rgba(0, 0, 0, 0.4),
			.09rem .09rem .09rem rgba(0, 0, 0, 0.477),
			.17rem .17rem .17rem rgba(0, 0, 0, 0.575),
			.4rem .4rem .4rem rgba(0, 0, 0, 0.8)`,
		sm: `
			.02rem .02rem .02rem rgba(0, 0, 0, 0.225),
			.04rem .04rem .04rem rgba(0, 0, 0, 0.323),
			.08rem .08rem .08rem rgba(0, 0, 0, 0.4),
			.13rem .13rem .13rem rgba(0, 0, 0, 0.477),
			.25rem .25rem .25rem rgba(0, 0, 0, 0.575)
			.6rem .6rem .6rem rgba(0, 0, 0, 0.8)`,
		ms: `
			.02rem .02rem .02rem rgba(0, 0, 0, 0.225),
			.05rem .05rem .05rem rgba(0, 0, 0, 0.323),
			.1rem .1rem .09rem rgba(0, 0, 0, 0.4),
			.18rem .18rem .16rem rgba(0, 0, 0, 0.477),
			.33rem .33rem .29rem rgba(0, 0, 0, 0.575),
			.8rem .8rem .7rem rgba(0, 0, 0, 0.8)`,
		md: `
			.03rem .03rem .03rem rgba(0, 0, 0, 0.225),
			.08rem .08rem .07rem rgba(0, 0, 0, 0.323),
			.15rem .15rem .14rem rgba(0, 0, 0, 0.4),
			.27rem .27rem .25rem rgba(0, 0, 0, 0.477),
			.5rem .5rem .46rem rgba(0, 0, 0, 0.575),
			1.2rem 1.2rem 1.1rem rgba(0, 0, 0, 0.8)`,
		ml: `
			.07rem .07rem .06rem rgba(0, 0, 0, 0.225),
			.17rem .17rem .15rem rgba(0, 0, 0, 0.323),
			.31rem .31rem .29rem rgba(0, 0, 0, 0.4),
			.56rem .56rem .51rem rgba(0, 0, 0, 0.477),
			10.04rem 10.04rem .96rem rgba(0, 0, 0, 0.575),
			2.5rem 2.5rem 2.3rem rgba(0, 0, 0, 0.8)`,
		lg: `
			.14rem .14rem .12rem rgba(0, 0, 0, 0.225),
			.33rem .33rem .3rem rgba(0, 0, 0, 0.323),
			.63rem .63rem .56rem rgba(0, 0, 0, 0.4),
			1.12rem 1.12rem 10.01rem rgba(0, 0, 0, 0.477),
			20.09rem 20.09rem 1.88rem rgba(0, 0, 0, 0.575),
			5rem 5rem 4.5rem rgba(0, 0, 0, 0.8)`,
		xl: `
			.28rem .28rem .22rem rgba(0, 0, 0, 0.225),
			.67rem .67rem .53rem rgba(0, 0, 0, 0.323),
			1.25rem 1.25rem 1rem rgba(0, 0, 0, 0.4),
			2.23rem 2.23rem 1.79rem rgba(0, 0, 0, 0.477),
			4.18rem 4.18rem 3.34rem rgba(0, 0, 0, 0.575),
			10rem 10rem 8rem rgba(0, 0, 0, 0.8)`,
	},
	texturedBackground: `
		radial-gradient(circle farthest-side at 0% 50%,var(--surface1) 23.5%,rgba(0,0,0,0) 0)2.1rem 3.0rem,
		radial-gradient(circle farthest-side at 0% 50%,var(--surface0) 24%,rgba(0,0,0,0) 0)1.9rem 3.0rem,
		linear-gradient(var(--surface1) 14%,rgba(0,0,0,0) 0, rgba(0,0,0,0) 85%,var(--surface1) 0)0 0,
		linear-gradient(150deg,var(--surface1) 24%,var(--surface0) 0,var(--surface0) 26%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 74%,var(--surface0) 0,var(--surface0) 76%,var(--surface1) 0)0 0,
		linear-gradient(30deg,var(--surface1) 24%,var(--surface0) 0,var(--surface0) 26%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 74%,var(--surface0) 0,var(--surface0) 76%,var(--surface1) 0)0 0,
		linear-gradient(90deg,var(--surface0) 2%,var(--surface1) 0,var(--surface1) 98%,var(--surface0) 0%)0 0 var(--surface1)`,
};

export const themeLight = {
	mode: 'light',
	...themeCommon,
	surface0: {
		hsl: {
			h: 0,
			s: '0%',
			l: '100%',
		},
		rgb: {
			r: 255,
			g: 255,
			b: 255,
		},
	},
	surface1: {
		hsl: {
			h: 85,
			s: '20%',
			l: '99%',
		},
		rgb: {
			r: 253,
			g: 253,
			b: 253,
		},
	},
	surface2: {
		hsl: {
			h: 85,
			s: '20%',
			l: '92%',
		},
		rgb: {},
	},
	surface3: {
		hsl: {
			h: 85,
			s: '25%',
			l: '90%',
		},
		rgb: {},
	},
	surface4: {
		hsl: {
			h: 85,
			s: '20%',
			l: '85%',
		},
		rgb: {},
	},
	colorOpposite: {
		hsl: {
			h: 0,
			s: '0%',
			l: '0%',
		},
		rgb: {
			r: 0,
			g: 0,
			b: 0,
		},
		hex: '#000',
	},
	text1: {
		hsl: {
			h: 85,
			s: '54%',
			l: '10%',
		},
		rgb: {},
	},
	text2: {
		hsl: {
			h: 85,
			s: '30%',
			l: '30%',
		},
		rgb: {},
	},
	boxShadow: {
		xxs: `
			.01rem .01rem .01rem rgba(0, 0, 0, 0.02),
			.01rem .01rem .01rem rgba(0, 0, 0, 0.028),
			.03rem .03rem .03rem rgba(0, 0, 0, 0.035),
			.04rem .04rem .04rem rgba(0, 0, 0, 0.042),
			.08rem .08rem .08rem rgba(0, 0, 0, 0.05)
			.2rem .2rem .2rem rgba(0, 0, 0, 0.07)`,
		xs: `
			.01rem .01rem .01rem rgba(0, 0, 0, 0.02),
			.03rem .03rem .03rem rgba(0, 0, 0, 0.028),
			.05rem .05rem .05rem rgba(0, 0, 0, 0.035),
			.09rem .09rem .09rem rgba(0, 0, 0, 0.042),
			.17rem .17rem .17rem rgba(0, 0, 0, 0.05),
			.4rem .4rem .4rem rgba(0, 0, 0, 0.07)`,
		sm: `
			.02rem .02rem .02rem rgba(0, 0, 0, 0.02),
			.04rem .04rem .04rem rgba(0, 0, 0, 0.028),
			.08rem .08rem .08rem rgba(0, 0, 0, 0.035),
			.13rem .13rem .13rem rgba(0, 0, 0, 0.404277),
			.25rem .25rem .25rem rgba(0, 0, 0, 0.05)
			.6rem .6rem .6rem rgba(0, 0, 0, 0.07)`,
		ms: `
			.02rem .02rem .02rem rgba(0, 0, 0, 0.02),
			.05rem .05rem .05rem rgba(0, 0, 0, 0.028),
			.1rem .1rem .09rem rgba(0, 0, 0, 0.035),
			.18rem .18rem .16rem rgba(0, 0, 0, 0.042),
			.33rem .33rem .29rem rgba(0, 0, 0, 0.05),
			.8rem .8rem .7rem rgba(0, 0, 0, 0.07)`,
		md: `
			.03rem .03rem .03rem rgba(0, 0, 0, 0.02),
			.08rem .08rem .07rem rgba(0, 0, 0, 0.028),
			.15rem .15rem .14rem rgba(0, 0, 0, 0.035),
			.27rem .27rem .25rem rgba(0, 0, 0, 0.042),
			.5rem .5rem .46rem rgba(0, 0, 0, 0.05),
			1.2rem 1.2rem 1.1rem rgba(0, 0, 0, 0.07)`,
		ml: `
			.07rem .07rem .06rem rgba(0, 0, 0, 0.02),
			.17rem .17rem .15rem rgba(0, 0, 0, 0.028),
			.31rem .31rem .29rem rgba(0, 0, 0, 0.035),
			.56rem .56rem .51rem rgba(0, 0, 0, 0.042),
			10.04rem 10.04rem .96rem rgba(0, 0, 0, 0.05),
			2.5rem 2.5rem 2.3rem rgba(0, 0, 0, 0.07)`,
		lg: `
			.14rem .14rem .12rem rgba(0, 0, 0, 0.02),
			.33rem .33rem .3rem rgba(0, 0, 0, 0.028),
			.63rem .63rem .56rem rgba(0, 0, 0, 0.035),
			1.12rem 1.12rem 10.01rem rgba(0, 0, 0, 0.042),
			20.09rem 20.09rem 1.88rem rgba(0, 0, 0, 0.05),
			5rem 5rem 4.5rem rgba(0, 0, 0, 0.07)`,
		xl: `
			.28rem .28rem .22rem rgba(0, 0, 0, 0.02),
			.67rem .67rem .53rem rgba(0, 0, 0, 0.028),
			1.25rem 1.25rem 1rem rgba(0, 0, 0, 0.035),
			2.23rem 2.23rem 1.79rem rgba(0, 0, 0, 0.042),
			4.18rem 4.18rem 3.34rem rgba(0, 0, 0, 0.05),
			10rem 10rem 8rem rgba(0, 0, 0, 0.07)`,
	},
	texturedBackground: `
		radial-gradient(circle farthest-side at 0% 50%,var(--surface0) 23.5%,rgba(0,0,0,0) 0)2.1rem 3.0rem,
		radial-gradient(circle farthest-side at 0% 50%,var(--surface2) 24%,rgba(0,0,0,0) 0)1.9rem 3.0rem,
		linear-gradient(var(--surface0) 14%,rgba(0,0,0,0) 0, rgba(0,0,0,0) 85%,var(--surface0) 0)0 0,
		linear-gradient(150deg,var(--surface0) 24%,var(--surface2) 0,var(--surface2) 26%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 74%,var(--surface2) 0,var(--surface2) 76%,var(--surface0) 0)0 0,
		linear-gradient(30deg,var(--surface0) 24%,var(--surface2) 0,var(--surface2) 26%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 74%,var(--surface2) 0,var(--surface2) 76%,var(--surface0) 0)0 0,
		linear-gradient(90deg,var(--surface2) 2%,var(--surface0) 0,var(--surface0) 98%,var(--surface2) 0%)0 0 var(--surface0)`
};
