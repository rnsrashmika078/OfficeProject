import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="container text-center mt-5">
        <h1>Welcome to the Office Database</h1>
        <p className="lead">A platform to manage office resources, users, and administration tasks.</p>
        <div className="d-flex justify-content-center gap-4 mt-4">
          <Link to="/admin">
            <button className="btn btn-primary btn-lg">ADMIN</button>
          </Link>
          <Link to="/users">
            <button className="btn btn-secondary btn-lg">USER</button>
          </Link>
        </div>
        <div className="mt-5">
          <p className="text-muted">
            Choose your role to access the respective section of the office database. As an admin, you can manage users, while a user can view and update their information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
