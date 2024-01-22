import { useScroll, useTransform, m } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';

// Import images
import SeedOfCainSuperNear from '../../images/seed-of-cain/super-near.png';
import SeedOfCainNear from '../../images/seed-of-cain/near.png';
import SeedOfCainMid from '../../images/seed-of-cain/mid.png';
import SeedOfCainFar from '../../images/seed-of-cain/far.png';
import SeedOfCainLogo from '../../images/seed-of-cain/logo.png';

// Styled components
const ParallaxContainer = styled.section`
	position: relative;
	width: 100vw;
	height: 85vh;
	overflow: hidden;

`;

// Updated styled component for ParallaxLayer
const ParallaxLayer = styled(m.div)`
	position: absolute;
	height: 140vh; /* Taller than the container */
	aspect-ratio: 3076 / 1649;
	left: 50%;
	top: ${({ topoffsetrem = 0 }) => `${topoffsetrem}vh`};
`;

const SeedOfCainLogoContainer = styled(m.div)`
	position: absolute;
	bottom: 25%;
	right: 5%;
	width: 33.3%;
	z-index: 5;

	@media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
		bottom: 10%;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		width: 25rem;
	}
`;

// Component
export default function SeedOfCainHero() {
	const { scrollY } = useScroll();
	const aspectRatio = 3076 / 1649;
	const imageWidthVh = 140 * aspectRatio;
	const imageWidth = `${imageWidthVh}vh`;

	// Framer motion transforms for each layer
	const superNearTransform = useTransform(scrollY, [0, 500], [0, -2000]);
	const nearTransform = useTransform(scrollY, [0, 500], [0, -400]);
	const midTransform = useTransform(scrollY, [0, 500], [0, -100]);
	const farTransform = useTransform(scrollY, [0, 500], [0, -25]);

	return (
		<ParallaxContainer >
			<ParallaxLayer
				style={{ y: superNearTransform, zIndex: 4, translateX: '-50%' }}
				topoffsetrem={50}
			>
				<Image
					src={SeedOfCainSuperNear}
					alt='Specs and dust, top most image layer'
					layout='fill'
					objectFit='cover'
					sizes={imageWidth}
				/>
			</ParallaxLayer>
			<ParallaxLayer style={{ y: nearTransform, zIndex: 3, translateX: '-50%' }} topoffsetrem={10}>
				<Image
					src={SeedOfCainNear}
					alt='Colonel Frost holding a pistol and standing in a pile of dead robots, second image layer'
					layout='fill'
					objectFit='cover'
					sizes={imageWidth}
				/>
			</ParallaxLayer>
			<ParallaxLayer style={{ y: midTransform, zIndex: 2, translateX: '-50%' }}>
				<Image
					src={SeedOfCainMid}
					alt='Robots stand menacingly in a row behind Colonel Frost, third image layer'
					layout='fill'
					objectFit='cover'
					sizes={imageWidth}
				/>
			</ParallaxLayer>
			<ParallaxLayer style={{ y: farTransform, zIndex: 1, translateX: '-50%' }}>
				<Image
					src={SeedOfCainFar}
					alt='A city scape with a red sky and smoldering buildings, fourth image layer '
					layout='fill'
					objectFit='cover'
					sizes={imageWidth}
				/>
			</ParallaxLayer>
			<SeedOfCainLogoContainer
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					delay: 1,
					duration: 1,
				}}
			>
				<Image
					src={SeedOfCainLogo}
					alt='Seed of Cain Logo'
					layout='responsive'
					width={3076}
					height={1649}
				/>
			</SeedOfCainLogoContainer>
		</ParallaxContainer>
	);
}
