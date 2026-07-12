import { TwoUpContainer, TwoUp } from './TwoUp.styled';
import CoreTeam from './CoreTeam.styled';

export default function TwoUpAbout() {
	return (
		<TwoUpContainer $divided>
			<TwoUp>
				<h3>{'Spirit Guide to Another Realm. . .'}</h3>
				<p>
					{
						'We are your psychopomp—your spirit guide—to an amazing Web 3.0 future infused with the culture of comic books and collectibles.  We’re creating new worlds with incredible stories and insane art, and making it free and accessible for all.'
					}
				</p>
				<p>
					{
						'NFT technology makes it possible for a comic book company to succeed alongside the artists that help bring stories to life, not at their expense.  This is the embodiment of WAGMI – the mantra popularized by NFT enthusiasts that expresses the idea that, together, “We’re All Going to Make It.”'
					}
				</p>
				<h3>{'How is Psychopomp comics Different?'}</h3>
				<ol>
					<li>
						<p>{'Free digital comics for all'}</p>
					</li>
					<li>
						<p>{'Funded by limited edition NFTs'}</p>
					</li>
					<li>
						<p>{'Generous airdrops to our beloved NFT holders'}</p>
					</li>
					<li>
						<p>
							{
								'A commitment to growing the business so our NFTs gain value alongside it.'
							}
						</p>
					</li>
				</ol>
			</TwoUp>
			<TwoUp>
				<h3 className='text-center'>{'Core Team'}</h3>
				<CoreTeam />
			</TwoUp>
		</TwoUpContainer>
	);
}
