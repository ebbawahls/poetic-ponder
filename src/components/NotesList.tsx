import './NotesList.scss';
import { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api/notesApi';
import type { Note } from '../types/Note';

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete the thoughts, and let them slip into the night?',
    );
    if (!confirmDelete) return;

    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="notesList">
      <h1>My Notes</h1>

      <div className="searchBar">
        <input
          placeholder="Search the thoughts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="notesGrid">
        {filtered.map((n) => (
          <div key={n.id} className="noteCard">
            <h3>{n.title}</h3>
            <p>{n.body}</p>

            <button onClick={() => handleDelete(n.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
