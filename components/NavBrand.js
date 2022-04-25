import Link from 'next/link';
import styled from 'styled-components';
import MotionLogo from './styles/MotionLogo.styled';

const NavBrandContainer = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	display: inline-block;
	z-index: 1;

	svg {
		height: auto;
		width: 7.26rem;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		position: initial;
		top: initial;
		left: initial;

		svg {
			height: auto;
			width: 4rem;
		}
	}
`;

export const NavBrand = ({ onClick }) => {
	return (
		<NavBrandContainer>
			<Link href='/'>
				<a onClick={onClick}>
					<MotionLogo />
				</a>
			</Link>
		</NavBrandContainer>
	);
};
