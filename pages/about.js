import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import AboutHeaderContainer from '../components/styles/AboutHeader.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import TwoUpAbout from '../components/styles/TwoUpAbout.styled';
import Footer from '../components/Footer';

export default function About() {
	return (
		<>
			<MotionMain>
				<AboutHeaderContainer />
				<StyledSection>
					<SectionContainer>
						<TwoUpAbout />
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<Footer />
		</>
	);
}
