const BASE_URL = 'https://dummyjson.com/posts';
import type { Note } from '../types/Note';

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  return data.posts;
};

export const saveNote = async (
  title: string,
  text: string,
  poemId: string,
): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body: text,
      userId: 1,
      poemId,
    }),
  });

  return res.json();
};

export const updateNote = async (
  id: number,
  title: string,
  text: string,
): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body: text,
    }),
  });

  return res.json();
};

export const deleteNote = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
