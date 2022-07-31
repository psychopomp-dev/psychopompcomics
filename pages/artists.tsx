import styled from 'styled-components';
import Footer from '../components/Footer';
import StyledHeader from '../components/styles/Header.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import { DevRoutes } from '../utils/dev_routes';

const Title = styled.h1`
	text-align: center;
	color: var(--text1);
	margin: 0 0 3.2rem;
`;

export default function Artists() {
	return (
		<>
			<MotionMain>
				<StyledHeader>
					<Title>Artists</Title>
				</StyledHeader>
			</MotionMain>
			<Footer />
		</>
	);
}

export const getServerSideProps = DevRoutes;
