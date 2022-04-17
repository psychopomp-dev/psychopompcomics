import styled from 'styled-components';
import { m } from 'framer-motion';

export const StyledMotionNavLinkList = styled(m.ul)`
	width: 50%;
	display: flex;
	justify-content: center;
	list-style: none;
	padding: 0;
	li {
		display: flex;
		align-items: center;

		& > div > a {
			font-size: var(--font-size-ml);
		}

		&:last-child {
			display: none;
		}
	}
	li + li:before {
		content: '';
		background-color: var(--surface4);
		width: 2px;
		margin: 0 1rem;
		height: 80%;
	}
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		li:last-child {
			display: initial;
		}
	}

	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		position: fixed;
		top: 6.2rem;
		left: 0;
		width: 100%;
		height: 90%;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 0;
		li * {
			flex-grow: 1;
			text-align: center;
		}

		li {
			padding: var(--space-ml);
		}

		li:last-child {
			margin-bottom: var(--space-lg);
		}

		li:last-child * {
			flex-grow: unset;
		}

		li:not(li:last-child) {
			border-bottom: 2px solid var(--surface4);
		}

		li + li:before {
			display: none;
			margin: 0;
		}

		li a {
			transition-delay: 150ms;
		}
	}
`;
