import React, { createRef, useRef } from 'react';
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
import FullScreenToggle, { FullscreenButton } from '../FullScreenToggle';

const StyledSwiperContainer = styled.div`
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

const StyledSwiperElement = styled(SwiperElement)`
	width: 100%;
	height: 100%;
`;

interface FullscreenOptions {
	enable?: boolean;
	ButtonComponent?: React.ElementType;
	handleFullscreen?: (containerRef: React.RefObject<any>) => void;
}
interface PsychoReaderProps {
	psychoReaderConfig: IConfig;
	debug?: boolean;
	onNavigationNext?: (swiper: any, psychoClient: any) => void;
	onNavigationPrev?: (swiper: any, psychoClient: any) => void;
	onSlideChangeEnd?: (swiper: any, psychoClient: any) => void;
	onSwiperMove?: (swiper: any, psychoClient: any) => void;
	CustomSwiperContainer?: React.ElementType;
	CustomSwiperElement?: React.ElementType;
	CustomFullscreenButton?: React.ElementType;
	fullscreen?: boolean | FullscreenOptions;
}

export const PsychoReader = ({
	psychoReaderConfig,
	debug = true,
	onNavigationNext,
	onNavigationPrev,
	onSlideChangeEnd,
	onSwiperMove,
	CustomSwiperContainer = StyledSwiperContainer,
	CustomSwiperElement = StyledSwiperElement,
	fullscreen = false,
	...swiperProps
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

	const isFullScreenRef = useRef(false);
	const swiperContainerRef = useRef(null);

	const handleFullscreen = () => {
		if (!swiperContainerRef.current) return;

		if (isFullScreenRef.current) {
			// Exit fullscreen mode
			document.exitFullscreen?.();
			(document as any).webkitExitFullscreen?.(); // Safari
		} else {
			// Enter fullscreen mode
			swiperContainerRef.current.requestFullscreen?.();
			(swiperContainerRef.current as any).webkitRequestFullscreen?.(); // Safari
		}

		// We're toggling, so just invert the current value
		isFullScreenRef.current = !isFullScreenRef.current;
	};

	let enableFullscreen = false;
	let CustomFullscreenButton = FullscreenButton;
	let customHandleFullscreen:
		| ((containerRef: React.RefObject<any>) => void)
		| null = null;

	if (typeof fullscreen === 'boolean') {
		enableFullscreen = fullscreen;
	} else if (typeof fullscreen === 'object') {
		enableFullscreen = fullscreen.enable || false;
		CustomFullscreenButton = fullscreen.ButtonComponent || FullscreenButton;
		customHandleFullscreen = fullscreen.handleFullscreen || null;
	}

	return (
		<CustomSwiperContainer ref={swiperContainerRef}>
			<CustomSwiperElement
				allowTouchMove={false}
				modules={[Navigation, Pagination, A11y]}
				navigation={true}
				pagination={{
					type: 'fraction',
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onNavigationNext={(swiper) => {
					debug && console.log(`**********onNavigationNext**********`);
					handleOnNavigationNext(swiper, psychoClient);
					if (onNavigationNext) {
						onNavigationNext(swiper, psychoClient);
					}
				}}
				onNavigationPrev={(swiper) => {
					debug && console.log(`**********onNavigationPrev**********`);
					handleOnNavigationPrev(swiper, psychoClient);
					if (onNavigationPrev) {
						onNavigationPrev(swiper, psychoClient);
					}
				}}
				onSlideChangeTransitionEnd={(swiper) => {
					debug && console.log(`onSlideChangeTransitionEnd`);
					handleOnSlideChangeEnd(swiper, psychoClient);
					if (onSlideChangeEnd) {
						onSlideChangeEnd(swiper, psychoClient);
					}
				}}
				onSliderMove={(swiper) => {
					handleOnSwiperMove(swiper, psychoClient);
					if (onSwiperMove) {
						onSwiperMove(swiper, psychoClient);
					}
				}}
				slidesPerView={1}
				{...swiperProps}
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
				{/* <SwiperSlide /> */}
				{enableFullscreen && (
					<FullScreenToggle
						ButtonComponent={CustomFullscreenButton}
						handleFullscreen={() => {
							handleFullscreen();
							if (customHandleFullscreen) {
								customHandleFullscreen(swiperContainerRef);
							}
						}}
					/>
				)}
			</CustomSwiperElement>
		</CustomSwiperContainer>
	);
};

export default PsychoReader;
export { FullscreenButton, StyledSwiperContainer, StyledSwiperElement };
