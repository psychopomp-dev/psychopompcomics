import styled from 'styled-components';
import { m } from 'framer-motion';

export const StyledMotionNavbar = styled(m.nav)`
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
    padding: var(--space-md) ${({ theme }) => theme.spaces.lg};
    * {
        background-color: var(--surface1);
    }
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin: 0 0 -1.2rem;
        padding-bottom: var(--space-sm);
        padding-top: var(--space-sm);
        box-shadow: var(--box-shadow-xs);
    }
    @media only screen and (max-width: ${({ theme }) =>
			theme.breakpoints.xxs}) {
        padding-bottom: 0;
    }
`;
