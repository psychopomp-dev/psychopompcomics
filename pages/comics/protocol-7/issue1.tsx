import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import PsychoReader, {
	FullscreenButton,
	StyledSwiperContainer,
	StyledSwiperElement,
} from '../../../components/comicReader/PsychoReader';
import PsychoReaderConfig from '../../../components/comicReader/PsychoReaderConfig';
import { IConfig } from '../../../components/comicReader/IConfig';
import MotionMain from '../../../components/styles/MotionMain.styled';

// extending existing styles
const CustomFullscreenButton = styled(FullscreenButton)`
	position: absolute;
	bottom: ${({ theme }) => theme.spaces.md};
	right: ${({ theme }) => theme.spaces.xl};
	z-index: 10;
`;

const customHandleFullscreen = (swiperContainerRef: React.RefObject<any>) => {
	console.log('called custom fullscreen');
	if (swiperContainerRef.current) {
		const changeFullscreenClass = () => {
			if (
				document.fullscreenElement === swiperContainerRef.current ||
				(document as any).webkitFullscreenElement === swiperContainerRef.current
			) {
				// We're in fullscreen mode
				swiperContainerRef.current.classList.add('fullscreen');
			} else {
				// We've exited fullscreen mode
				swiperContainerRef.current.classList.remove('fullscreen');
			}
		};
		// @todo figure out how to get this value from the theme
		if (window.innerWidth < 768) {
			swiperContainerRef.current.classList.toggle('fullscreen');
		} else {
			// Listen for fullscreen changes
			document.addEventListener('fullscreenchange', changeFullscreenClass);
			document.addEventListener(
				'webkitfullscreenchange',
				changeFullscreenClass
			);

			// Make sure to clean up the event listeners when done
			return () => {
				document.removeEventListener('fullscreenchange', changeFullscreenClass);
				document.removeEventListener(
					'webkitfullscreenchange',
					changeFullscreenClass
				);
			};
		}
	}
};

const CustomSwiperContainer = styled(StyledSwiperContainer)`
	&.fullscreen {
		z-index: var(--z-index-fullscreen);
		background: ${({ theme }) => theme.texturedBackground};
		background-size: ${({ theme }) => theme.texturedBackgroundSize};

		@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
			// Adjust this value based on your needs
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 100%;
		}

		&::after {
			position: absolute;
			content: '';
			background: linear-gradient(
				rgba(${({ theme }) => Object.values(theme.surface1.rgb).join(',')}, 1),
				rgba(
					${({ theme }) => Object.values(theme.surface1.rgb).join(',')},
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

const CustomStyledSwiper = styled(StyledSwiperElement)`
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

const PsychoReaderMain = styled(MotionMain)`
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 12.5rem);

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		height: calc(100vh - 15rem);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		height: calc(100vh - 8rem);
	}
`;

export async function getServerSideProps() {
	const readerConfig: IConfig = await PsychoReaderConfig(
		'public/protocol-7/issue1/config.json'
	);
	return {
		props: {
			psychoReaderConfig: JSON.parse(JSON.stringify(readerConfig)),
		},
	};
}

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { psychoReaderConfig } = props;
	const router = useRouter();

	const handleSlideChange = (slideNumber: number, panelNumber: number) => {
		const baseUrl = router.pathname;
		let url = baseUrl;
		// Add page to url only if slideNumber is not 0
		if (slideNumber !== 0) {
			url += `?page=${slideNumber}`;
		}
		// Add panel to url only if panelNumber is not less than 0
		if (panelNumber >= 0) {
			url += url.includes('?')
				? `&panel=${panelNumber}`
				: `?panel=${panelNumber}`;
		}
		router.replace(url, undefined, { shallow: true });
	};

	return (
		<>
			<PsychoReaderMain>
				<PsychoReader
					psychoReaderConfig={psychoReaderConfig}
					CustomSwiperContainer={CustomSwiperContainer}
					CustomSwiperElement={CustomStyledSwiper}
					fullscreen={{
						enable: true,
						ButtonComponent: CustomFullscreenButton,
						handleFullscreen: customHandleFullscreen,
					}}
					onSlideChange={handleSlideChange}
					initialSlide={router.query.page ? Number(router.query.page) : 0}
					initialPanel={router.query.panel ? Number(router.query.panel) : -1}
				/>
			</PsychoReaderMain>
		</>
	);
};

export default Home;
