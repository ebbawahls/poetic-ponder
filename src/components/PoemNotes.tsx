import './PoemNotes.scss';
import { useEffect, useState } from 'react';
import { getNotes, saveNote, updateNote, deleteNote } from '../api/notesApi';
import type { Note } from '../types/Note';

export function PoemNotes({ poemId }: { poemId: string }) {
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const load = async () => {
      const all = await getNotes();

      const found = all.find((n) => n.poemId === poemId);

      setNote(found || null);

      if (found) {
        setTitle(found.title);
        setText(found.body);
      }
    };

    load();
  }, [poemId]);

  const handleSave = async () => {
    if (!text.trim()) return;

    const newNote = await saveNote(title, text, poemId);

    setNote(newNote);
    setEditing(false);
  };

  const handleUpdate = async () => {
    if (!note) return;

    await updateNote(note.id, title, text);

    setNote({ ...note, title, body: text });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!note) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete the thoughts, and let them slip into the night?',
    );

    if (!confirmDelete) return;

    await deleteNote(note.id);

    setNote(null);
    setTitle('');
    setText('');
  };

  return (
    <div className="notes">
      <h3>Your pondering for this poem</h3>

      {!note ? (
        <>
          <textarea
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Just write what you feel..."
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <>
          <div className="noteCard">
            <h4>{note.title}</h4>
            <p>{note.body}</p>
          </div>
          <button
            onClick={() => {
              setTitle(note.title);
              setText(note.body);
              setEditing(true);
            }}
          >
            Edit
          </button>

          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
