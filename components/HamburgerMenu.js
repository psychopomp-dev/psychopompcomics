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
		padding: var(--space-sm);
		& * {
			stroke: var(--brand);
			stroke-width: 1.5;
		}
		@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
			display: block;

			svg {
				height: auto;
				width: 4rem;
			}
		}
	`,
	CloseMenuIcon: () => {
		return (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 70'>
				<path d='M13 18l33 33m-33 0l33-33' />
				<path d='M30 0l30 18v33L30 70 0 51V18L30 0' fill='none' />
			</svg>
		);
	},
	OpenMenuIcon: () => {
		return (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 70'>
				<path d='M10 24h39M10 34.5h39M10 45h39' />
				<path d='M30 0l30 18v33L30 70 0 51V18L30 0' fill='none' />
			</svg>
		);
	},
};
