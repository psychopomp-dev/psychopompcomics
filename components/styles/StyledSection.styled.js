import styled from 'styled-components';

const StyledSection = styled.section`
	position: relative;
	max-width: 100%;
	padding-left: var(--space-ml);
	padding-right: var(--space-ml);
	overflow: hidden;

	& + & {
		margin-top: var(--space-xxxl);
	}
`;

export default StyledSection;
