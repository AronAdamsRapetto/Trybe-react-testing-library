import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderwithRouter from '../helper/renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testes do componente Pokemon.js', () => {
  it('Teste se as informações do pokemon são renderizadas', () => {
    renderwithRouter(<App />);
    const btnNext = screen.getByTestId('next-pokemon');

    pokemons.forEach(({
      id,
      name,
      type,
      averageWeight: { value, measurementUnit },
      image,
    }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByAltText(`${name} sprite`);
      const pokemonLink = screen.getByRole('link', { name: /more details/i });

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonLink).toBeInTheDocument();

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonLink).toHaveAttribute('href', `/pokemons/${id}`);

      userEvent.click(btnNext);
    });
  });

  it('Verifica se o link redireciona para os detalhes do pokemon', () => {
    const { history } = renderwithRouter(<App />);

    const pokemonLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(pokemonLink);

    const { location: { pathname } } = history;

    const { id } = pokemons[0];

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se os pokemons favoritados possuem um indicador', () => {
    const { history } = renderwithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));

    history.push('/');

    const favoritesById = readFavoritePokemonIds();
    console.log(favoritesById);

    pokemons.forEach(({ id, name }) => {
      if (favoritesById.some((idFavorite) => id === idFavorite)) {
        expect(screen.getByAltText(`${name} is marked as favorite`))
          .toHaveAttribute('src', '/star-icon.svg');

        userEvent.click(screen.getByTestId('next-pokemon'));
      }
    });
  });
});
