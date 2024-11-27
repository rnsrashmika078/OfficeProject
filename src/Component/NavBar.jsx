import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Office Database</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin">Administration</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/users">Users</Link>
            </li>
          </ul>
          <span className="navbar-text"></span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
