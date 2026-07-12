import Image from 'next/image';
import { useTheme } from 'styled-components';
import robot_light from '../images/icons/hexagon-robot-love-light.svg';
import robot_dark from '../images/icons/hexagon-robot-love-dark.svg';
import blockchain_light from '../images/icons/hexagon-blockchain-light.svg';
import blockchain_dark from '../images/icons/hexagon-blockchain-dark.svg';
import microchip_light from '../images/icons/hexagon-microchip-light.svg';
import microchip_dark from '../images/icons/hexagon-microchip-dark.svg';

function HexagonImage({ src, alt, width = 1080, height = 935.31, fill, ...other }) {
	if (fill) {
		return <Image src={src} alt={alt} fill {...other} />;
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			style={{ width: '100%', height: 'auto' }}
			{...other}
		/>
	);
}

export function RobotIconHexagon(props) {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? robot_light : robot_dark;
	const { alt = 'Robot in a hexagaon with a Heart emoji face', ...other } = props;
	return <HexagonImage src={logo} alt={alt} {...other} />;
}

export function BlockchainIconHexagon(props) {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? blockchain_light : blockchain_dark;
	const { alt = 'Blockchain in a hexagon', ...other } = props;
	return <HexagonImage src={logo} alt={alt} {...other} />;
}

export function MicrochipIconHexagon(props) {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? microchip_light : microchip_dark;
	const { alt = 'Microchip in a hexagon', ...other } = props;
	return <HexagonImage src={logo} alt={alt} {...other} />;
}
