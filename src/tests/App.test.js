import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderwithRouter from '../helper/renderWithRouter';

describe('Testes do componente App', () => {
  it('Testa se existe um conjunto fixo de links na página', () => {
    renderwithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Ao clicar no link "home" é redirecionado para "/"', () => {
    const { history } = renderwithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Ao clicar no link "about" é redirecionado para "/about"', () => {
    const { history } = renderwithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Ao clicar no link "favorite pokemóns" é redirecionado para "/favorites"', () => {
    const { history } = renderwithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoriteLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Testa se é redirecionado para not found page', () => {
    const { history } = renderwithRouter(<App />);

    history.push('/pagina/queNaoExiste');

    const { location: { pathname } } = history;

    expect(pathname).toBe('/pagina/queNaoExiste');
    expect(screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2 }))
      .toBeInTheDocument();
  });
});
