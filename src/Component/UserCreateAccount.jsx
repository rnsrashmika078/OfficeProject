import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import e from 'cors';

function UserCreateAccount({host}) {
    // const host = 'https://office-project.infinityfreeapp.com';
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const confirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const navigate = useNavigate();

    const handleResetClick = async (e) => {
        if (!email || !password || !confirmPassword ) {
            setError('Please fill all the fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if(e.target.type  === "email" ){
            setError('In valid EMail');
            return;
        }
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${host}/UserTable/save.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (result.message) {
                setSuccess(result.message);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(result.error || 'Failed to create user');
            }
        } catch (error) {
            setError('An error occurred while creating user');
        }
    };

    const handleBackClick = () => navigate('/user');

    return (
        <>
            <NavBar />
            <br/>
            <div className="container mb-3" style={{ maxWidth: "700px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                <form>
                <center> <h1 style={{backgroundColor:'blue' , borderRadius:'10px', color:'white'}}>User</h1>
                <p className="lead">Sign Up Page for User.</p></center>
                    {/* <img src="../hrlineimg.png" className="img-fluid d-flex justify-content-center gap-2" alt="..."></img> */}
                    <br/>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" type='email' className="col-sm-3 col-form-label"  >Email</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" value={email} onChange={handleEmailChange} placeholder="Enter User Email" id="inputEmail3" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword4" className="col-sm-3 col-form-label">New Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" value={password} onChange={handlePasswordChange} placeholder="Enter New Password" id="inputPassword4" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword5" className="col-sm-3 col-form-label">Confirm Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" value={confirmPassword} onChange={confirmPasswordChange} placeholder='Confirm the New Password' id="inputPassword5" required/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button type="submit" className="btn btn-primary" onClick={handleResetClick}>Sign Up</button> 
                        <button type="button" className="btn btn-primary" onClick={handleBackClick}>Back</button> 
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                </form>
            </div>
        </>
    );
}

export default UserCreateAccount;
