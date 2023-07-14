import styled from 'styled-components';
import dynamic from 'next/dynamic';
const DynamicFooter = dynamic(() => import('../components/Footer'));
import MotionMain from '../components/styles/MotionMain.styled';
import { useTheme } from 'styled-components';
import Image from 'next/image';
import p7Cover from '../images/comics/protocol-7/issue1/cover.jpg';
import cAUCover from '../images/comics/comes-an-upsr/issue1/cover.jpg';
import sOCCover from '../images/comics/seed-of-cain/issue1/cover.jpg';
import StyledSection from '../components/styles/StyledSection.styled';
import SectionContainer from '../components/styles/SectionContainer.styled';
import NoScrollLink from '../components/NoScrollLink';

const psychoShorts = [
	{
		src: p7Cover,
		alt: 'Protocol 7',
		uri: '/comics/protocol-7/issue1',
	},
	{
		src: cAUCover,
		alt: 'Comes an Upsr',
		uri: '/comics/comes-an-upsr/issue1',
	},
];

const comics = [
	{
		src: sOCCover,
		alt: 'Seed Of Cain',
		uri: '/seed-of-cain',
	},
];

const ComicGridContainer = styled.div`
	margin-top: var(--space-lg);
	width: 100%;
	max-width: calc(80rem + (var(--space-lg) * 3));
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: var(--space-lg);
	overflow: visible;
	margin-bottom: var(--space-ms);
`;

const ComicGridCard = styled.article`
	background-color: var(--surface2);
	box-shadow: var(--box-shadow-xs);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-bottom: var(--space-md);

	&:hover {
		transition: all 0.2s ease-in-out;
		box-shadow: var(--box-shadow-ms);
	}

	&:active {
		transition: all 0.2s ease-in-out;
		box-shadow: var(--box-shadow-xxs);
	}

	span {
		flex-grow: 1;
	}

	img,
	h4 {
		cursor: pointer;
		padding-left: var(--space-md);
		padding-right: var(--space-md);
	}
`;

const ComicGridImgContainer = styled.div`
	position: relative;
	aspect-ratio: 320/494;
`;

export default function Comics() {
	const theme = useTheme();

	return (
		<>
			<MotionMain>
				<StyledSection>
					<SectionContainer>
						<h1>Psycho Shorts</h1>
						<h4>
							A collection of single issue stories in collaboration with
							talented artists
						</h4>
						<ComicGridContainer>
							{psychoShorts.map((comic) => (
								<ComicGridCard key={comic.alt}>
									<NoScrollLink href={comic.uri}>
										<ComicGridImgContainer>
											<Image
												src={comic.src}
												alt={comic.alt}
												sizes={'20rem'}
												placeholder='blur'
											/>
										</ComicGridImgContainer>
									</NoScrollLink>
									<NoScrollLink href={comic.uri}>
										<h4>{comic.alt}</h4>
									</NoScrollLink>
								</ComicGridCard>
							))}
						</ComicGridContainer>
					</SectionContainer>
				</StyledSection>
				<StyledSection>
					<SectionContainer>
						<h1>Comics</h1>
						<ComicGridContainer>
							{comics.map((comic) => (
								<ComicGridCard key={comic.alt}>
									<NoScrollLink href={comic.uri}>
										<ComicGridImgContainer>
											<Image
												src={comic.src}
												alt={comic.alt}
												sizes={'20rem'}
												placeholder='blur'
											/>
										</ComicGridImgContainer>
									</NoScrollLink>
									<NoScrollLink href={comic.uri}>
										<h4>{comic.alt}</h4>
									</NoScrollLink>
								</ComicGridCard>
							))}
						</ComicGridContainer>
					</SectionContainer>
				</StyledSection>
			</MotionMain>
			<DynamicFooter />
		</>
	);
}
