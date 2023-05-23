import React, { createRef } from 'react';
import { usePsychoClient } from '../../hooks/usePsychoClient';
import { Swiper as SwiperElement, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import Page from './Page';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Canvas } from './Canvas';
import { IConfig } from './IConfig';
import styled from 'styled-components';

const SwiperContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	width: 100%;
	height: 100%;

	.swiperSlide {
		display: flex;
		justify-content: center;
	}
`;

const StyledSwiper = styled(SwiperElement)`
	width: 100%;
	height: 100%;

	.swiper-button-prev::after,
	.swiper-button-next::after {
		color: var(--brand);
	}

	.swiper-button-prev::after {
		content: '‹';
	}

	.swiper-button-next::after {
		content: '›';
	}
`;

interface PsychoReaderProps {
	psychoReaderConfig: IConfig;
	debug?: boolean;
}

export const PsychoReader = ({
	psychoReaderConfig,
	debug = true,
}: PsychoReaderProps) => {
	const {
		canvasRefs,
		psychoClient,
		swiperRef,
		handleOnSlideChangeEnd,
		handleOnNavigationNext,
		handleOnNavigationPrev,
		handleOnSwiperMove,
	} = usePsychoClient(psychoReaderConfig, debug);

	return (
		<SwiperContainer>
			<StyledSwiper
				allowTouchMove={false}
				modules={[Navigation, Pagination, A11y]}
				navigation={true}
				pagination={{
					clickable: false,
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onNavigationNext={(swiper) => {
					debug && console.log(`**********onNavigationNext**********`);
					handleOnNavigationNext(swiper, psychoClient);
				}}
				onNavigationPrev={(swiper) => {
					debug && console.log(`**********onNavigationPrev**********`);
					handleOnNavigationPrev(swiper, psychoClient);
				}}
				onSlideChangeTransitionEnd={(swiper) => {
					debug && console.log(`onSlideChangeTransitionEnd`);
					handleOnSlideChangeEnd(swiper, psychoClient);
				}}
				onSliderMove={(swiper) => {
					handleOnSwiperMove(swiper, psychoClient);
				}}
				slidesPerView={1}
			>
				{!!psychoClient.book &&
					psychoClient.book.pages.map((page: Page, index: number) => {
						debug && console.log(`page.displayImage ${page.displayImage}`);
						let ref =
							canvasRefs.current[index] || createRef<HTMLCanvasElement>();
						canvasRefs.current[index] = ref;
						page.ref = ref;
						return (
							<SwiperSlide key={page.imageUrl}>
								<Canvas
									src={page.displayImage}
									width={page.pageDimensions.width}
									height={page.pageDimensions.height}
									objectPosition='contain'
									page={page}
									canvasRef={ref}
								/>
							</SwiperSlide>
						);
					})}
				<SwiperSlide />
			</StyledSwiper>
		</SwiperContainer>
	);
};

export default PsychoReader;
