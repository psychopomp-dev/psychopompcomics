import styled from 'styled-components';

const EmailCaptureContainer = styled.article`
	width: 100%;
	max-width: 33.4rem;
	margin: auto auto;
	display: flex;
	justify-content: center;
	align-items: stretch;
	box-shadow: var(--box-shadow-xxs);
	border-top-right-radius: 0.4rem;
	border-bottom-right-radius: 0.4rem;

	& input {
		width: calc(100% - 13.7rem);
		border-top: 0.1rem solid var(--brand);
		border-left: 0.1rem solid var(--brand);
		border-bottom: 0.1rem solid var(--brand);
		padding-left: 0.4rem;
		background-color: var(--surface2);
		color: var(--text2);
	}

	& > * {
		margin-top: 0;
	}

	& > div > div:first-child {
		display: none;
	}

	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		& a {
			min-width: ${({ theme }) =>
				theme.spaces.xxl.replace('rem', '') * 1.25}rem;
		}
	}
`;

export default EmailCaptureContainer;
