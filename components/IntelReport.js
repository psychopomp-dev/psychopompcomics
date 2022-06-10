import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
import TabImg from '../images/intel-reports/intel-tablet.png';
import TabGreenLightImg from '../images/intel-reports/intel-tablet-green-light.png';
import { useRef, useCallback } from 'react';
import IntelBriefs from '../data/IntelBriefs';
import {
	TabletContainer,
	AddressContainer,
	SwiperButtonNext,
	SwiperButtonPrev,
	ScrollButtonDown,
	ScrollButtonUp,
} from './styles/IntelReports.styled';

export default function IntelReport({ sizes }) {
	const sliderRef = useRef(null);
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	const HandleDownClick = function () {
		if (!sliderRef.current) return;
		const activeSlide =
			sliderRef.current.swiper.slides[sliderRef.current.swiper.activeIndex];
		activeSlide.scrollTo({
			top: activeSlide.scrollHeight,
			behavior: 'smooth',
		});
	};

	const HandleUpClick = function () {
		if (!sliderRef.current) return;
		const activeSlide =
			sliderRef.current.swiper.slides[sliderRef.current.swiper.activeIndex];
		activeSlide.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<>
			<TabletContainer>
				<Image
					src={TabImg}
					alt='Intel Tablet'
					layout='fill'
					objectFit='cover'
					sizes={sizes}
				/>
				<Image
					className='blink'
					src={TabGreenLightImg}
					alt='Intel Tablet Flashing Green Light'
					layout='fill'
					objectFit='cover'
					sizes={sizes}
				/>
				<Swiper
					ref={sliderRef}
					className={'intel-swiper'}
					modules={[A11y, Navigation, Keyboard]}
					keyboard={{
						enabled: true,
						onlyInViewport: false,
					}}
					spaceBetween={0}
					loop={true}
					slidesPerView={1}
					grabCursor={true}
					speed={300}
				>
					{IntelBriefs.map((intelBrief, index) => (
						<SwiperSlide key={index}>
							<h2 className='classification'>{intelBrief.access}</h2>
							<p className='date'>{intelBrief.date}</p>
							<AddressContainer>
								<p className='body-to-from'>From: </p>
								<p className='body-to-from'>{intelBrief.from}</p>
							</AddressContainer>
							<AddressContainer>
								<p className='body-to-from'>To: </p>
								<p className='body-to-from'>{intelBrief.to}</p>
							</AddressContainer>
							{intelBrief.paragraphs.map((paragraph, index) => (
								<p key={index} className='body-copy'>
									{paragraph}
								</p>
							))}
							<p className='body-copy'>End</p>
						</SwiperSlide>
					))}
				</Swiper>
				<SwiperButtonPrev onClick={handlePrev} />
				<SwiperButtonNext onClick={handleNext} />
				<ScrollButtonDown onClick={HandleDownClick} />
				<ScrollButtonUp onClick={HandleUpClick} />
			</TabletContainer>
		</>
	);
}
