import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from '../CardList';
import { moviesMockData } from './__mocks__/movies.mock';
import type { IMovie } from '../../../shared/types/types';

describe('<CardList', () => {
  it('Renders correct number of items when data is provided', () => {
    const movies = moviesMockData;
    render(<CardList movies={movies} />);

    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(movies.length);
  });
  it('Displays "no results" message when data array is empty', () => {
    const movies: IMovie[] = [];
    render(<CardList movies={movies} />);

    const message = screen.getByText('Nothing Found, change search');
    expect(message).toBeInTheDocument();
  });
});
