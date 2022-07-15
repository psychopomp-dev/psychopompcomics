import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import radioImg from '../images/radio/radio.png';
import radioOnImg from '../images/radio/radio_on.png';
import radioKnobImg from '../images/radio/radio_knob.png';
import radioKnobOnImg from '../images/radio/radio_knob_on.png';
import { useMousePosition } from '../hooks/useMousePosition';
import { useRotation } from '../hooks/useRotation';
import {
	StyledRadioBody,
	FreqIndicator,
	PowerButton,
	StyledDialContainer,
	StyledRangeInput,
	VideoContainer,
} from './styles/Radio.styled';

const getDegreeChange = function (previous, current) {
	const prev = previous % 360;
	const cur = current % 360;
	let degreeChange;
	if (prev > 270 && cur < 90) {
		degreeChange = 360 - prev + cur;
	} else if (prev < 90 && cur > 270) {
		degreeChange = -1 * (360 - cur + prev);
	} else {
		degreeChange = cur - prev;
	}
	return degreeChange;
};

const RadioBody = function (props) {
	return (
		<StyledRadioBody
			{...props}
			className={props.powerOn ? 'power-on' : 'power-off'}
		/>
	);
};

const DialContainer = function (props) {
	const rotation = useRotation({ ...props });
	const parentSetPreviousRotation = props.parentSetPreviousRotation;
	useEffect(() => {
		console.log(
			`DG: ${props.dialDegrees}, min: ${props.dialMin}, max: ${props.dialMax}`
		);
		parentSetPreviousRotation(rotation);
	}, [
		parentSetPreviousRotation,
		props.DialMin,
		props.dialDegrees,
		props.dialMax,
		props.dialMin,
		rotation,
	]);

	return (
		<StyledDialContainer
			id='radio__dial'
			style={{ transform: `rotate(${props.dialDegrees}deg)` }}
			ref={props.innerRef}
			{...props}
		/>
	);
};

