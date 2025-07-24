import { describe, it, expect, vi } from 'vitest';
import { searchMovie } from '../api';

describe('searchMovie', () => {
  it('fetches data with correct query', async () => {
    const mockResponse = {
      results: [{ id: 1, title: 'Naruto' }],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await searchMovie('Naruto');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('search/movie?query=Naruto'),
      expect.any(Object)
    );

    expect(result).toEqual(mockResponse);
  });

  it('throws error when response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(() => searchMovie('fail')).rejects.toThrow(
      'Ошибка запроса: 500'
    );
  });
});
