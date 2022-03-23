import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledMotionNavbar = styled(motion.nav)`
    width: 100%;
    position: sticky;
    top 0;
    z-index: 100;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: var(--surface1);
    box-shadow: var(--box-shadow-ms);
    padding: ${({ theme }) => theme.spaces.md} ${({ theme }) =>
	theme.spaces.lg};
    * {
        background-color: var(--surface1);
    }
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin: 0;
        padding-bottom: ${({ theme }) => theme.spaces.lg};
    }
    @media only screen and (max-width: ${({ theme }) =>
			theme.breakpoints.xxs}) {
        padding-bottom: 0;
    }
`;
