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
		& * {
			stroke: var(--brand);
			stroke-width: 1;
		}
		@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
			display: block;

			svg {
				height: auto;
				width: 4.2rem;
			}
		}
	`,
	CloseMenuIcon: () => {
		return (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 48.7'>
				<path d='M9.7 12.9l22 22m-22 0l22-22' strokeMiterlimit='10' />
				<path
					d='M21 .9l20 12v22L21 47.5 1 34.9v-22l20-12'
					fill='none'
					strokeMiterlimit='10'
				/>
			</svg>
		);
	},
	OpenMenuIcon: () => {
		return (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 48.7'>
				<path d='M7.7 16.9h26m-26 7h26m-26 7h26' strokeMiterlimit='10' />
				<path
					d='M21 .9l20 12v22L21 47.5 1 34.9v-22l20-12'
					fill='none'
					strokeMiterlimit='10'
				/>
			</svg>
		);
	},
};
