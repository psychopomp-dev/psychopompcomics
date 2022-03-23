import Image from 'next/image';
import { useTheme } from 'styled-components';
import logo_light from '../images/final_wtype_inv_cropped@4x.png';
import logo_dark from '../images/final_wtype_transparent_cropped@4x.png';

export default function LogoTextImage() {
	const theme = useTheme();
	const logo = theme.mode == 'light' ? logo_light : logo_dark;
	return (
		<Image width='2210' height='2917' src={logo} alt='Psychopomp Comics' />
	);
}
