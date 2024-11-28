import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AdminLog() {

    const host = 'http://officedatabase101.com.preview.services';
    // const host = 'https://office-project.infinityfreeapp.com';
// 
    // http://officedatabase101.com.preview.services/test/AdminTables/login.php
    // const host  = 'https://192.168.0.100'
    // const host = 'http://localhost';
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleemailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlepasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUpClick = () => {
        navigate('/admin/createaccount');
    };

    const handleLoginClick = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Both email and password fields are required!');
            return;
        }
    
        console.log('Sending email:', email);
        console.log('Sending password:', password);
    
        try {
            // const response = await fetch(`${host}/test/AdminTables/login.php`, {
            const response = await fetch(`${host}/test/AdminTables/login.php`, {
           
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json(); // Assuming the response is valid JSON
            console.log("Response Data:", data); // Log the response data
    
            if (data.success) {
                navigate('/admin/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Login error', err);
            setError('An error occurred. Please try again.');
        }
    };
    

    return (
        <>
            <NavBar />
            <br />
            <div className="container mb-3" style={{ maxWidth: "500px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                <form>
                   <center> <h1>Administration</h1>
                    <p className="lead">Login Page for Administration.</p></center>
                    <br />
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" value={email} onChange={handleemailChange} placeholder='Enter Admin Email' id="inputEmail3" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" value={password} onChange={handlepasswordChange} placeholder='Enter Admin password' id="inputPassword3" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        {/* <button type="button" className="btn btn-primary" onClick={handleResetClick}>Request Reset</button> */}
                        <button type="button" className="btn btn-primary" onClick={handleLoginClick}>Log in</button>
                        <button type="button" className="btn btn-primary" onClick={handleSignUpClick}>Sign in</button>
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
            </div>
        </>
    );
}

export default AdminLog;
