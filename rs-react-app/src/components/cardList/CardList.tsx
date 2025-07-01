import { Component, type ReactNode } from 'react';
import type { IMovie } from '../../shared/types/types';

interface ICardList {
  movies: IMovie[] | null;
}

class CardList extends Component<ICardList> {
  render(): ReactNode {
    const { movies } = this.props;
    if (movies === null) {
      return <p className="text-3xl mb-2">Start with searching.</p>;
    }
    if (movies.length === 0) {
      return <p>Nothing Found, change search</p>;
    }

    return (
      <div>
        <h2 className="text-3xl mb-2">Results:</h2>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col border-2 border-indigo-600 p-2 max-h-80 "
            >
              <h3 className="text-2xl mb-2">{movie.title}</h3>
              <p className="overflow-hidden text-ellipsis">{movie.overview}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CardList;
