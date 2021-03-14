import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

function Header() {
  return (
    <header className="wrapper">
      <h2><img className="logo" src={logo} alt="popsicle logo"/> Popsipoll</h2> 
      <nav>
        <ul>
          <li><Link to="/">Poll Booths</Link></li>
          <li><Link to="/">Create Poll</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;