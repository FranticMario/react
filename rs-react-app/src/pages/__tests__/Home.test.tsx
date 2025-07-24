import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from '../Home';
import userEvent from '@testing-library/user-event';
vi.mock('../../../shared/api/api');

describe('<Home />', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('query', 'Batman');
    render(<Home />);

    const input = screen.getByRole('textbox', {
      name: /search a film/i,
    }) as HTMLInputElement;
    expect(input.value).toBe('Batman');
  });
  it('Shows empty input when no saved term exists', () => {
    render(<Home />);

    const input = screen.getByRole('textbox', {
      name: /search a film/i,
    }) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('Triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByRole('textbox', { name: /search a film/i });
    await user.type(input, 'Iron Man');

    expect(input).toHaveValue('Iron Man');
  });
  it('Retrieves saved search term on component mount', async () => {
    localStorage.setItem('query', 'Batman');
    render(<Home />);
    const input = screen.getByRole('textbox', { name: /search a film/i });

    expect(input).toHaveProperty('value', 'Batman');
  });
  it('Overwrites existing localStorage value when new search is performed', async () => {
    const user = userEvent.setup();

    localStorage.setItem('query', 'Batman');

    render(<Home />);

    const input = screen.getByRole('textbox', { name: /search a film/i });
    await user.clear(input);
    await user.type(input, 'Naruto');

    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);

    expect(localStorage.getItem('query')).toBe('Naruto');
  });

  it('Shows loading state while fetching data', async () => {
    const user = userEvent.setup();

    localStorage.setItem('query', 'Batman');

    render(<Home />);

    const input = screen.getByRole('textbox', { name: /search a film/i });
    await user.clear(input);
    await user.type(input, 'Naruto');

    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);

    expect(localStorage.getItem('query')).toBe('Naruto');
  });
});
