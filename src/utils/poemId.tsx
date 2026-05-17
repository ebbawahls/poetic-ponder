export const createPoemId = (title: string, author: string) => {
  return encodeURIComponent(`${title}||${author}`);
};

export const parsePoemId = (id: string) => {
  const decoded = decodeURIComponent(id);
  const [title, author] = decoded.split('||');

  return { title, author };
};
