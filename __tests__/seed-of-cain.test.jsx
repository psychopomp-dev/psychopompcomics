import { ThemeProvider } from 'styled-components';
import { themeDark } from '../components/themes/DefaultTheme';
import { GlobalStyle } from '../components/styles/GlobalStyles.styled';
import SeedOfCain from '../pages/seed-of-cain';
import { render, screen } from '@testing-library/react';
import '../__mocks__/intersection-observer';

jest.mock('next/dynamic', () => () => {
	const DynamicComponent = () => null;
	DynamicComponent.displayName = 'LoadableComponent';
	return DynamicComponent;
});

describe('Seed of Cain page', () => {
	it('renders the Cain is coming hero image', () => {
		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<SeedOfCain />
				</ThemeProvider>
			</>
		);

		expect(
			screen.getByRole('img', { name: /cain is coming/i })
		).toBeInTheDocument();
	});

	it('renders the Something is Here section heading', () => {
		render(
			<>
				<GlobalStyle />
				<ThemeProvider theme={themeDark}>
					<SeedOfCain />
				</ThemeProvider>
			</>
		);

		expect(
			screen.getByRole('heading', { name: /something is here/i })
		).toBeInTheDocument();
	});
});
