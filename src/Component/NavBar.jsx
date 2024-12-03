import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './navlink.css';
const NavBar = () => {

 
  return (
    // bg-dark-tertiary
    <nav className="navbar navbar-expand-lg  sticky-top" data-bs-theme="dark" style={{backgroundColor:'black'}}>
      <div className="container-fluid">
      <Link to="/" ><img src="./public/icon.png" className="card-img-top" alt="..." style={{width:'150px',  borderRadius:'10px'}}></img></Link>
        {/* <Link className="navbar-brand" to="/">Office Database</Link> */}
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-1">
          <div className="navs">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin" >Administration</Link>
            </li>
            </div>
            <div className="navs">
            <li className="nav-item">
              <Link className="nav-link active" to="/users">Users</Link>
            </li>
            </div>
          </ul>
          <span className="navbar-text"></span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
