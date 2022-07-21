import dynamic from 'next/dynamic';
import StyledCollectiblesHeader from '../components/styles/CollectiblesHeader.styled';
import MotionMain from '../components/styles/MotionMain.styled';
const DynamicFooter = dynamic(() => import('../components/Footer'));
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
const DynamicVanthSwiper = dynamic(() => import('../components/VanthSwiper'), {
	ssr: false,
});
const DynamicLegendTwoUpContainer = dynamic(() =>
	import('../components/styles/TwoUpLegend.styled')
);
const DynamicVanthTwoUpContainer = dynamic(() =>
	import('../components/styles/TwoUpVanth')
);

export default function Collectibles() {
	return (
		<>
			<MotionMain>
				<StyledCollectiblesHeader />
				<StyledSection>
					<SectionContainer>
						<DynamicVanthSwiper />
					</SectionContainer>
				</StyledSection>
				<StyledSection>
					<SectionContainer>
						<DynamicLegendTwoUpContainer />
						<DynamicVanthTwoUpContainer />
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<DynamicFooter />
		</>
	);
}
