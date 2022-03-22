import Image from 'next/image';
import { useTheme } from 'styled-components';
import robot_light from '../images/icons/hexagon-robot-love-light.svg';
import robot_dark from '../images/icons/hexagon-robot-love-dark.svg';
import blockchain_light from '../images/icons/hexagon-blockchain-light.svg';
import blockchain_dark from '../images/icons/hexagon-blockchain-dark.svg';
import microchip_light from '../images/icons/hexagon-microchip-light.svg';
import microchip_dark from '../images/icons/hexagon-microchip-dark.svg';

export function RobotIconHexagon() {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? robot_light : robot_dark;
	return (
		<Image
			width='1080'
			height='935.31'
			src={logo}
			alt='Robot in a hexagaon with a Heart emoji face'
		/>
	);
}

export function BlockchainIconHexagon() {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? blockchain_light : blockchain_dark;
	return (
		<Image
			width='1080'
			height='935.31'
			src={logo}
			alt='Blockchain in a hexagon'
		/>
	);
}

export function MicrochipIconHexagon() {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? microchip_light : microchip_dark;
	return (
		<Image
			width='1080'
			height='935.31'
			src={logo}
			alt='Microchip in a hexagon'
		/>
	);
}
