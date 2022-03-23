import styled from 'styled-components';
import { motion } from 'framer-motion';
import MotionHeader from '../components/styles/MotionHeader.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import MotionFooter from '../components/Footer';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import Image from 'next/image';
import SoCBanner from '../images/seed-of-cain/banner.jpg';
import SoCLogo from '../images/seed-of-cain/logo.png';
import {
	RobotIconHexagon,
	BlockchainIconHexagon,
	MicrochipIconHexagon,
} from '../components/HexagonIcons';
import LogoWithText from '../components/LogoWithText';

const SoCLogoContainer = styled(motion.div)`
	position: absolute;
	bottom: 25%;
	right: 5%;
	width: 33.3%;
	z-idex: 2;
	min-width: 25rem;

	@media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
		bottom: 10%;
	}
`;

const PsychoDescriptionContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: ${({ theme }) => theme.spaces.xl};
	max-width: 72rem;
	margin-left: auto;
	margin-right: auto;

	& > div + div {
		margin-left: ${({ theme }) => theme.spaces.lg};
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
		flex-wrap: wrap;
		max-width: 27rem;
	}
`;

const PsychoDescriptionImage = styled(motion.div)`
	width: 20rem;
	flex-shrink: 0;

	@media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
		width: 100%;
		flex-shrink: initial;
	}
`;

const PsychoDescriptionText = styled.div`
	flex-shrink: 1;

	@media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
		width: 100%;
		flex-shrink: initial;
		margin-top: ${({ theme }) => theme.spaces.xl};
	}
`;

const ThreeUpContainer = styled.div`
	margin-top: ${({ theme }) => theme.spaces.xxl};
	max-width: 90rem;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-gap: ${({ theme }) => theme.spaces.xl};
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas: 'item item item';

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: 27rem;
		grid-template-columns: 1fr;
		grid-template-areas:
			'item'
			'item'
			'item';
	}
`;

const ThreeUpItem = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const ThreeUpImageContainer = styled.div`
	max-width: 15rem;
	margin-left: auto;
	margin-right: auto;
`;

export default function Home() {
	return (
		<>
			<MotionHeader>
				<Image
					src={SoCBanner}
					alt='Seed of Cain Promo Banner showing Colonel Frost standing in rubble with a city behind him'
					width='6075'
					height='3417'
				/>
				<SoCLogoContainer
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1,
						duration: 1,
					}}
				>
					<Image
						src={SoCLogo}
						alt='Seed of Cain Logo'
						width='3076'
						height='1649'
					/>
				</SoCLogoContainer>
			</MotionHeader>
			<MotionMain>
				<StyledSection>
					<SectionContainer>
						<PsychoDescriptionContainer>
							<PsychoDescriptionImage>
								<LogoWithText />
							</PsychoDescriptionImage>
							<PsychoDescriptionText>
								<h2>A New Kind of Comic Studio</h2>
								<hr />
								<p>
									{
										'Psychopomp Comics will guide you into another realm. We are digitally native, NFT-powered and artist-centric. We use these values to disrupt the industry and provide unique experiene that bridges the legacy and digital world'
									}
								</p>
							</PsychoDescriptionText>
						</PsychoDescriptionContainer>
						<ThreeUpContainer>
							<ThreeUpItem>
								<ThreeUpImageContainer>
									<MicrochipIconHexagon />
								</ThreeUpImageContainer>
								<h2>Digitally Native</h2>
								<p>
									Our comics are free to read on our website, and we will
									continue to experiment with online story consumption
								</p>
							</ThreeUpItem>
							<ThreeUpItem>
								<ThreeUpImageContainer>
									<BlockchainIconHexagon />
								</ThreeUpImageContainer>
								<h2>NFT-Powered</h2>
								<p>
									Since our content is free, our main revenue stream is through
									digital collectibles on the Solana blockchain
								</p>
							</ThreeUpItem>
							<ThreeUpItem>
								<ThreeUpImageContainer>
									<RobotIconHexagon />
								</ThreeUpImageContainer>
								<h2>Artist-Centric</h2>
								<p>
									With smart contract technology we are able to share profits
									and royalties with the artists that helped create our stories
									and IP
								</p>
							</ThreeUpItem>
						</ThreeUpContainer>
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<MotionFooter />
		</>
	);
}
