import { useEffect } from 'react';
import styled from 'styled-components';
import { useMedia } from '../hooks/useMedia';
import { useScrollLock } from '../hooks/useScrollLock';
import { useMenuContext } from '../state/useMenuContext';
import { NavBrand } from './NavBrand';
import { HamburgerMenu } from './HamburgerMenu';
import { DiscordIcon, TwitterIcon } from './SocialIcons';
import { StyledMotionNavbar } from '../components/styles/Navbar.styled';
import { StyledMotionNavLinkList } from '../components/styles/NavbarLinkList.styled';
import { MobileNavNewsletterSubscribe } from './NewsletterSubscribe';
import { PrimaryLink } from './styles/StyledLink.styled';

const SocialContainer = styled.div`
	margin: ${({ theme }) => theme.spaces.md} auto;
	p {
		margin-bottom: ${({ theme }) => theme.spaces.md};
	}
`;

const IconContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const MobileSocialContainer = () => {
	const handleClick = (e) => {};
	return (
		<SocialContainer>
			<p>Sign Up for our Newsletter</p>
			<MobileNavNewsletterSubscribe />
			<IconContainer>
				<DiscordIcon onClick={handleClick} />
				<TwitterIcon onClick={handleClick} />
			</IconContainer>
		</SocialContainer>
	);
};

const MotionNavLinks = ({ openmenu, mobile, onClick }) => {
	const links = [
		'about',
		// 'comics',
		'collectibles',
		// 'characters',
		// 'artists',
		// 'news',
		// 'merch',
	];
	const variants = mobile
		? {
				hidden: {
					opacity: 0,
					x: '100%',
					transition: {
						when: 'beforeChildren',
					},
				},
				visible: {
					opacity: 1,
					x: 0,
					overflow: 'scroll',
					transition: {
						ease: 'easeInOut',
					},
				},
		  }
		: {
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
	return (
		<StyledMotionNavLinkList
			animate={openmenu || !mobile ? 'visible' : 'hidden'}
			initial='hidden'
			exit='hidden'
			variants={variants}
		>
			{links.map((link) => (
				<li key={link}>
					<PrimaryLink onClick={onClick} href={`/${link}`}>
						{link}
					</PrimaryLink>
				</li>
			))}
			<li>
				<MobileSocialContainer />
			</li>
		</StyledMotionNavLinkList>
	);
};

const NavInnerContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 128rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: center;
	@media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 100%;
		padding-bottom: ${({ theme }) => theme.spaces.lg};
	}
	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		justify-content: flex-end;
	}
`;

export const MotionNavbar = () => {
	const { isMenuOpen, toggleMenu, closeMenu } = useMenuContext();
	const { isMobile } = useMedia();
	useScrollLock(isMenuOpen);
	useEffect(() => {
		if (!isMobile) {
			closeMenu();
		}
	}, [isMobile, closeMenu]);
	return (
		<StyledMotionNavbar>
			<NavInnerContainer>
				<NavBrand onClick={closeMenu} />
				<HamburgerMenu.Wrapper onClick={toggleMenu}>
					{isMenuOpen ? (
						<HamburgerMenu.CloseMenuIcon_1 />
					) : (
						<HamburgerMenu.OpenMenuIcon_1 />
					)}
				</HamburgerMenu.Wrapper>
				<MotionNavLinks
					openmenu={isMenuOpen}
					mobile={isMobile}
					onClick={closeMenu}
				/>
			</NavInnerContainer>
		</StyledMotionNavbar>
	);
};
