import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderwithRouter from '../helper/renderWithRouter';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testes da FavoritePokemons page', () => {
  it(`Testa se é exibido na tela a mensagem "No favorite pokemon found" ou 
  os cards dos pokemons favoritos`, () => {
    renderwithRouter(<FavoritePokemons />);
    const idPokemons = readFavoritePokemonIds();
    if (idPokemons.length === 0) {
      const notFoundMessage = screen.getByText(/no favorite pokemon found/i);

      expect(notFoundMessage).toBeInTheDocument();
    } else {
      const linkElements = screen.getAllByRole('link', { name: /more details/i });

      expect(linkElements).toHaveLength(idPokemons.length);
    }
  });
});
