import styled, { useTheme } from 'styled-components';
import { TwoUp, TwoUpContainer } from './TwoUp.styled';
import Image from 'next/image';
import vanthImg from '../../images/vanth.svg';
import LinkPrimary from './StyledButton.styled';
import { m } from 'framer-motion';
import { FadeInLeft } from '../themes/MotionVariants';

const VanthTwoUp = styled(TwoUpContainer)`
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	max-width: 75rem;
	flex-wrap: nowrap;
	margin-top: var(--space-xxl);

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: 32rem;
		flex-wrap: wrap;
	}
`;

export default function VanthTwoUpContainer() {
	const theme = useTheme();
	return (
		<VanthTwoUp>
			<TwoUp>
				<div>
					<m.h2
						variants={FadeInLeft}
						initial='hidden'
						whileInView='visible'
						viewport='viewport'
					>
						{'Vanth are the Key'}
					</m.h2>
					<p>{'Buying a Vanth unlocks:'}</p>
					<ul>
						<li>
							{'Airdrops from all major Psychopomp title collections FOREVER'}
						</li>
						<li>
							{
								'A seat on the Vanth Council, and the exclusive access that comes with it as a trusted advisor to the business.'
							}
						</li>
						<li>
							{
								'The opportunity to get 1/1 airdrops of comic book panels or other special art.'
							}
						</li>
						<li>
							{
								'Owning a free NFT from each title collection will also generate additional airdrops specific to the collection.'
							}
						</li>
					</ul>
					<m.div
						variants={FadeInLeft}
						initial='hidden'
						whileInView='visible'
						viewport='viewport'
					>
						<LinkPrimary href='#'>
							<a
								href='https://exchange.art/collections/Vanth/nfts'
								target='_blank'
								rel='noreferrer'
							>
								Find your spirit guide
							</a>
						</LinkPrimary>
					</m.div>
				</div>
			</TwoUp>
			<TwoUp>
				<Image
					src={vanthImg}
					alt='Vanth Symbol'
					width='1080'
					height='1080'
					layout='responsive'
					sizes={`(max-width: ${theme.breakpoints.sm}) 25.6rem, 30.4rem`}
				/>
			</TwoUp>
		</VanthTwoUp>
	);
}
