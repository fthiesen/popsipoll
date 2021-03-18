import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from './assets/logo.png';

function Header() {

  const [theme, setTheme] = useState(localStorage.getItem("dark-mode"));

  const body = document.querySelector('body');

  let darkMode = localStorage.getItem("dark-mode");

  if (darkMode === "dark") {
    body.classList.add('dark-theme-body');
  }

  const handleClick = () => {
    if (darkMode === "dark") {
      body.classList.remove('dark-theme-body');
      localStorage.setItem("dark-mode", "light");
      darkMode = 'light';
      setTheme('light');

    } else {
      body.classList.add('dark-theme-body');
      localStorage.setItem("dark-mode", "dark");
      darkMode = 'dark';
      setTheme('dark');
    }
  }

  return (
    <header className="wrapper">
      <h2><img className="logo" src={logo} alt="popsicle logo" /> Popsipoll</h2>
      <nav>
        <ul>
          <li><Link to={`/pollbooths`}>Poll Booths</Link></li>
          <li><Link to="/">Create Poll</Link></li>
          <li>
            <button className="theme-button" onClick={handleClick}>
            {
              theme === 'dark' ?
                "Light Mode"
                : "Dark Mode"
            }
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;