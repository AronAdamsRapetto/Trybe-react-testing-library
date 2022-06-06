import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderwithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Testes da Pokedex page', () => {
  it('Verifica se a página tem um heading com o texto "Encountered pokémons"', () => {
    renderwithRouter(<Pokedex />);
    const titleElement = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(titleElement).toBeInTheDocument();
  });

  // it('Verifica se aparece um próximo pokemon ao clicar no botão', () => {
  //   renderwithRouter(<Pokedex />);
  //   const btnNext = screen.getByTestId(/next-pokemon/i);

  //   pokemons.forEach(({ name }) => {
  //     expect(screen.getByText(name)).toBeInTheDocument();
  //     userEvent.click(btnNext);
  //   });
  // });
});
