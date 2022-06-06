import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderwithRouter from '../helper/renderWithRouter';

describe('Testes da About page', () => {
  it('Verifica se existe um h2 com "About Pokédex" na tela', () => {
    renderwithRouter(<About />);
    const titleElement = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2 });

    expect(titleElement).toBeInTheDocument();
  });

  it('Verifica se tem 2 paragrafos com texto sobre a pokédex na tela', () => {
    renderwithRouter(<About />);
    const firstParagraph = screen.getByText(/this application simulates a pokédex/i);
    const secondParagraph = screen.getByText(/one can filter pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Verifica se existe uma imagem epecífica', () => {
    renderwithRouter(<About />);
    const imageElement = screen.getByAltText(/pokédex/i);

    expect(imageElement).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
