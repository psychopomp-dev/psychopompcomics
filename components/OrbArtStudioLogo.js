import { useTheme } from 'styled-components';
import Image from 'next/image';
import OrbLogoLight from '../images/logos/Orb-Art-Studio-inv.png';
import OrbLogoDark from '../images/logos/orb-art-studio-logo.png';
import OrbLogoNoText from '../images/logos/orb-art-studio-logo.png';

export function OrbArtStudioLogoWithText() {
	const theme = useTheme();
	const OrbLogo = theme.mode == 'light' ? OrbLogoLight : OrbLogoDark;
	return (
		<Image src={OrbLogo} alt='Orb Art Studio Logo' width={585} height={400} />
	);
}

export function OrbArtStudioLogo() {
	return (
		<Image
			src={OrbLogoNoText}
			alt='Orb Art Studio Logo'
			width={100}
			height={99}
			placeholder='blur'
		/>
	);
}
