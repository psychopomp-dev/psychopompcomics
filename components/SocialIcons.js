import Image from 'next/image';
import styled, { useTheme } from 'styled-components';
import discord_light from '../images/logos/discord_icon_light.svg';
import discord_dark from '../images/logos/discord_icon_dark.svg';
import twitter_light from '../images/logos/twitter_icon_light.svg';
import twitter_dark from '../images/logos/twitter_icon_dark.svg';

const DiscordServerLink = process.env.NEXT_PUBLIC_PPC_DISCORD_INVITE_URL;
const TwitterLink = process.env.NEXT_PUBLIC_PPC_TWITTER_URL;

const SocialIconContainer = styled.div`
	width: ${({ theme }) => theme.spaces.xl};
`;

export const DiscordIcon = ({ onClick }) => {
	const theme = useTheme();
	const discordImg = theme.mode == 'light' ? discord_dark : discord_light;
	return (
		<SocialIconContainer>
			<a href={DiscordServerLink} target='_blank' rel='noreferrer'>
				<Image src={discordImg} alt='Discord Icon' width='71' height='55' />
			</a>
		</SocialIconContainer>
	);
};

export const TwitterIcon = ({ onClick }) => {
	const theme = useTheme();
	const twitterImg = theme.mode == 'light' ? twitter_dark : twitter_light;
	return (
		<SocialIconContainer>
			<a href={TwitterLink} target='_blank' rel='noreferrer'>
				<Image src={twitterImg} alt='Twitter Icon' width='24' height='24' />
			</a>
		</SocialIconContainer>
	);
};
