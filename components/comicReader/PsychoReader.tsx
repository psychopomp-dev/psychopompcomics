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
import FullScreenToggle, {
	FullscreenButton as BaseFullscreenButton,
} from '../FullScreenToggle';

const FullscreenButton = styled(BaseFullscreenButton)`
	position: absolute;
	bottom: ${({ theme }) => theme.spaces.md};
	right: ${({ theme }) => theme.spaces.xl};
	z-index: 10;
`;

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

	&.fullscreen {
		z-index: var(--z-index-fullscreen);
		background: ${({ theme }) => theme.texturedBackground};
		background-size: 4rem 6rem;

		&::after {
			position: absolute;
			content: '';
			background: linear-gradient(
				rgba(
					${({ theme }) => theme.surface1.rgb.r},
					${({ theme }) => theme.surface1.rgb.g},
					${({ theme }) => theme.surface1.rgb.b},
					1
				),
				rgba(
					${({ theme }) => theme.surface1.rgb.r},
					${({ theme }) => theme.surface1.rgb.g},
					${({ theme }) => theme.surface1.rgb.b},
					0.75
				)
			);
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;
		}
	}
`;

const StyledSwiper = styled(SwiperElement)`
	width: 100%;
	height: 100%;

	.swiper-button-prev,
	.swiper-button-next {
		&::after {
			color: var(--brand);
			top: 50%;
			position: absolute;
			z-index: 11;

			@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
				top: initial;
				bottom: ${({ theme }) => theme.spaces.xxl};
			}
		}
		top: 0;
		bottom: 0;
		height: 100%;

		&:active {
			background-color: rgba(
				${({ theme }) => Object.values(theme.colorOpposite.rgb).join(',')},
				0.05
			);
			transition: background-color 0.2s ease-in-out;
		}
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

	const isFullScreenRef = useRef(false);
	const swiperContainerRef = useRef(null);

	// const handleFullscreen = () => {
	// 	if (swiperContainerRef.current) {
	// 		if (isFullScreenRef.current) {
	// 			swiperContainerRef.current.classList.remove('fullscreen');
	// 		} else {
	// 			swiperContainerRef.current.classList.add('fullscreen');
	// 		}
	// 		isFullScreenRef.current =
	// 			swiperContainerRef.current.classList.contains('fullscreen');
	// 		window.dispatchEvent(new Event('resize'));
	// 	}
	// };

	const handleFullscreen = () => {
		const onFullscreenChange = () => {
			if (
				document.fullscreenElement === swiperContainerRef.current ||
				(document as any).webkitFullscreenElement === swiperContainerRef.current
			) {
				// We're in fullscreen mode
				swiperContainerRef.current.classList.add('fullscreen');
			} else {
				// We've exited fullscreen mode
				swiperContainerRef.current.classList.remove('fullscreen');
				// Clean up the event listener
				document.removeEventListener('fullscreenchange', onFullscreenChange);
				document.removeEventListener(
					'webkitfullscreenchange',
					onFullscreenChange
				);
			}
		};

		if (swiperContainerRef.current) {
			if (isFullScreenRef.current) {
				// Exit fullscreen mode
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if ((document as any).webkitExitFullscreen) {
					/* Safari */
					(document as any).webkitExitFullscreen();
				}
			} else {
				// Enter fullscreen mode
				if (swiperContainerRef.current.requestFullscreen) {
					swiperContainerRef.current.requestFullscreen();
				} else if (
					(swiperContainerRef.current as any).webkitRequestFullscreen
				) {
					/* Safari */
					(swiperContainerRef.current as any).webkitRequestFullscreen();
				}
			}
			// We're toggling, so just invert the current value
			isFullScreenRef.current = !isFullScreenRef.current;

			// Add event listener to wait for the transition
			document.addEventListener('fullscreenchange', onFullscreenChange);
			document.addEventListener('webkitfullscreenchange', onFullscreenChange);
		}
	};

	return (
		<SwiperContainer ref={swiperContainerRef}>
			<StyledSwiper
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
				{/* <SwiperSlide /> */}
				<FullScreenToggle
					ButtonComponent={FullscreenButton}
					handleFullscreen={handleFullscreen}
				/>
			</StyledSwiper>
		</SwiperContainer>
	);
};

export default PsychoReader;
