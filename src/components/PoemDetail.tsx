import './PoemDetail.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPoem } from '../api/poetryApi';
import type { Poem } from '../types/Poem';
import { parsePoemId } from '../utils/poemId';
import { PoemNotes } from '../components/PoemNotes';

export const PoemDetail = () => {
  const { id } = useParams();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPoem = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { title, author } = parsePoemId(id);

        const data = await fetchPoem(title, author);
        setPoem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPoem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!poem) return <p>No poem found</p>;

  return (
    <div className="poemDetail">
      <h1>{poem.title}</h1>
      <p className="author">{poem.author}</p>

      <div className="poemText">
        {poem.lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <PoemNotes poemId={id} />
    </div>
  );
};
