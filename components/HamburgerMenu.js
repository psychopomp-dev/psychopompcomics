import styled from 'styled-components';

export const HamburgerMenu = {
	Wrapper: styled.button`
		display: none;
		align-items: center;
		cursor: pointer;
		border: none;
		background: transparent;
		outline: none;
		z-index: 1;
		width: ${({ theme }) => theme.spaces.xxl.replace('rem', '') * 1.2}rem;
		padding: ${({ theme }) => theme.spaces.sm};
		& * {
			stroke: var(--brand);
			stroke-width: 1.5;
		}
		@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
			display: block;
		}
	`,
	CloseMenuIcon_1: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 33,33 L 66,66' />
				<path d='M 33,66 L 66,33' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	CloseMenuIcon_2: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 33,33 L 66,66' />
				<path d='M 33,66 L 66,33' />
			</svg>
		);
	},
	CloseMenuIcon_3: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30,35 L 69,64' />
				<path d='M 30,64 L 69,35' />
			</svg>
		);
	},
	CloseMenuIcon_4: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30,39 L 69,60' />
				<path d='M 30,60 L 69,39' />
			</svg>
		);
	},
	CloseMenuIcon_5: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 33,33 L 66,66' />
				<path d='M 33,66 L 66,33' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	CloseMenuIcon_6: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30,35 L 69,64' />
				<path d='M 30,64 L 69,35' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	CloseMenuIcon_7: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30,39 L 69,60' />
				<path d='M 30,60 L 69,39' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	CloseMenuIcon_8: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30,39 L 69,60' />
				<path d='M 30,60 L 69,39' />
				<polyline
					points='50,10 90,33 90,66 50,90 10,66 10,33 50,10'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='round'
				/>
			</svg>
		);
	},
	CloseMenuIcon_9: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 20,62 L 80,37' />
				<path d='M 20,37 L 80,62' />
				<polyline
					points='50,10 90,33 90,66 50,90 10,66 10,33 50,10'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='round'
				/>
			</svg>
		);
	},
	CloseMenuIcon_12: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 32 25.66 H 68' />
				<path d='M 30 72.33 H 70' />
				<path d='M 20,60.66 L 80,37.33' />
				<path d='M 20,37.33 L 80,60.66' />
			</svg>
		);
	},
	CloseMenuIcon_13: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 28 28 H 72' />
				<path d='M 30 72.33 H 70' />
				<path d='M 29 72 H 71' />

				<path d='M 29,28 L 71,72' />
				<path d='M 29,72 L 71,28' />
			</svg>
		);
	},
	OpenMenuIcon_1: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30 39 H 69' />
				<path d='M 30 49.5 H 69' />
				<path d='M 30 60 H 69' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	OpenMenuIcon_2: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 33 33 H 66' />
				<path d='M 33 49.5 H 66' />
				<path d='M 33 66 H 66' />
			</svg>
		);
	},
	OpenMenuIcon_3: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30 35 H 69' />
				<path d='M 30 49.5 H 69' />
				<path d='M 30 64 H 69' />
			</svg>
		);
	},
	OpenMenuIcon_4: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30 39 H 69' />
				<path d='M 30 49.5 H 69' />
				<path d='M 30 60 H 69' />
			</svg>
		);
	},
	OpenMenuIcon_5: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 33 33 H 66' />
				<path d='M 33 49.5 H 66' />
				<path d='M 33 66 H 66' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	OpenMenuIcon_6: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30 35 H 69' />
				<path d='M 30 49.5 H 69' />
				<path d='M 30 64 H 69' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	OpenMenuIcon_7: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 30 39 H 69' />
				<path d='M 30 49.5 H 69' />
				<path d='M 30 60 H 69' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='miter'
				/>
			</svg>
		);
	},
	OpenMenuIcon_8: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<polyline
					points='50,10 90,33 90,66 50,90 10,66 10,33 50,10'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='round'
				/>
			</svg>
		);
	},
	OpenMenuIcon_9: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<polyline
					points='50,10 90,33 90,66 50,90 10,66 10,33 50,10'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='bevel'
				/>
			</svg>
		);
	},
	OpenMenuIcon_10: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 35 24 H 65' />
				<path d='M 20 33 H 80' />
				<path d='M 20 50 H 80' />
				<path d='M 20 66 H 80' />
				<path d='M 35 75 H 65' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='bevel'
				/>
			</svg>
		);
	},
	OpenMenuIcon_11: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 32 25.66 H 68' />
				<path d='M 20 37.33 H 80' />
				<path d='M 20 49 H 80' />
				<path d='M 20 60.66 H 80' />
				<path d='M 30 72.33 H 70' />
				<polyline
					points='50,15 80,33 80,66 50,85 20,66 20,33 50,15'
					strokeLinecap='round'
					fill='none'
					stroke-linejoing='bevel'
				/>
			</svg>
		);
	},
	OpenMenuIcon_12: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 32 25.66 H 68' />
				<path d='M 20 37.33 H 80' />
				<path d='M 20 49 H 80' />
				<path d='M 20 60.66 H 80' />
				<path d='M 30 72.33 H 70' />
				{/* <polyline points="50,15 80,33 80,66 50,85 20,66 20,33 50,15" strokeLinecap="round" fill="none" stroke-linejoing="bevel" /> */}
			</svg>
		);
	},
	OpenMenuIcon_13: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 45 18 H 55' />
				{/* <path d="M 37 23 H 63" /> */}
				<path d='M 28 28 H 72' />

				{/* <path d="M 20 33 H 80" /> */}
				<path d='M 20 38.5 H 80' />
				{/* <path d="M 20 44 H 80" /> */}
				<path d='M 20 49.5 H 80' />
				{/* <path d="M 20 55 H 80" /> */}
				<path d='M 20 60.5 H 80' />
				{/* <path d="M 20 66 H 80" /> */}

				<path d='M 29 72 H 71' />
				{/* <path d="M 37 77 H 63" /> */}
				<path d='M 45 82 H 55' />
				{/* <polyline points="50,15 80,33 80,66 50,85 20,66 20,33 50,15" strokeLinecap="round" fill="none" stroke-linejoing="bevel" /> */}
			</svg>
		);
	},
	OpenMenuIcon_14: () => {
		return (
			<svg
				height='auto'
				width='100%'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
			>
				<path d='M 45 18 H 55' />
				<path d='M 37 23 H 63' />
				<path d='M 28 28 H 72' />

				<path d='M 20 33 H 80' />
				<path d='M 20 38.5 H 80' />
				<path d='M 20 44 H 80' />
				<path d='M 20 49.5 H 80' />
				<path d='M 20 55 H 80' />
				<path d='M 20 60.5 H 80' />
				<path d='M 20 66 H 80' />

				<path d='M 29 72 H 71' />
				<path d='M 37 77 H 63' />
				<path d='M 45 82 H 55' />
				{/* <polyline points="50,15 80,33 80,66 50,85 20,66 20,33 50,15" strokeLinecap="round" fill="none" stroke-linejoing="bevel" /> */}
			</svg>
		);
	},
};
