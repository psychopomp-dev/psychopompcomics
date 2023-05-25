import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType } from 'next';
import PsychoReader from '../../../components/comicReader/PsychoReader';
import PsychoReaderConfig from '../../../components/comicReader/PsychoReaderConfig';
import { IConfig } from '../../../components/comicReader/IConfig';
import MotionMain from '../../../components/styles/MotionMain.styled';

const PsychoReaderMain = styled(MotionMain)`
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 12.5rem);
`;

export async function getServerSideProps() {
	const readerConfig: IConfig = await PsychoReaderConfig(
		'public/protocol-7/issue1/config.json'
	);
	return {
		props: {
			psychoReaderConfig: JSON.parse(JSON.stringify(readerConfig)),
		},
	};
}

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { psychoReaderConfig } = props;

	return (
		<>
			<PsychoReaderMain>
				<PsychoReader psychoReaderConfig={psychoReaderConfig} />
			</PsychoReaderMain>
		</>
	);
};

export default Home;
