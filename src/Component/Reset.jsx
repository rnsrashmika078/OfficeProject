import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Reset() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const [error, setError] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    const adminCodeChange = (e) =>{
        setAdminCode(e.target.value);
    }
    const handleResetClick = () => {
      // Check if both email and password fields are filled
      if (!email || !password || !confirmPassword || !adminCode) {
        setError('Please fill all the fields.');
        return;
      }
      setError(''); // Clear error if both fields are filled
    };

    const navigate = useNavigate();

    // const handleResetClick = () => {
    //     navigate('/admin');
    // }
    const handleBackClick = () => {
        navigate('/admin');
    }
    return (
      <>
        <NavBar />
        <br/>
        <div className="container mb-3" style={{ maxWidth: "700px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <form>
           {/* <img src="../public/hrlineimg.png" className="img-fluid d-flex justify-content-center gap-2" alt="..."></img> */}

                <h1 className="d-flex justify-content-center gap-2">Administration</h1>
                <h5 className="d-flex justify-content-center gap-2">Reset Admin Credentials</h5>
                {/* <img src="../public/hrlineimg.png" className="img-fluid d-flex justify-content-center gap-2" alt="..."></img> */}
                <br/>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control" value={email} onChange={handleEmailChange} placeholder="Enter Admin Email" id="inputEmail3" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword4" className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" value={password} onChange={handlePasswordChange} placeholder="Enter New Password" id="inputPassword4" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword5" className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" value={confirmPassword} onChange={confirmPasswordChange} placeholder='Confirm the New Password' id="inputPassword5" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword6" className="col-sm-3 col-form-label">Admin Code</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control"  value={adminCode} onChange={adminCodeChange} placeholder='Enter Admin Code Provided by the developer' id="inputPassword3" />
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                {/* <button type="button" className="btn btn-primary" onClick={handleResetClick}>Send</button>  */}
                <button type="button" className="btn btn-primary" onClick={handleResetClick}>Reset</button> 
                <button type="button" className="btn btn-primary" onClick={handleBackClick}>Back</button> 
                     {/* Conditionally render error message */}
       
                    {/* <button type="submit" className="btn btn-primary">Log in</button>
                    <button type="submit" className="btn btn-primary">Sign in</button> */}
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
      </>
    );
}

export default Reset;
