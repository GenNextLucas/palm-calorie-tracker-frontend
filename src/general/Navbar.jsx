import { Link } from 'react-router-dom';

import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Manage Foods</Link>
        <Link to="/meals">Log Meals</Link>
      </div>
    </nav>
  );
}
export default Navbar;