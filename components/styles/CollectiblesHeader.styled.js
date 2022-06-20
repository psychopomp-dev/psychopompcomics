import styled from 'styled-components';
import { m } from 'framer-motion';
import StyledHeader from './Header.styled';
import Image from 'next/image';
import ruinsImg from '../../images/ruins.jpg';
import { StartSwiperAutoPlay } from '../VanthSwiper';

const CollectiblesHeader = styled(StyledHeader)`
	padding: var(--space-xxxl) var(--space-lg);
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

const Subtitle = styled(m.h2)`
	margin-top: var(--space-md);
	color: #fff;
	position: relative;
	z-index: 2;
`;

export default function StyledCollectiblesHeader() {
	return (
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
				sizes='100vw'
				placeholder='blur'
			/>
		</CollectiblesHeader>
	);
}
