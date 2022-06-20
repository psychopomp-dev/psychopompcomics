import styled from 'styled-components';

export const StyledCopyright = styled.span`
	text-transform: uppercase;
`;

export const StyledCopyrightContainer = styled.div`
	margin-bottom: var(--space-md);
	width: 100%;
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 2;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		width: initial;
		grid-column-start: initial;
		grid-column-end: initial;
		grid-row-start: initial;
	}
`;

export const StyledFooter = styled.footer`
	max-width: 100%;
	text-align: center;
	background-color: var(--surface1);
	border-top: 0.1rem solid hsl(var(--brand-hue) 10% 50% / 15%);
	margin-top: var(--space-xxl);
	padding: var(--space-lg) var(--space-xxl) 0;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		margin-top: var(--space-lg);
		padding: var(--space-lg);
	}
`;
