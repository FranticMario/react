import { Component, type ChangeEvent, type FormEvent } from 'react';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
import { searchMovie } from '../shared/api/api';
import type { HomeState } from '../shared/types/types';

class Home extends Component<Record<string, never>, HomeState> {
  state: HomeState = {
    query: '',
    movies: null,
    loading: false,
    error: null,
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { query } = this.state;

    this.setState({ loading: true, error: null });
    localStorage.setItem('query', this.state.query.trim());
    try {
      const movies = await searchMovie(query.trim());
      this.setState({ movies: movies.results, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: String(error), loading: false });
      }
    }
  };

  componentDidMount() {
    const oldQuery = localStorage.getItem('query');
    if (oldQuery) {
      this.setState({
        query: oldQuery,
      });
    }
  }

  render() {
    return (
      <div>
        <Header
          query={this.state.query}
          handleInputChange={this.handleInputChange}
          handleSearch={this.handleSearch}
        />

        {this.state.error ? (
          <p>Something went wrong: {this.state.error}</p>
        ) : this.state.loading ? (
          <div className="spinner"></div>
        ) : (
          <CardList movies={this.state.movies} />
        )}
      </div>
    );
  }
}

export default Home;
