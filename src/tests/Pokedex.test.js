import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderwithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Testes da Pokedex page', () => {
  it('Verifica se a página tem um heading com o texto "Encountered pokémons"', () => {
    renderwithRouter(<App />);
    const titleElement = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(titleElement).toBeInTheDocument();
  });

  it('Verifica se aparece um próximo pokemon ao clicar no botão', () => {
    renderwithRouter(<App />);
    const btnNext = screen.getByTestId(/next-pokemon/i);

    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(btnNext);
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });
  });

  it('Verifica se Pokédex tem todos os botões de filtro na tela', () => {
    renderwithRouter(<App />);
    const allBtnTypes = screen.getAllByTestId('pokemon-type-button');
    const allTypes = pokemons.reduce((types, { type }) => [...types, type], [])
      .filter((type, index, self) => self.indexOf(type) === index);

    allTypes.forEach((type, index) => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(allBtnTypes[index]).toBeInTheDocument();
      expect(allBtnTypes[index]).toHaveTextContent(type);
    });
  });

  it('Verifica se existe um botão para resetar os filtros', () => {
    renderwithRouter(<App />);
    const resetFiltersBtn = screen.getByRole('button', { name: /all/i });

    expect(resetFiltersBtn).toBeInTheDocument();

    userEvent.click(resetFiltersBtn);

    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
