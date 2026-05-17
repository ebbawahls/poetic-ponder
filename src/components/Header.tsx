import logo from '../assets/logo.svg';
import './Header.scss';

export const Header = () => {
  return (
    <header className="hero">
      <img src={logo} alt="Poetic Ponder" className="logo" />
    </header>
  );
};
