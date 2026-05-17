import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PoemPage } from './pages/PoemPage';
import { NotesPage } from './pages/NotesPage';

function App() {
  return (
    <>
      <Navbar />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poem/:id" element={<PoemPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </>
  );
}

export default App;
