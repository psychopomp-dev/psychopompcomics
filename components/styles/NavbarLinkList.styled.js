import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledMotionNavLinkList = styled(motion.ul)`
	width: 50%;
	display: flex;
	justify-content: center;
	list-style: none;
	padding: 0;
	li {
		display: flex;
		align-items: center;

		& a {
			font-size: ${(props) => props.theme.fonts.sizes.ml};
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
	@media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
		li:last-child {
			display: initial;
		}
	}

	@media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
		position: fixed;
		top: 10%;
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
			padding: ${(props) => props.theme.spaces.ml};
		}

		li:last-child {
			margin-bottom: ${(props) => props.theme.spaces.lg};
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
