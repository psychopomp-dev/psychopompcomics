import styled, { useTheme } from 'styled-components';
import { TwoUp, TwoUpContainer } from './TwoUp.styled';
import Image from 'next/image';
import twitterVanth from '../../images/vanth/IMG_5841.jpeg';
import { m } from 'framer-motion';
import { FadeInLeftDelayXl } from '../themes/MotionVariants';

const VanthImageWrapper = styled(m.div)`
	& > * {
		box-shadow: var(--box-shadow-md);
		border-radius: 4rem;
	}
`;

const LegendTwoUp = styled(TwoUpContainer)`
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	flex-wrap: nowrap;
	margin-top: var(--space-xxl);
	max-width: 100%;

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		flex-direction: column-reverse;
		flex-wrap: wrap;
	}
`;

export default function LegendTwoUpContainer() {
	const theme = useTheme();
	return (
		<LegendTwoUp>
			<TwoUp>
				<VanthImageWrapper
					initial={{ opacity: 0, y: '10rem' }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					viewport={{ once: true }}
				>
					<Image
						className='styled-img'
						src={twitterVanth}
						alt='Vanth Symbol'
						width='1080'
						height='1080'
						layout='responsive'
						sizes={`(max-width: ${theme.breakpoints.sm}) 100vw, 57.6rem`}
						placeholder='blur'
					/>
				</VanthImageWrapper>
			</TwoUp>
			<TwoUp>
				<m.h2
					variants={FadeInLeftDelayXl}
					initial='hidden'
					whileInView='visible'
					viewport='viewport'
				>
					Beings of Legend
				</m.h2>
				<p>{`In a time before Homer wrote his epic poems the Iliad and the Odyssey, legend tells of Vanth, the first spirit guide—or psychopomp—to the underworld.  Sometimes pictured with Charun the boatman, the benevolent Vanth would lead the dead along ancient paths, her torch held high lighting the way.  At a gate as old as the world itself she would produce a key and unlock the way to the underworld.`}</p>
				<p>{`Ancient writings have described the chthonic goddess as being “in the company of other Vanth,” suggesting Vanth can take many forms or is not singular.  Perhaps she receded from myth and memory because she preferred to take the shape of the beasts and birds so often identified as psychopomps, such as the wolves and the ravens and the deer of the dead.`}</p>
				<p>{`Perhaps.`}</p>
			</TwoUp>
		</LegendTwoUp>
	);
}
