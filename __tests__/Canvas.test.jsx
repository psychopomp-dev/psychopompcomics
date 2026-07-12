jest.mock('../utils/CanvasHelper', () => ({
	drawCanvas: jest.fn(),
}));

jest.mock('../components/styles/MotionLogo.styled', () => ({
	__esModule: true,
	default: ({ loop }) => (
		<div data-testid='motion-logo' data-loop={loop ? 'true' : 'false'} />
	),
}));

import { createRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { themeDark } from '../components/themes/DefaultTheme';
import { GlobalStyle } from '../components/styles/GlobalStyles.styled';
import { Canvas } from '../components/comicReader/Canvas';
import { Client } from '../components/comicReader/PsychoClient';
import minimalConfig from './fixtures/minimal-reader-config.json';
import { drawCanvas } from '../utils/CanvasHelper';
import { act, render, screen, waitFor } from '@testing-library/react';
import '../__mocks__/intersection-observer';

describe('Canvas', () => {
	beforeEach(() => {
		jest.mocked(drawCanvas).mockReset();
	});

	it('shows the looping logo overlay until the page image is drawn', async () => {
		let resolveDraw;
		jest.mocked(drawCanvas).mockReturnValue(
			new Promise((resolve) => {
				resolveDraw = resolve;
			})
		);

		const page = Client(minimalConfig).book.pages[0];
		const canvasRef = createRef();

		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<Canvas
						canvasRef={canvasRef}
						width={1000}
						height={1500}
						src={page.imageUrl}
						objectPosition='contain'
						page={page}
					/>
				</ThemeProvider>
			</>
		);

		expect(screen.getByTestId('canvas-loading-overlay')).toBeInTheDocument();
		expect(screen.getByTestId('motion-logo')).toHaveAttribute(
			'data-loop',
			'true'
		);

		await act(async () => {
			resolveDraw();
		});

		await waitFor(
			() => {
				expect(
					screen.queryByTestId('canvas-loading-overlay')
				).not.toBeInTheDocument();
			},
			{ timeout: 1000 }
		);
	});
});
