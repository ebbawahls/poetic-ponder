import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>POEMS</button>
      </Link>

      <Link to="/notes">
        <button>My Notes</button>
      </Link>
    </nav>
  );
}
