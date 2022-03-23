import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import LogoTextImage from '../components/LogoTextImage';
import { MobileNavNewsletterSubscribe } from './NewsletterSubscribe';
import {
	StyledMotionFooter,
	StyledCopyrightContainer,
	StyledCopyright,
} from './styles/MotionFooter.styled';
import { DiscordIcon, TwitterIcon } from './SocialIcons';

const LogoTextContainer = styled.div`
	margin-right: 6rem;
	justify-self: end;
	max-width: 40%;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-right: 0;
		padding: ${({ theme }) => theme.spaces.sm};
		max-width: 22rem;
		margin: ${({ theme }) => theme.spaces.md} auto
			${({ theme }) => theme.spaces.lg};
	}
`;

const SocialContainer = styled.div`
	grid-column-start: 2;
	grid-row-start: 1;
	justify-self: start;
	p {
		margin-bottom: ${({ theme }) => theme.spaces.md};
	}
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		grid-column-start: 1;
		grid-row-start: 2;
		justify-self: center;
	}
`;

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	div + div {
		margin-left: ${({ theme }) => theme.spaces.md};
	}
`;

const SocialList = styled.ul`
	list-style: none;
	padding: ${({ theme }) => theme.spaces.md};
	li {
		padding: ${({ theme }) => theme.spaces.md};
	}
`;

const FooterSocialContainer = () => {
	const handleClick = (e) => {};
	return (
		<SocialContainer>
			<SocialList>
				<li>
					<IconContainer>
						<DiscordIcon onClick={handleClick} />
						<TwitterIcon onClick={handleClick} />
					</IconContainer>
				</li>
				<li>
					<p>Sign Up for our Newsletter</p>
					<MobileNavNewsletterSubscribe />
				</li>
			</SocialList>
		</SocialContainer>
	);
};

const CopyRight = () => {
	const year = new Date().getFullYear();
	return (
		<StyledCopyrightContainer>
			<StyledCopyright>
				{`copyright `}&copy;{` ${year} . all rights reserved.`}
			</StyledCopyright>
		</StyledCopyrightContainer>
	);
};

const InnerContainer = styled(motion.div)`
	display: grid;
	grid-template-areas:
		'area area'
		'area area';
	gap: ${({ theme }) => theme.spaces.ml};
	grid-template-rows: 1fr 0.1fr;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		grid-template-areas:
			'area'
			'area'
			'area';
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}
`;

export default function MotionFooter() {
	const theme = useTheme();

	const footerVariants = {
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				ease: 'easeInOut',
			},
		},
		hidden: {
			opacity: 0,
			transition: { ease: 'easeInOut' },
		},
	};
	const footerChildrenVariants = {
		hidden: {
			opacity: 0,
			scale: 0,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
	};
	return (
		<StyledMotionFooter
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={footerVariants}
			exit={theme.motion.pageTransitionVariants.exit}
		>
			<InnerContainer variants={footerChildrenVariants}>
				<LogoTextContainer>
					<LogoTextImage />
				</LogoTextContainer>
				<CopyRight />
				<FooterSocialContainer />
			</InnerContainer>
		</StyledMotionFooter>
	);
}
