import styled from 'styled-components';

const TwoUpContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		flex-direction: ${(props) =>
			props.reverseOnCollapse ? 'column-reverse' : 'column'};
	}

	& > *:first-child {
		border-right: ${(props) =>
			props.divided ? '0.1rem solid var(--surface4)' : 'none'};
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			border-right: none;
		}
	}
`;

const TwoUp = styled.article`
	width: ${(props) => (props.twoUpWidth ? `${props.twoUpWidth}` : '50%')};
	padding-left: var(--space-xl);
	padding-right: var(--space-xl);
	margin-bottom: initial;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding-left: 0;
		padding-right: 0;
		margin-bottom: var(--space-xxl);
		width: 100%;
	}
`;

export { TwoUpContainer, TwoUp };
