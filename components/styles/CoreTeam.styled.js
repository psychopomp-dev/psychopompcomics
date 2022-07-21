import styled from 'styled-components';
import Image from 'next/image';
import { m } from 'framer-motion';
import roninPic from '../../images/core-members/RoninRosewater.jpg';
import alaricPic from '../../images/core-members/4L4RIC.jpg';
import nfterPic from '../../images/core-members/The_NFTer.jpg';
import tr3mulantPic from '../../images/core-members/tr3mulant.jpg';

const CoreTeamContainer = styled(m.div)`
	margin-top: var(--space-ml);
	display: grid;
	grid-template-areas:
		'card card'
		'card card';
	gap: var(--space-ml);
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	max-width: 42rem;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
		grid-template-areas:
			'card'
			'card'
			'card'
			'card';
		gap: var(--space-ml);
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		max-width: 22rem;
	}
`;

const CoreTeamMember = styled(m.section)`
	background-color: var(--surface1);
	border: 0.1rem solid hsl(var(--brand-hue) 10% 50% / 15%);
	border-radius: 1rem;
	padding: var(--space-ml);
	box-shadow: var(--box-shadow-md);
	h4 + h4 {
		margin-top: var(--space-xs);
	}
`;

const CoreTeamMemberImage = styled.div`
	display: flex;
	justify-content: center;
`;

const coreTeamVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.3,
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
};

const childrenTCoreTeamVariants = {
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

export default function CoreTeam() {
	return (
		<CoreTeamContainer
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={coreTeamVariants}
		>
			<CoreTeamMember variants={childrenTCoreTeamVariants}>
				<CoreTeamMemberImage>
					<Image
						width='75'
						height='75'
						src={roninPic}
						alt='Ian'
						layout='fixed'
						placeholder='blur'
					/>
				</CoreTeamMemberImage>
				<h4>Ian</h4>
				<h4>Chief Wagmi Officer</h4>
				<h4>
					<a
						href='https://twitter.com/RoninRosewater'
						target='_blank'
						rel='noreferrer'
					>
						@RoninRosewater
					</a>
				</h4>
			</CoreTeamMember>
			<CoreTeamMember variants={childrenTCoreTeamVariants}>
				<CoreTeamMemberImage>
					<Image
						width='75'
						height='75'
						src={alaricPic}
						alt='Caleb'
						layout='fixed'
						placeholder='blur'
					/>
				</CoreTeamMemberImage>
				<h4>Caleb</h4>
				<h4>Developer</h4>
				<h4>
					<a
						href='https://twitter.com/4l4RIC_1'
						target='_blank'
						rel='noreferrer'
					>
						@4l4RIC_1
					</a>
				</h4>
			</CoreTeamMember>
			<CoreTeamMember variants={childrenTCoreTeamVariants}>
				<CoreTeamMemberImage>
					<Image
						width='75'
						height='75'
						src={nfterPic}
						alt='Spencer'
						layout='fixed'
						placeholder='blur'
					/>
				</CoreTeamMemberImage>
				<h4>Spencer</h4>
				<h4>Director of Lore</h4>
				<h4>
					<a
						href='https://twitter.com/The_NFTer'
						target='_blank'
						rel='noreferrer'
					>
						@The_NFTer
					</a>
				</h4>
			</CoreTeamMember>
			<CoreTeamMember variants={childrenTCoreTeamVariants}>
				<CoreTeamMemberImage>
					<Image
						width='75'
						height='75'
						src={tr3mulantPic}
						alt='Scott'
						layout='fixed'
						placeholder='blur'
					/>
				</CoreTeamMemberImage>
				<h4>Scott</h4>
				<h4>Developer</h4>
				<h4>
					<a
						href='https://twitter.com/__tr3mulant__'
						target='_blank'
						rel='noreferrer'
					>
						@__tr3mulant__
					</a>
				</h4>
			</CoreTeamMember>
		</CoreTeamContainer>
	);
}
