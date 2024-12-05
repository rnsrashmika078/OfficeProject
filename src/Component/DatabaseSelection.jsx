import Message from "./Message";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function DatabaseSelection({host}) {
  return (
    <div>
       <Message msgbody="You have logged in as Admin"/>
     <NavBar header="ADMIN PANEL"/>
     <center>
  
                <hr /></center>
      <div className="container text-center mt-5">
        <h1>Welcome to the Office Database</h1>
        <p className="lead">A platform to manage office resources, users, and administration tasks.</p>
        <div className="d-flex justify-content-center gap-4 mt-4">
          <Link to="/admin/dashboard/rmoffice">
            <button className="btn btn-primary btn-lg">RM OFFICE BANDARWELA</button>
          </Link>
          <Link to="/admin/dashboard/hardware">
            <button className="btn btn-secondary btn-lg">DIVISIONAL SITE DETAILS</button>
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

export default DatabaseSelection;
