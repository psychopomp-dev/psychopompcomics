import styled from 'styled-components';

const TabletContainer = styled.div`
width: 100%;
max-width: 240rem;
aspect-ratio: 16 / 9;
position: relative;
display: flex;
padding: 10% 20% 0 9.5%;

.swiper {
	mask-image: linear-gradient(to bottom, black 0%,  black 075%, transparent 90%);
}

.swiper-slide {
	overflow: scroll;
	scrollbar-width: none;
	padding: var(--space-ms) var(--space-ms) var(--space-xxl);
	
	.classification,
	p {
		font-size: var(--font-size-ms);
		font-family: Andale Mono,AndaleMono,monospace;
		text-transform: uppercase;
	}
	
	.classification {
		text-align: center;
		color: #fff;
	}
	
	p {
		color: #19b9d2;
		font-size: var(--font-size-xxs);
		line-height: 1.2;
	}
	
	.date {
		text-align: right;
		margin-top: var(--space-ml);
		margin-bottom: var(--space-ml);
	}
	
	.body-to-from + .body-to-from {
		margin-top: 0;
	}
}

.blink {
	animation: blink-animation 2s steps(2, start) infinite;
}

@keyframes blink-animation {
	to {
		visibility: hidden;
	}
}
@-webkit-keyframes blink-animation {
	to {
		visibility: hidden;
	}
	`;

const AddressContainer = styled.div`
	display: flex;
	justify-content: stretch;

	p:first-child {
		width: var(--space-xxl);
	}
`;

const TabletButton = styled.button`
	appearance: none;
	opacity: 0;
	cursor: pointer;
	width: 2%;
	aspect-ratio: 1 / 1;
	position: absolute;
	z-index: 2;
`;

const SwiperButton = styled(TabletButton)`
	top: 18%;
`;

const SwiperButtonPrev = styled(SwiperButton)`
	right: 12.5%;
`;

const SwiperButtonNext = styled(SwiperButton)`
	right: 6.7%;
`;

const ScrollButton = styled(TabletButton)`
	right: 9.5%;
`;

const ScrollButtonDown = styled(ScrollButton)`
	top: 23.5%;
`;

const ScrollButtonUp = styled(ScrollButton)`
	top: 12.5%;
`;

export {
	TabletContainer,
	AddressContainer,
	SwiperButtonNext,
	SwiperButtonPrev,
	ScrollButtonDown,
	ScrollButtonUp,
};
