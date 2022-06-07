import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderwithRouter from '../helper/renderWithRouter';
import { readFavoritePokemonIds } from '../services/pokedexService';
import pokemons from '../data';

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

  it('Testa se os cards pokemons são renderizados corretamente', () => {
    const { history } = renderwithRouter(<App />);
    const FAVORITES = 4;

    pokemons.forEach(({ id }, index) => {
      if (index < FAVORITES) {
        history.push(`/pokemons/${id}`);
        userEvent.click(screen.getByLabelText(/pokémon favoritado/i));
      }
    });

    history.push('/favorites');

    const favorite = readFavoritePokemonIds();

    const filteredPokemons = pokemons
      .filter(({ id }) => favorite.some((favoriteId) => id === favoriteId));

    filteredPokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
