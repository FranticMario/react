const apiToken = import.meta.env.VITE_API_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`,
  },
};

export const searchMovie = async (query: string) => {
  const queryCheck = query
    ? `search/movie?query=${encodeURIComponent(query)}&`
    : 'trending/movie/day?';
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${queryCheck}&include_adult=false&language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
