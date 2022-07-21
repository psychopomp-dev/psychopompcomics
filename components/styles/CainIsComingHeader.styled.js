import styled, { css } from 'styled-components';
import StyledHeader from './Header.styled';

const sixteenByNineStyles = css`
	max-height: initial;
	height: initial;
	aspect-ratio: 16 / 9;
`;

const CainIsComingHeader = styled(StyledHeader)`
	text-align: center;
	padding: var(--space-xxl) var(--space-lg) var(--space-xl);
	height: calc(100vh - 11.325rem);
	max-height: calc(100vw * (9 / 16));
	margin-bottom: var(--space-xxl);

	@media only screen and (min-aspect-ratio: 18/9) {
		${sixteenByNineStyles}
	}

	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
		${sixteenByNineStyles}
	}

	@media only screen and (orientation: portrait) {
		${sixteenByNineStyles}
	}
`;

export default CainIsComingHeader;
