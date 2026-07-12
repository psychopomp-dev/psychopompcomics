import { ThemeProvider } from 'styled-components';
import { themeDark } from '../components/themes/DefaultTheme';
import { GlobalStyle } from '../components/styles/GlobalStyles.styled';
import Comics from '../pages/comics';
import { render, screen } from '@testing-library/react';
import '../__mocks__/intersection-observer';

jest.mock('next/dynamic', () => () => {
	const DynamicComponent = () => null;
	DynamicComponent.displayName = 'LoadableComponent';
	return DynamicComponent;
});

describe('Comics page', () => {
	it('renders comic cover links', () => {
		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<Comics />
				</ThemeProvider>
			</>
		);

		expect(
			screen.getAllByRole('link', { name: /protocol 7/i })[0]
		).toHaveAttribute('href', '/comics/protocol-7/issue1');
		expect(screen.getAllByRole('link', { name: /shoebox/i })[0]).toHaveAttribute(
			'href',
			'/comics/shoebox/issue1'
		);
	});

	it('renders the Seed of Cain series link', () => {
		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<Comics />
				</ThemeProvider>
			</>
		);

		expect(
			screen.getAllByRole('link', { name: /seed of cain/i })[0]
		).toHaveAttribute('href', '/seed-of-cain');
	});
});
