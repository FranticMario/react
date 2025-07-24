import { Component, type ChangeEvent, type FormEvent } from 'react';
import BuggyComponent from '../buggyComponent/BuggyComponent';

interface IHeaderProps {
  query: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}

interface HeaderState {
  error: boolean;
}
class SearchInput extends Component<IHeaderProps, HeaderState> {
  state = {
    error: false,
  };

  toggleError = () => {
    this.setState(({ error }) => ({ error: !error }));
  };

  render() {
    const { query, handleInputChange, handleSearch } = this.props;

    return (
      <div className="gap-2 p-4 border-2 rounded-3xl">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search a film"
            aria-label="Search a film"
          />
          <button>Search</button>
        </form>

        <button onClick={this.toggleError}>Вызвать ошибку</button>

        {this.state.error && <BuggyComponent />}
      </div>
    );
  }
}

export default SearchInput;
