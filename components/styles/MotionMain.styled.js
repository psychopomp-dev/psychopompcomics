import styled, { useTheme } from 'styled-components';
import { m } from 'framer-motion';

const StyledMain = styled(m.main)`
	height: 100%;
	max-width: 100%;
	width: 100%;
	overflow: hidden;
`;

export default function MotionMain(props) {
	const theme = useTheme();
	return (
		<StyledMain
			variants={theme.motion.pageTransitionVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			transition={{
				type: 'linear',
				when: 'beforeChildren',
			}}
			{...props}
		/>
	);
}
