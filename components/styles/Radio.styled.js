import styled, { css } from 'styled-components';

const StyledRadioBody = styled.div`
	position: relative;
	width: 100rem;
	max-width: 100%;
	aspect-ratio: 1000/647;

	.lights {
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.3s, visibility 0.3s ease-out;
	}

	&:not(.power-on) {
		video {
			display: none;
		}
	}

	&.power-on {
		.lights {
			visibility: visible;
			opacity: 1;
			transition: opacity 2s, visibility 2s ease-in;
		}
	}
`;

const FreqIndicator = styled.div`
	position: absolute;
	width: 94%;
	aspect-ratio: 94/5;
	left: 2.5%;
	top: 4%;
	z-index: 2;
	padding: 0 0 0.4% 0.3%;
	display: flex;
	align-items: stretch;
`;

const PowerButton = styled.button`
	appearance: none;
	position: absolute;
	z-index: 3;
	top: 14%;
	right: 16%;
	width: 6%;
	aspect-ratio: 1/1;
	border: none;
	border-radius: 50%;
	background-color: transparent;
	cursor: pointer;
`;

const StyledDialContainer = styled.div`
	cursor: grab;
	position: absolute;
	width: 26%;
	aspect-ratio: 1/1;
	border-radius: 50%;
	bottom: 29.5%;
	right: 15.5%;
	// transform: rotate(${(props) => props.rotation + props.startAngle}deg);
`;

const baseThumbStyles = css`
	appearance: none;
	padding-bottom: 5%;
	width: 0.4%;
	background-color: red;
	border-left: 0.2rem solid #000;
	border-right: 0.2rem solid #000;
	cursor: pointer;
`;

const StyledRangeInput = styled.input`
	width: 100%;
	background-color: transparent;
	overflow: hidden;
	display: block;
	appearance: none;
	margin: 0;
	cursor: pointer;

	&::-webkit-slider-runnable-track {
		width: 100%;
	}

	&::-webkit-slider-thumb {
		position: relative;
		appearance: none;
		padding-bottom: 5%;
		width: 0.8%;
		background: red;
		border-left: 0.2rem solid #000;
		border-right: 0.2rem solid #000;
	}

	&::-moz-range-thumb {
		${baseThumbStyles}
	}
	&::-ms-thumb {
		${baseThumbStyles}
	}
	&::-moz-range-track,
	&::-moz-range-progress {
		appearance: none;
		width: 100%;
		background: transparent;
	}
`;

const VideoContainer = styled.div`
	width: 47.8%;
	aspect-ratio: 1920 / 978;
	background-color: #000;
	position: absolute;
	top: 24%;
	left: 4.1%;
	z-index: 2;

	video {
		width: 100%;
		position: absolute;
		bottom: 0;

		&:not(.playing) {
			display: none;
		}
	}
`;

export {
	StyledRadioBody,
	FreqIndicator,
	PowerButton,
	StyledDialContainer,
	StyledRangeInput,
	VideoContainer,
};
