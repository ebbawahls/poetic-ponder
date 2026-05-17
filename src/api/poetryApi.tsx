import type { Poem } from '../types/Poem';

export const fetchRandomPoems = async (): Promise<Poem[]> => {
  const res = await fetch('https://poetrydb.org/random/3');

  if (!res.ok) {
    throw new Error('Failed to fetch poems');
  }

  const data = await res.json();

  return data;
};

export const fetchPoem = async (
  title: string,
  author: string,
): Promise<Poem> => {
  const res = await fetch(
    `https://poetrydb.org/author,title/${encodeURIComponent(author)};${encodeURIComponent(title)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch poem');
  }

  const data = await res.json();

  return data[0];
};
