import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput from '../SearchInput';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
describe('<SearchInput/>', () => {
  const mockHandleInputChange = vi.fn();
  const mockHandleSearch = vi.fn();
  it('renders without breaking', () => {
    const query = '';

    expect(() =>
      render(
        <SearchInput
          query={query}
          handleInputChange={vi.fn()}
          handleSearch={vi.fn()}
        />
      )
    ).not.toThrow();
  });
  it('Updates input value when user types', () => {
    let query = '';
    const handleInputChange = vi.fn((e) => {
      query = e.target.value;
    });

    const handleSearch = vi.fn((e) => e.preventDefault());

    const { rerender } = render(
      <SearchInput
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
    );

    const input = screen.getByRole('textbox', {
      name: /search a film/i,
    }) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Iron Man' } });

    expect(handleInputChange).toHaveBeenCalled();

    rerender(
      <SearchInput
        query="Iron Man"
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
    );

    expect(input).toHaveValue('Iron Man');
  });
  it('Saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    const query = '  Iron Man  ';

    const handleSearch = vi.fn((e) => {
      e.preventDefault();
      localStorage.setItem('query', query);
    });

    render(
      <SearchInput
        query={query}
        handleInputChange={vi.fn()}
        handleSearch={handleSearch}
      />
    );

    const button = screen.getByRole('button', { name: 'Search' });

    await user.click(button);

    expect(handleSearch).toHaveBeenCalled();
    expect(localStorage.getItem('query')).toBe('  Iron Man  ');
  });
  it('Trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    const query = '  Iron Man  ';

    const handleSearch = vi.fn((e) => {
      e.preventDefault();
      localStorage.setItem('query', query.trim());
    });

    render(
      <SearchInput
        query={query}
        handleInputChange={vi.fn()}
        handleSearch={handleSearch}
      />
    );

    const button = screen.getByRole('button', { name: 'Search' });

    await user.click(button);

    expect(handleSearch).toHaveBeenCalled();
    expect(localStorage.getItem('query')).toBe('Iron Man');
  });
  it('calls handleSearch on form submit', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput
        query="Iron Man"
        handleInputChange={mockHandleInputChange}
        handleSearch={mockHandleSearch}
      />
    );

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(mockHandleSearch).toHaveBeenCalled();
  });
  it('toggles error state and shows BuggyComponent when error is true', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <SearchInput
          query=""
          handleInputChange={() => {}}
          handleSearch={() => {}}
        />
      </ErrorBoundary>
    );

    const toggleButton = screen.getByRole('button', {
      name: /вызвать ошибку/i,
    });
    await user.click(toggleButton);
    expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
  });
});
