import styled from 'styled-components';

const SectionContainer = styled.div`
	position: relative;
	width: 128rem;
	max-width: 100%;
	margin-left: auto;
	margin-right: auto;

	&:first-child {
		margin-top: var(--space-xl);
	}
`;

export default SectionContainer;
