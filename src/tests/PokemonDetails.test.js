import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderwithRouter from '../helper/renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testes da PokemonDetails page', () => {
  it('Testa se as informações do pokemon são mostradas na tela', () => {
    renderwithRouter(<App />);
    const { name, summary } = pokemons[0];

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByRole('heading', { name: /details/i, level: 2 }))
      .toHaveTextContent(`${name} Details`);
    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i, level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Testa se os mapas de localização são mostrados na tela', () => {
    renderwithRouter(<App />);
    const { name, foundAt } = pokemons[0];

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByRole('heading', { name: /game locations/i, level: 2 }))
      .toHaveTextContent(`Game Locations of ${name}`);

    foundAt.forEach(({ location, map }, index) => {
      const mapImage = screen.getAllByAltText(`${name} location`);

      expect(mapImage[index]).toHaveAttribute('src', map);
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });

  it('Testa se o usuário pode favoritar um pokemon', () => {
    renderwithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    const checkboxFavorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkboxFavorite).toBeInTheDocument();
    expect(checkboxFavorite).not.toBeChecked();

    userEvent.click(checkboxFavorite);
    let favorites = readFavoritePokemonIds();

    expect(checkboxFavorite).toBeChecked();
    expect(favorites).toHaveLength(1);

    userEvent.click(checkboxFavorite);
    favorites = readFavoritePokemonIds();

    expect(checkboxFavorite).not.toBeChecked();
    expect(favorites).toHaveLength(0);
  });
});