export default function Radio() {
	/* Dial controls */
	const mousePosition = useMousePosition();
	const [mouseDown, setMouseDown] = useState(false);
	const [handleStop, setHandleStop] = useState(false);
	const [rotationActive, setRotationActive] = useState(false);
	const [startAngle, setStartAngle] = useState(0);
	const [totalAngle, setTotalAngle] = useState(0);
	const [currentRotation, setCurrentRotation] = useState(0);
	const [previousRotation, setPreviousRotation] = useState(0);
	const [dialDegrees, setDialDegrees] = useState(0);
	const dialMin = -720;
	const dialMax = 720;
	const setCurrentRotationWrapper = useCallback(
		(val) => {
			setCurrentRotation(val);
		},
		[setCurrentRotation]
	);
	const divEl = useRef();
	const [dialCenterX, setDialCenterX] = useState();
	const [dialCenterY, setDialCenterY] = useState();
	const R2D = 180 / Math.PI;
	/* Frequency controls */
	const [freq, setFreq] = useState(1120);
	const [currentAudio, setCurrentAudio] = useState();
	const [powerOn, setPowerOn] = useState(false);
	const freqMin = 520;
	const freqMax = 1710;
	const freqStep = 10;

	const handleFreqInputChange = useCallback(
		(freq, isPowerOn, updateDial) => {
			setFreq(freq);
			console.log(freq);
			if (updateDial) {
				const rotation = Math.round(
					normalizeFromTo(freq, freqMax, freqMin, dialMax, dialMin)
				);
				console.log(`updating dial to ${rotation}`);
				setDialDegrees(rotation);
			}
			const selectedAudio = document.getElementById(freq + 'am');
			const radioStatic = document.getElementById('static');
			if (selectedAudio) {
				radioStatic.pause();
				radioStatic.classList.remove('playing');
				if (isPowerOn && !selectedAudio.classList.contains('playing')) {
					// selectedAudio.load();
					selectedAudio.play();
					selectedAudio.classList.add('playing');
				}
				setCurrentAudio(selectedAudio);
			} else {
				setCurrentAudio(radioStatic);
				if (currentAudio) {
					currentAudio.pause();
					currentAudio.classList.remove('playing');
				}
				if (isPowerOn && !radioStatic.classList.contains('playing')) {
					// radioStatic.load();
					radioStatic.play();
					radioStatic.classList.add('playing');
				}
			}
		},
		[currentAudio, dialMin]
	);

	function normalizeFromTo(value, fromMax, fromMin, toMax, toMin) {
		const fromPercent = (Number(value) - fromMin) / (fromMax - fromMin);
		return toMin + fromPercent * (toMax - toMin);
	}

	useEffect(() => {
		function handleDialChange(degrees) {
			const newFreq = normalizeFromTo(
				degrees,
				dialMax,
				dialMin,
				freqMax,
				freqMin
			);
			const roundedFreq = Math.ceil(newFreq / freqStep) * freqStep;
			console.log(roundedFreq);
			handleFreqInputChange(roundedFreq, powerOn, false);
		}

		if (currentRotation != previousRotation) {
			const delta = getDegreeChange(previousRotation, currentRotation);
			if (dialDegrees + delta <= dialMax && dialDegrees + delta >= dialMin) {
				setDialDegrees((dg) => dg + delta);
				console.log('totalDegrees: ' + dialDegrees);
				setPreviousRotation(currentRotation);
				handleDialChange(dialDegrees + delta);
			} else {
				const clampedRotation = Math.min(
					Math.max(dialDegrees + delta),
					dialMax
				);
				handleDialChange(clampedRotation);
				setPreviousRotation(currentRotation);
				setMouseDown(false);
				setRotationActive(false);
				setTotalAngle(currentRotation);
			}
		}

		if (divEl.current) {
			const box = divEl.current.getBoundingClientRect();
			setDialCenterX(box.left + box.width / 2);
			setDialCenterY(box.top + box.height / 2);
		}
		if (handleStop) {
			setTotalAngle(currentRotation);
			setHandleStop(false);
		}
	}, [
		rotationActive,
		mouseDown,
		totalAngle,
		handleStop,
		currentRotation,
		previousRotation,
		dialDegrees,
		dialMin,
		handleFreqInputChange,
		powerOn,
	]);

	function togglePower() {
		const isPowerOn = !powerOn;
		setPowerOn(isPowerOn);
		if (isPowerOn) {
			handleFreqInputChange(freq, isPowerOn, false);
		} else if (currentAudio) {
			currentAudio.pause();
		}
	}

	return (
		<>
			<RadioBody id='radio' powerOn={powerOn}>
				<PowerButton onClick={togglePower} />
				<Image
					src={radioImg}
					alt='Radio'
					layout='fill'
					objectFit='cover'
					objectPosition='bottom'
					sizes={`(max-width: 1000px) 100vw, 100rem`}
					placeholder='blur'
				/>
				<Image
					className='lights'
					src={radioOnImg}
					alt='Radio'
					layout='fill'
					objectFit='cover'
					objectPosition='bottom'
					sizes={`(max-width: 1000px) 100vw, 100rem`}
					placeholder='blur'
				/>
				<FreqIndicator>
					<StyledRangeInput
						type='range'
						min={freqMin}
						max={freqMax}
						step={freqStep}
						value={freq}
						onChange={(e) => {
							e.preventDefault();
							handleFreqInputChange(e.target.value, powerOn, true);
						}}
					/>
				</FreqIndicator>
				<DialContainer
					innerRef={divEl}
					centerX={dialCenterX}
					centerY={dialCenterY}
					mouseX={mousePosition.x}
					mouseY={mousePosition.y}
					isRotationActive={rotationActive}
					startAngle={startAngle}
					totalAngle={totalAngle}
					parentSetPreviousRotation={setCurrentRotationWrapper}
					dialDegrees={dialDegrees}
					dialMin={dialMin}
					dialMax={dialMax}
					onMouseDown={(e) => {
						e.preventDefault();
						console.log('mousedown');
						setMouseDown(true);
						const x = mousePosition.x - dialCenterX;
						const y = mousePosition.y - dialCenterY;
						const angle = R2D * Math.atan2(y, x);
						setStartAngle(angle);
					}}
					onMouseMove={(e) => {
						e.preventDefault();
						if (mouseDown) {
							setRotationActive(true);
						}
					}}
					onMouseOut={(e) => {
						e.preventDefault();
						setRotationActive(false);
					}}
					onMouseUp={(e) => {
						e.preventDefault();
						console.log('mouseup');
						setMouseDown(false);
						setRotationActive(false);
						setHandleStop(true);
					}}
				>
					<Image
						src={radioKnobImg}
						alt='Radio'
						layout='fill'
						objectFit='cover'
						objectPosition='bottom'
						sizes={`(max-width: 1000px)26vw, 26rem`}
						placeholder='blur'
					/>
					<Image
						className='lights'
						src={radioKnobOnImg}
						alt='Radio'
						layout='fill'
						objectFit='cover'
						objectPosition='bottom'
						sizes={`(max-width: 1000px)26vw, 26rem`}
						placeholder='blur'
					/>
				</DialContainer>
				<VideoContainer>
					<video id='1120am' loop>
						<source src='/video/transmission-1.mp4' type='video/mp4' />
					</video>
					<video id='1230am' loop>
						<source src='/video/transmission-2.mp4' type='video/mp4' />
					</video>
					<video id='static' loop>
						<source src='/video/radio-static.mp4' type='video/mp4' />
					</video>
				</VideoContainer>
			</RadioBody>
		</>
	);
}
