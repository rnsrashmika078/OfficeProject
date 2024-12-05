import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, } from 'react-router-dom';
import './navlink.css';
import { FaUserCircle, FaCogs, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Message from './Message';

const NavBar = ({header, subheader ,username}) => {

  const [show, setShow] = useState(true);

  const [newusername,setnewUsername] = useState('');
  const handleClearStorage = () => {
    localStorage.clear(); // Clears all data from localStorage
    // alert('Local storage cleared!');
  };
  const navigate = useNavigate();
  // const[logintoken,setloginToken] = useState(0);

  const [clickitem,setclickItem] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const handleClick = (component) =>{
    setclickItem(component);
    // alert(clickitem);
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
    
    // setTimeout(() => setShow(false), 10000);
    navigate(localStorage.getItem('adminlogtoken') > 0 ? '/admin' : '/user')
    localStorage.removeItem('userlogtoken');
    localStorage.removeItem('adminlogtoken');
    localStorage.removeItem('username');

    localStorage.clear();
    

  };

  const handleLoginClick = () => {
  
  }


  
  return (
   <><div>

    {/* {show ? null : <Message/> } */}
   </div>
    <nav
    className="navbar navbar-expand-lg sticky-top"
    style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
      <div className="container-fluid">
        <Link to="/"  className="d-flex align-items-center" >
          <img
            src="./public/wbl.png"
            className="card-img-top me-2"
            alt="Logo"
            style={{ width: '400px', borderRadius: '10px' }}
          />
          <span className="navbar-brand mb-0 text-black"></span>
        </Link>
        <div className='' style={{paddingRight:'200px'}}>
            <Link to="/"><button  onClick={()=> handleClick('Home')} className='button'>Home</button></Link>
            <Link to="/About Us"><button  onClick={()=> handleClick('About')} className='button'>About Us</button></Link>
            {localStorage.getItem('userlogtoken') > 0  ? 
           (
            <Link to="/admin"></Link>
           ) :(
            <Link to="/admin"><button  onClick={()=> handleClick('Admin')} className='button'>Administration</button></Link>
           )} 
           {localStorage.getItem('adminlogtoken') > 0  ? 
           (
            <Link to="/admin"></Link>

           ) :(
            <Link to="/user"><button  onClick={()=> handleClick('User')} className='button'>User</button></Link>
           )} 
            <Link to="/"><button  className='button' onClick={handleClearStorage}>Troubleshoot</button></Link>

        </div>

        {isLoggedIn || localStorage.getItem('adminlogtoken') > 0 || localStorage.getItem('userlogtoken') > 0 ? (
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={40} /><span>  {localStorage.getItem('username')}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/">
              <button onClick={handleLoginClick} className="btn btn-primary">Login | Sign</button>
            </Link>
          )}
        <div className='dashboard'>
          <h4 className="header">{header}</h4>
          <h6 className="subheader">{subheader}</h6>
        </div>  
      </div>
     
    </nav>
    </> 
  );
};

export default NavBar;
