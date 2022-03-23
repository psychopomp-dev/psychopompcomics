import styled from 'styled-components';

const TwoUpContainer = styled.div`
	display: flex;
	flex-wrap: wrap;

	& > *:first-child {
		border-right: ${(props) =>
			props.divided ? '0.1rem solid var(--surface4)' : 'none'};
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
			border-right: none;
		}
	}
`;

const TwoUp = styled.article`
	width: 50%;
	padding-left: ${({ theme }) => theme.spaces.xl};
	padding-right: ${({ theme }) => theme.spaces.xl};
	margin-bottom: initial;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-bottom: ${({ theme }) => theme.spaces.xxl};
		width: 100%;
	}
`;

export { TwoUpContainer, TwoUp };
