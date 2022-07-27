import styled, { useTheme } from 'styled-components';
import { m } from 'framer-motion';
import Image from 'next/image';
import portal from '../images/portal.svg';
import { LinkPrimaryOutline } from '../components/styles/StyledButton.styled';

const MotionContainer = styled(m.div)``;

const FiveZeroZeroContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
`;

const Title = styled.h1`
	text-align: center;
	color: var(--text1);
	position: absolute;
	top: 50%;
	left: 49.5%;
	transform: translate(-50%, -50%);
	z-index: 10;
`;

const FiveZeroZeroMain = styled.main`
	height: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	p {
		padding: var(--space-md);
	}
`;

const MotionImageContainer = styled(m.div)`
	position: relative;
	max-width: 60rem;
	width: 100%;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
		max-width: 34rem;
	}
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: 26rem;
	}
`;

export default function FiveZeroZero() {
	const theme = useTheme();

	const svgVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<FiveZeroZeroMain
				variants={theme.motion.pageTransitionVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<MotionContainer variants={svgVariants}>
					<FiveZeroZeroContainer>
						<Title>500</Title>
						<MotionImageContainer
							animate={{ rotate: -360 }}
							transition={{ ease: 'linear', repeat: Infinity, duration: 60 }}
						>
							<Image src={portal} alt='500' />
						</MotionImageContainer>
					</FiveZeroZeroContainer>
					<p>{`Wondering astray, looking for what can't be found`}</p>
					<LinkPrimaryOutline href='/'>
						<a>Let us guide you back</a>
					</LinkPrimaryOutline>
				</MotionContainer>
			</FiveZeroZeroMain>
		</>
	);
}
