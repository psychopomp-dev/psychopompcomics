import dynamic from 'next/dynamic';
import StyledHeader from '../components/styles/Header.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import Footer from '../components/Footer';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import SeedOfCainHero from '../components/styles/SeedOfCainHero.styled';
import { m } from 'framer-motion';
import { FadeInDelay } from '../components/themes/MotionVariants';

const DynamicPsychoDescription = dynamic(
	() => import('../components/styles/PsychoDescription.styled')
);
const DynamicThreeUpNft = dynamic(
	() => import('../components/styles/ThreeUpNft.styled')
);

export default function Home() {
	return (
		<>
			<MotionMain>
				<StyledHeader>
					<SeedOfCainHero />
				</StyledHeader>
				<StyledSection>
					<SectionContainer>
						<m.div
							variants={FadeInDelay}
							initial='hidden'
							whileInView='visible'
							// viewport='viewport'
						>
							<DynamicPsychoDescription />
						</m.div>
						<DynamicThreeUpNft />
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<Footer />
		</>
	);
}
