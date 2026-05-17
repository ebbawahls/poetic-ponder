import './PoemList.scss';
import { useEffect, useState } from 'react';
import { fetchRandomPoems } from '../api/poetryApi';
import type { Poem } from '../types/Poem';
import { Link } from 'react-router-dom';
import { createPoemId } from '../utils/poemId';

export const PoemList = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPoems = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchRandomPoems();
      setPoems(data);
    } catch (error) {
      setError('Could not load poems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoems();
  }, []);

  return (
    <div className="poemList">
      <button onClick={loadPoems}>
        {loading ? 'Loading...' : 'Get new poems'}
      </button>

      {error && <p>{error}</p>}

      <h1 className="srOnly">Poetic Ponder</h1>

      <div className="poemGrid">
        {poems.map((poem) => {
          const poemId = createPoemId(poem.title, poem.author);

          return (
            <Link to={`/poem/${poemId}`} className="card" key={poemId}>
              <h2>{poem.title}</h2>
              <p>{poem.author}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
