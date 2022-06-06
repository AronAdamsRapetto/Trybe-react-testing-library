import React from 'react';
import { screen } from '@testing-library/react';
import renderwithRouter from '../helper/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa NotFound page', () => {
  it('Verifica se existe o texto "Page requested not found 😭"', () => {
    renderwithRouter(<NotFound />);
    const titleElement = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(titleElement).toBeInTheDocument();
  });

  it('Verifica se existe uma imagem específica na tela', () => {
    renderwithRouter(<NotFound />);
    const imageElement = screen.getByAltText(/pikachu crying/i);

    expect(imageElement).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
