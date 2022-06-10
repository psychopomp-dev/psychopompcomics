import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import MotionFooter from '../components/Footer';
import MotionHeader from '../components/styles/MotionHeader.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import { DevRoutes } from '../utils/dev_routes';
const DynamicRadio = dynamic(() => import('../components/Radio'));
const DynamicIntelReport = dynamic(() => import('../components/IntelReport'));
import { useTheme } from 'styled-components';
import Image from 'next/image';
import cainIsComing from '../images/seed-of-cain/cain-is-coming.jpg';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import { TwoUp, TwoUpContainer } from '../components/styles/TwoUp.styled';

const sixteenByNineStyles = css`
	max-height: initial;
	height: initial;
	aspect-ratio: 16 / 9;
`;

const CainIsComingHeader = styled(MotionHeader)`
	text-align: center;
	padding: var(--space-xxl) var(--space-lg) var(--space-xl);
	height: calc(100vh - 11.325rem);
	max-height: calc(100vw * (9 / 16));
	margin-bottom: var(--space-xxl);

	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
		${sixteenByNineStyles}
	}

	@media only screen and (orientation: portrait) {
		${sixteenByNineStyles}
	}
`;

const Title = styled.h1`
	text-align: center;
	color: var(--text1);
	margin: 0 0 3.2rem;
	position: relative;
	z-index: 2;
`;

const IntelContainer = styled.div`
	width: 100%;
	padding-bottom: var(--space-md);
	video {
		max-width: 100%;
		box-shadow: var(--box-shadow-md);
	}
`;

export default function Comics() {
	const theme = useTheme();
	return (
		<>
			<CainIsComingHeader>
				<Image
					src={cainIsComing}
					alt='Cain is coming'
					layout='fill'
					objectFit='cover'
					objectPosition='bottom'
					sizes='100vw'
					placeholder='blur'
				/>
			</CainIsComingHeader>
			<MotionMain>
				<StyledSection>
					<SectionContainer>
						<TwoUpContainer>
							<TwoUp>
								<h2>Something is Here</h2>
								<p>{`As I sat at my desk my phone started going off. News notifications, texts from friends and Twitter mentions. Something big had happened with Levitron Systems' Cogs in MY CITY. Our internet was out so I poured myself a whiskey and pulled out the emergency Radio. For once growing up in a prepper household paid off. Many of the stations were offline but I found a newsbroadcast on 1120am. I should probably check the other stations for news.`}</p>
							</TwoUp>
							<TwoUp>
								<DynamicRadio />
							</TwoUp>
						</TwoUpContainer>
					</SectionContainer>
				</StyledSection>
				<StyledSection xxxlTop>
					<SectionContainer>
						<TwoUpContainer>
							<TwoUp>
								<IntelContainer>
									<DynamicIntelReport
										sizes={`(max-width: ${theme.breakpoints.sm}) 100vw, 240rem`}
									/>
								</IntelContainer>
							</TwoUp>
							<TwoUp>
								<h2>Collected Intel</h2>
								<p>
									Things got bad, really bad. I lost track of time. I spent my
									days, weeks and months scurrying from one hiding place to
									another. When it was finally quiet outside I was able to do
									some extended scavenging and exploring. I came across a
									battlefield that had seen active combat until very recently. A
									flashing green light caught my eye and I saw a disembodied arm
									whose hand was still clutching a military communication
									tablet. As I swiped through it, I realized that it held the
									most accurate description of the events that lead us here that
									I would ever read.
								</p>
							</TwoUp>
						</TwoUpContainer>
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<MotionFooter />
		</>
	);
}

export const getServerSideProps = DevRoutes;
