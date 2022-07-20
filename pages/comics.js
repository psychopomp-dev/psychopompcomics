import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
const DynamicFooter = dynamic(() => import('../components/Footer'));
import MotionMain from '../components/styles/MotionMain.styled';
import { DevRoutes } from '../utils/dev_routes';
import CainIsComingHeader from '../components/styles/CainIsComingHeader.styled';
const DynamicRadio = dynamic(() => import('../components/Radio'));
const DynamicIntelReport = dynamic(() => import('../components/IntelReport'));
import { useTheme } from 'styled-components';
import Image from 'next/image';
import cainIsComing from '../images/seed-of-cain/cain-is-coming.jpg';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import { TwoUp, TwoUpContainer } from '../components/styles/TwoUp.styled';
import { m } from 'framer-motion';
import { FadeInLeft } from '../components/themes/MotionVariants';

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
			<MotionMain>
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
				<StyledSection>
					<SectionContainer>
						<TwoUpContainer>
							<TwoUp twoUpWidth='33%'>
								<m.h2
									variants={FadeInLeft}
									initial='hidden'
									whileInView='visible'
									viewport='viewport'
								>
									Something is Here
								</m.h2>
								<p>{`As I sat at my desk my phone started going off. News notifications, texts from friends and mentions. Something big had happened with Levitron Systems' Cogs in MY CITY. Our internet was out so I poured myself a whiskey and pulled out the emergency Radio. For once growing up in a prepper household paid off. Many of the stations were offline but I found a newsbroadcast on 1120am. I should probably check the other stations for news.`}</p>
							</TwoUp>
							<TwoUp twoUpWidth='67%'>
								<DynamicRadio />
							</TwoUp>
						</TwoUpContainer>
					</SectionContainer>
				</StyledSection>
				<StyledSection xxxlTop>
					<SectionContainer>
						<TwoUpContainer reverseOnCollapse={true}>
							<TwoUp twoUpWidth='67%'>
								<IntelContainer>
									<DynamicIntelReport
										sizes={`(max-width: ${theme.breakpoints.xxs}) 74.3vw, (max-width: ${theme.breakpoints.xs}) 83.3vw, (max-width: ${theme.breakpoints.sm}) 87.5vw, (max-width: ${theme.breakpoints.md}) 90.3vw, (max-width: 1311px) 60.5vw, 79.36rem`}
									/>
								</IntelContainer>
							</TwoUp>
							<TwoUp twoUpWidth='33%'>
								<m.h2
									variants={FadeInLeft}
									initial='hidden'
									whileInView='visible'
									viewport='viewport'
								>
									Collected Intel
								</m.h2>
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
			<DynamicFooter />
		</>
	);
}
