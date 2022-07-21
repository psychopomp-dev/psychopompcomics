import styled from 'styled-components';

const TabletContainer = styled.div`
width: 100%;
max-width: 240rem;
aspect-ratio: 1217 / 815;
overflow: hidden;
position: relative;
display: flex;
padding: 10% 20.5% 11.5% 9.8%;

.swiper {
	mask-image: linear-gradient(to bottom, black 0%,  black 080%, transparent 98%);
}

.swiper-slide {
	overflow: scroll;
	scrollbar-width: none;
	padding: var(--space-ms) var(--space-ms) var(--space-xxl);

	&::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
}
	
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
	background-color: transparent;
	color: transparent;
	font-size: 0;
	border: none;
	cursor: pointer;
	width: 2%;
	aspect-ratio: 1 / 1;
	position: absolute;
	z-index: 2;
`;

const SwiperButton = styled(TabletButton)`
	top: 13.5%;
`;

const SwiperButtonPrev = styled(SwiperButton)`
	right: 13.2%;
`;

const SwiperButtonNext = styled(SwiperButton)`
	right: 7.5%;
`;

const ScrollButton = styled(TabletButton)`
	right: 10.2%;
`;

const ScrollButtonDown = styled(ScrollButton)`
	top: 18%;
`;

const ScrollButtonUp = styled(ScrollButton)`
	top: 9.4%;
`;

export {
	TabletContainer,
	AddressContainer,
	SwiperButtonNext,
	SwiperButtonPrev,
	ScrollButtonDown,
	ScrollButtonUp,
};
