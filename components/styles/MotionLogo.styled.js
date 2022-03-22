import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';

const Logo = styled(motion.svg)`
	width: 100%;
	display: block;
`;

const svgVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 2,
		},
	},
};

const hexVariant = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 2,
			ease: 'easeInOut',
		},
	},
};

const pathVariants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		transition: {
			delay: 2,
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const circleVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

export default function MotionLogo() {
	const theme = useTheme();
	return (
		<Logo
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 429.56 558.96'
			role='img'
			variants={svgVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
		>
			<title>{`Psychopomp Comics`}</title>
			<g>
				<motion.path
					stroke={theme.brand.hex}
					strokeWidth='9'
					fill='none'
					strokeMiterlimit='10'
					d='M323.65 422.55l101.41-57.67V124.75L214.78 5.18 4.5 124.75v239.13l101.74 58.34'
					variants={hexVariant}
				/>
				<path
					fill={theme.colorOpposite.hex}
					d='M304.26 449.73c-1.54-3.31-12.62-9.32-17.52-9.11 8.54 15.62 8.13 53.89-6.39 73.19-.09-4.43-5.5-14.48-11.12-18.21-2.67 25.68-35.57 56.61-54.53 63.36-19-6.78-51.83-37.71-54.53-63.36-5.6 3.73-11 13.77-11.12 18.21-14.52-19.3-14.92-57.61-6.39-73.19-4.87-.21-16 5.8-17.52 9.11-4.78-19.69 2.72-53 21.13-68.65-5.08 14.8-5.17 28.85-2.61 43.95l8.72-13.32c-5.3 20.87 2.1 55.5 9.8 69.19 2.85-8.87 5.69-17.72 8.5-26.61 8.34 24.32 28.65 52.88 44 71 15.38-18.16 35.66-46.68 44-71 2.83 8.89 5.65 17.74 8.51 26.61 7.58-14 14.69-48.46 9.79-69.19q4.38 6.65 8.72 13.32c2.55-15.12 2.51-29.18-2.62-44 18.47 15.69 25.98 48.97 21.18 68.7z'
				/>
				<path
					fill={theme.colorOpposite.hex}
					d='M353.41 325.2c-23.34-21.41-56.86-26.52-83-6.68 0 0-.76.71-1.77 1.72A124.71 124.71 0 00246 298c-4.15-1.21-8.34.67-12.36 1.56-4.26 1.6-8.93 1.59-13.23 2.54a25.82 25.82 0 01-11.37 0c-4.23-1-8.94-.94-13.18-2.54-4-.89-8.2-2.77-12.35-1.56a123.24 123.24 0 00-22.62 22.21c-1-1-1.67-1.64-1.69-1.64-15.26-12.12-37-15.2-55.58-9.84-11.09 3.68-20.27 10.83-29.24 18 18 23 50.71 32.62 78.3 22.91 2.76 9.16-4 17.3-3.23 26.38 3.33 18.19 19.57 39.26 29.16 56.64 8.88 14.79 6.89 34 17.88 47.66 5 5.26 12 9.93 19.56 9.24 27.95-3.76 23.81-37.84 34.85-56.9 9.6-17.44 25.77-38.36 29.15-56.64.78-9.09-6-17.27-3.21-26.43 27.61 9.8 60.39.17 78.44-22.86zM151.3 345.14c-6.92 1.39-14 4.08-21 4.05-18.52-1.25-36.87-8.06-49.55-21.89 20.24-6.23 56-14.28 69.26 7.44-1.28 3.56 1 6.84 1.81 10.21zm29.76 46.65c-14.49 2.8-23.67-7.11-26.43-20.44-.39 1.16-.74-.77-1-1.1 13.39-4.35 26.93 5.74 29.53 19 0 1.39 1.89 3 2.86 3.78zm43.41-42.37c.86 1.6 2 3.42 1.83 5.26a66.84 66.84 0 00-3.59-8.1 6.44 6.44 0 011.76 2.84zm-8.93-7.56c12 9.62 11.15 25.46 0 35.45-11.25-10.08-11.94-25.9 0-35.45zm-12.27 16.53c-.93 6.81 3.1 12.24 7.18 17.08-4.45-4.22-8.98-10.64-7.18-17.08zm26.84 120.19c-1.33 1.07-4.16.46-5.17 1.69 1 6.14-5.47 7.67-10.16 5.9-3.11 1-6.95 1.19-9.29-1.45-1.54-1-.06-4.15-1.36-4.92-2.35-.46-5.73-.61-5.72-3.71.25-3.79 1.09-9.13 5.2-10.71a8.09 8.09 0 016 1c.36.13 5.17.88 5.17.81s4.81-.68 5.17-.81a8.05 8.05 0 016-1c4.35 1.91 6.58 9.27 4.16 13.2zm45.37-107.35c-.14.31-.28.93-.55.12a24.11 24.11 0 00-.54 2.59c-3 9.67-10.2 19.31-21.48 18.13a21.76 21.76 0 00-9.41 1.06c1.09-.9 2.78-2.36 2.85-3.86 2.62-13.27 16.15-23.37 29.54-19a7.77 7.77 0 01-.41.96zM348 328.16c-12.76 13.22-30.61 19.83-48.8 21-7.21-.06-14.56-2.67-21.66-4.29 1.07-3.24 2.95-6.52 1.85-10 13.24-21.87 49-13.85 69.36-7.58-.25.34-.51.65-.75.87z'
				/>
				<path
					fill={theme.colorOpposite.hex}
					d='M154 308.73c-9.33-6.34-27.22-23.69-29.71-34.6-.21-2.35.39-28.63-.22-31.48a5.31 5.31 0 00-1.93-1h-.07a1.56 1.56 0 00-.57 0c-.1 0-.36.17-.07 0-.09 0-.56.42-.28.16-1.66 4-.14 22.6-.64 22.78-.79 8.71.11 17.87 5.79 25 10.41 18.11 16.24 16.37 34.38 22.82-2.28-1.2-4.53-2.41-6.68-3.68z'
				/>
				<path
					fill={theme.colorOpposite.hex}
					d='M178.36 320.19c-6.47.44-7.27-.08-13-2.62-8.16-3.06-19-6.62-27.29-9.34-7.15-3.29-15.06-5.77-19.45-12.87-6.11-13.58-11.29-31.44-9.48-46.41l3.42-13.46 4-9.73a3.91 3.91 0 00-.85-2.7c-4.37-1.06-9.43 21.27-10.18 25-2.75 10.66-2.26 22 0 32.73 1.58 7 3.84 18.32 9.47 23.09-.87-.55-3.52-2.47-4.64-2.4a24.76 24.76 0 01-8.56-1.66A40 40 0 0191 275.91c-.24-2.49.71-7.81 1.3-10.24 10-16.92-.58-30.5-7.12-46.19-1.15-2.57-5-12.76-6.12-15.55a2.6 2.6 0 00-2-1.81 1.54 1.54 0 00-.24.09 2.65 2.65 0 00-1.58 2.44c2.25 6.06 11.89 29.9 13.89 35.67 1.69 8.72-1.87 19.81-9.2 25-6.82 1.55-11.84-6.09-16-10.58-2.61-3.49-3.85-9.23-4.48-13.46a88.1 88.1 0 01-1.76-15c-.1-2.94-.21-8.87-.21-11.82.31-2.83.23-6.44-1.71-8.68-4-.33-2.83 5.1-3.1 7.56l-.06 8.12a44.89 44.89 0 00-.58 5.34l-.06-.05c0 7.4 1.91 21.06 3.31 28.32 1.57 6.2 7.63 13.21 11.79 17.88 14.27 9.69 16.79 32.22 32.36 39.74 7.58 1.39 18.16 2.38 25.56 4.79 10 3.6 19.8 6.43 27.6 13.58 4.58 4.21 9.7 7.92 14.7 11.74 1.83.62 7.76-6.06 9.29-4.73 3 4.89-2.34 4.5 5.5 9.34l13.36-12.28zm199.33-92.6a2.24 2.24 0 01-.11-.34 79.07 79.07 0 01-.74-13.34c.09-3.21 0-5.11-3.48-6.51-2.12 2.16-1.51 6.1-1.07 8.86 0 3-.2 8.87-.34 11.82a89 89 0 01-1.94 15c-.68 4.21-2 9.95-4.63 13.4-14.27 18.71-22.44 10.09-25.7-9.1-2.67-6.53 19.07-43.73 12.43-44l-.58.32c-1.8 1-4.79 10.73-5.71 12.51-.55 1.22-.61 2.76-1.51 3.78-6.22 15.1-17.1 31.13-7.42 47.13.55 2.48 1.45 7.74 1.18 10.26a39.91 39.91 0 01-11.07 23.7 24.76 24.76 0 01-8.57 1.56c-1.11-.09-3.78 1.79-4.67 2.35 4.4-3.41 7.15-12.41 8.5-17.76 3.33-12.54 4.33-26.08 1.44-38.79h.05c-1.66-7.85-4.25-17.44-7.87-24.63.26.4.09.13 0 0a2.5 2.5 0 00-1.35-.44 3.82 3.82 0 00-1.61 2.79c2.66 5.36 6 17.31 7.21 23.2 1.95 8.87-1 19-2.73 27.69a109.64 109.64 0 01-7.15 19.44l-3.5 4.33-3.92 2.82c-3.44 1.67-9.57 4.41-13.1 5.89-4.55 1.28-13.89 4.15-18.25 5.82-3.75 1.23-10.12 3.42-13.67 5.09-2 .59-5.5.24-7.58.19l-17.28 14.75 13.22 12.44c7.93-4.8 2.53-4.32 5.61-9.28 1.55-1.32 7.4 5.43 9.23 4.84 5-3.77 10.21-7.42 14.84-11.57 7.88-7.07 17.76-9.78 27.76-13.27 7.42-2.33 18-3.18 25.61-4.5 13-6.31 17.88-23.27 26.78-34.46 6-4.19 12.55-11.79 16.27-18 3.35-7.12 4.35-21.77 5.37-29.52h.05a33.38 33.38 0 010-4.47z'
				/>
				<path
					fill={theme.colorOpposite.hex}
					d='M308.91 242.69a2.57 2.57 0 00-2.92-.58q-.24.09.06 0a1.47 1.47 0 00-.56.3 3.2 3.2 0 00-.4 1.07c-.52 5.23 1.35 32.47-1.89 36.61a45.54 45.54 0 01-6.61 8.32c-3.95 4.11-8.88 10.18-12.7 14.4-3.16 3.2-8.7 6.17-12.56 8.38-.61.23-3 1.2-3.33 1.85l23.39-7.78c6.89-8.4 15-17.93 17.36-28.84.11-5.07.11-28.22.16-33.73z'
				/>
			</g>
			<g>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='m 135.64,185.9 0.05,-37.19 7.63,-7.13 0.01,-44.99 m -7.86,117.78 33.49,-42.81 0.05,-25.54 m -91.82,30.92 v 27.36 l 9.05,23.02'
					variants={pathVariants}
				/>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='m 83.39,218.53 8.91,-8.31 -0.03,-87.01 M 54.48,231.16 30.31,212.55 30.6,197.27 m 276.29,78.17 0.1,-32.83 -13.26,-12.6 0.36,-81.1 -7.67,-7.09 0.17,-44.84'
					variants={pathVariants}
				/>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='M294.12 214.7l-33.41-42.97.08-26.24m44.22-63.25l9.47 16.73-.25 68.49-20.59 19.09m58.78-8.39v26.51l-7.96 19.91'
					variants={pathVariants}
				/>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='m 346.63,219.54 -9.35,-8.88 0.25,-86.24 m 37.09,98.68 0.56,-36.08 8.94,-8.09 v -42.7 l 10.16,-8.28 m 4.65,71.44 0.24,13.59 -24.37,18.7'
					variants={pathVariants}
				/>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='M54.31 216.09l.18-29.7-9.18-8.29.08-42.44-9.44-8.62'
					variants={pathVariants}
				/>
				<motion.path
					strokeWidth='3.8'
					stroke={theme.colorOpposite.hex}
					fill='none'
					strokeMiterlimit='10'
					d='M316.35 229.78l-1.57-4.02.19-27.64 9.33-8.69m-201.94 80.76l.11-27.83 13.26-12.46-.09-43.85-20.16-18.96-.02-68.51 8.94-15.95m-14.15 154.49l.57-2.18 3.87-9.52v-27.73l-9.37-8.79m-50.04 27.19l1.09-6.86 8.18-20.8-.08-72.81m310.24 101.4l-.72-3.92-.71-3.11-8.25-21 .22-71.05'
					variants={pathVariants}
				/>
			</g>
			<g>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='30.47'
					cy='197.79'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.5,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='35.88'
					cy='127.39'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.7,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='64.7'
					cy='116.86'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.5,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='92.27'
					cy='123.72'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.9,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='124.69'
					cy='82.05'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.1,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='143.25'
					cy='96.78'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.3,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='77.26'
					cy='176.68'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.55,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='105.25'
					cy='188.91'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.75,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='168.91'
					cy='145.92'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.95,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='260.84'
					cy='145.79'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.15,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='286.57'
					cy='97.14'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.05,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='305.16'
					cy='82.42'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.85,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='337.56'
					cy='124.32'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.65,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='365.15'
					cy='117.48'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.4,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='393.94'
					cy='127.94'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1.2,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='399.05'
					cy='198.67'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 1,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='352.38'
					cy='177.17'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.8,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
				<motion.circle
					fill={theme.colorOpposite.hex}
					cx='324.35'
					cy='188.93'
					r='4.67'
					variants={circleVariants}
					transition={{
						delay: 0.6,
						duration: 0.5,
						ease: 'easeOut',
					}}
				/>
			</g>
		</Logo>
	);
}
