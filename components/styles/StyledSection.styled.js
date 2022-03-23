import styled from 'styled-components';

const StyledSection = styled.section`
	position: relative;
	max-width: 100%;
	padding-left: ${({ theme }) => theme.spaces.ml};
	padding-right: ${({ theme }) => theme.spaces.ml};
	overflow: hidden;
`;

export default StyledSection;
