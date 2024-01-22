import { ThemeProvider } from 'styled-components';
import { themeDark } from '../components/themes/DefaultTheme';
import { GlobalStyle } from '../components/styles/GlobalStyles.styled';
import Home from '../pages/index';
import { render, screen } from '@testing-library/react';
import '../__mocks__/intersection-observer';

describe('Home Page', () => {
  const renderHomePage = () => {
    render(
      <>
        <GlobalStyle />
        <ThemeProvider theme={themeDark}>
          <Home />
        </ThemeProvider>
      </>
    );
  };

  it('should render the hero banner', () => {
    renderHomePage();
    const heroImg = screen.getByRole('img', {
      name: /Colonel Frost holding a pistol and standing in a pile of dead robots, second image layer/i,
    });
    expect(heroImg).toBeInTheDocument();
  });

  it('should render a comic logo bar', () => {
    renderHomePage();
    const socLogo = screen.getByRole('img', {
      name: /seed of cain logo/i,
    });
    expect(socLogo).toBeInTheDocument();
  });

  it('should render an email input', () => {
    renderHomePage();
    const textbox = screen.getByRole('textbox', { type: 'email' });
    expect(textbox).toBeInTheDocument();
    expect(textbox).not.toBeDisabled();
  });
});
