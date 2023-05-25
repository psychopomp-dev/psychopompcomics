import Image from 'next/image';
import { useTheme } from 'styled-components';
import fullscreen_exit_light from '../../images/icons/full-screen-exit-icon-dark.svg';
import fullscreen_exit_dark from '../../images/icons/full-screen-exit-icon-dark.svg';

export function FullscreenExitIcon(props) {
	const theme = useTheme();
	const logo =
		theme.mode == 'light' ? fullscreen_exit_light : fullscreen_exit_dark;
	return (
		<Image
			src={logo}
			alt='Fullscreen Exit Icon'
			width={24}
			height={24}
			{...props}
		/>
	);
}
