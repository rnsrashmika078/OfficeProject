import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'
function Header() {
    return (
        <div className="sticky-header">
        <div className="container-flex-my-4 mx-3">
        <h1 className="text-primary"></h1>
        <img src="./public/headerimg.png" className="card-img-top" alt="..."></img>
        </div>
        </div>
    );
}

export default Header;