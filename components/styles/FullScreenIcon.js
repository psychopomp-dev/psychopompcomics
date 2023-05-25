import Image from 'next/image';
import { useTheme } from 'styled-components';
import fullscreen_light from '../../images/icons/full-screen-icon-dark.svg';
import fullscreen_dark from '../../images/icons/full-screen-icon-dark.svg';

export function FullscreenIcon(props) {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? fullscreen_light : fullscreen_dark;
	return (
		<Image src={logo} alt='Fullscreen Icon' width={24} height={24} {...props} />
	);
}
