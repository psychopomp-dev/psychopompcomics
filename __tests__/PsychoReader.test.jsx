jest.mock('../components/comicReader/PsychoReader', () => ({
	PsychoReader: ({ psychoReaderConfig }) => (
		<div data-testid='psycho-swiper'>
			{psychoReaderConfig.pages.map((_, index) => (
				<div data-testid='psycho-slide' key={index} />
			))}
		</div>
	),
}));

import { ThemeProvider } from 'styled-components';
import { themeDark } from '../components/themes/DefaultTheme';
import { GlobalStyle } from '../components/styles/GlobalStyles.styled';
import { PsychoReader } from '../components/comicReader/PsychoReader';
import minimalConfig from './fixtures/minimal-reader-config.json';
import { render, screen } from '@testing-library/react';
import '../__mocks__/intersection-observer';

describe('PsychoReader', () => {
	it('renders a slide for each configured page', () => {
		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<PsychoReader psychoReaderConfig={minimalConfig} />
				</ThemeProvider>
			</>
		);

		expect(screen.getByTestId('psycho-swiper')).toBeInTheDocument();
		expect(screen.getAllByTestId('psycho-slide')).toHaveLength(1);
	});
});
