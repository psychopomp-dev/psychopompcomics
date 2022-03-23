import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { DevRoutes } from '../utils/dev_routes';
import MotionHeader from '../components/styles/MotionHeader.styled';
import MotionMain from '../components/styles/MotionMain.styled';
import MotionFooter from '../components/Footer';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import { StartSwiperAutoPlay } from '../components/VanthSwiper';
const DynamicVanthSwiper = dynamic(() => import('../components/VanthSwiper'), {
	ssr: false,
});
import Image from 'next/image';
import ruinsImg from '../images/ruins.jpg';
import vanthImg from '../images/vanth.svg';
import twitterVanth from '../images/vanth/IMG_5841.jpeg';
import { TwoUp, TwoUpContainer } from '../components/styles/TwoUp.styled';
import LinkPrimary from '../components/styles/StyledButton.styled';

const CollectiblesHeader = styled(MotionHeader)`
	padding: ${({ theme }) => theme.spaces.xxxl} ${({ theme }) => theme.spaces.lg};
	text-align: center;
`;

const Title = styled.h1`
	color: #fff;
	z-index: 2;
	position: relative;
	display: block;
	width: 100%;
	max-width: 58rem;
	margin-left: auto;
	margin-right: auto;
`;

const Subtitle = styled(motion.h2)`
	margin-top: ${({ theme }) => theme.spaces.md};
	color: #fff;
	position: relative;
	z-index: 2;
`;

const VanthTwoUp = styled(TwoUpContainer)`
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	max-width: 75rem;
	flex-wrap: nowrap;
	margin-top: ${({ theme }) => theme.spaces.xxl};

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: 32rem;
		flex-wrap: wrap;
	}
`;

const VanthImageWrapper = styled(motion.div)`
	& > * {
		box-shadow: var(--box-shadow-md);
		border-radius: 4rem;
	}
`;

const LegendTwoUP = styled(VanthTwoUp)`
	flex-wrap: nowrap;
	max-width: 100%;

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		flex-direction: column-reverse;
		flex-wrap: wrap;
	}
`;

export default function Collectibles() {
	return (
		<>
			<CollectiblesHeader>
				<Title>There are shadows that walk in the footsteps of man</Title>
				<Subtitle
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5 }}
					onAnimationComplete={StartSwiperAutoPlay}
				>
					Meet The Vanth
				</Subtitle>

				<Image
					src={ruinsImg}
					alt='Ancient ruins at sunset'
					layout='fill'
					objectFit='cover'
					objectPosition='bottom'
				/>
			</CollectiblesHeader>
			<MotionMain>
				<StyledSection>
					<SectionContainer>
						<DynamicVanthSwiper autoplay={false} />
					</SectionContainer>
				</StyledSection>
				<StyledSection>
					<SectionContainer>
						<LegendTwoUP>
							<TwoUp>
								<VanthImageWrapper
									initial={{ opacity: 0, y: '10rem' }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									viewport={{ once: true }}
								>
									<Image
										className='styled-img'
										src={twitterVanth}
										alt='Vanth Symbol'
										width='1080'
										height='1080'
									/>
								</VanthImageWrapper>
							</TwoUp>
							<TwoUp>
								<h2>Beings of Legend</h2>
								<p>{`In a time before Homer wrote his epic poems the Iliad and the Odyssey, legend tells of Vanth, the first spirit guide—or psychopomp—to the underworld.  Sometimes pictured with Charun the boatman, the benevolent Vanth would lead the dead along ancient paths, her torch held high lighting the way.  At a gate as old as the world itself she would produce a key and unlock the way to the underworld.`}</p>
								<p>{`Ancient writings have described the chthonic goddess as being “in the company of other Vanth,” suggesting Vanth can take many forms or is not singular.  Perhaps she receded from myth and memory because she preferred to take the shape of the beasts and birds so often identified as psychopomps, such as the wolves and the ravens and the deer of the dead.`}</p>
								<p>{`Perhaps.`}</p>
							</TwoUp>
						</LegendTwoUP>
						<VanthTwoUp>
							<TwoUp>
								<div>
									<h2>{'Vanth are the Key'}</h2>
									<p>{'Buying a Vanth unlocks:'}</p>
									<ul>
										<li>
											{
												'Airdrops from all major Psychopomp title collections FOREVER'
											}
										</li>
										<li>
											{
												'A seat on the Vanth Council, and the exclusive access that comes with it as a trusted advisor to the business.'
											}
										</li>
										<li>
											{
												'The opportunity to get 1/1 airdrops of comic book panels or other special art.'
											}
										</li>
										<li>
											{
												'Owning a free NFT from each title collection will also generate additional airdrops specific to the collection.'
											}
										</li>
									</ul>
									<LinkPrimary href='#'>
										<a
											href='https://exchange.art/collections/Vanth/nfts'
											target='_blank'
											rel='noreferrer'
										>
											Find your spirit guide
										</a>
									</LinkPrimary>
								</div>
							</TwoUp>
							<TwoUp>
								<Image
									src={vanthImg}
									alt='Vanth Symbol'
									width='1080'
									height='1080'
								/>
							</TwoUp>
						</VanthTwoUp>
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<MotionFooter />
		</>
	);
}
