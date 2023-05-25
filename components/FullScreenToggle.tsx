import React, { useState } from 'react';
import styled from 'styled-components';
import { FullscreenIcon } from './styles/FullScreenIcon';
import { FullscreenExitIcon } from './styles/FullScreenExitIcon';

export const FullscreenButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const FullScreenToggle = ({ handleFullscreen, ButtonComponent }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const Button = ButtonComponent || FullscreenButton;

	const handleFullscreenClick = () => {
		handleFullscreen();
		setIsFullScreen(!isFullScreen);
	};

	return (
		<Button onClick={handleFullscreenClick}>
			{isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
		</Button>
	);
};

export default FullScreenToggle;
