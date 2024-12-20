import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import Message from './Message';

function AdminLog({host}) {
    const[adminlogtoken,setadminlogToken] = useState(0);
    useEffect(() => {
        const storedToken = localStorage.getItem('adminlogtoken');
        setadminlogToken(storedToken);
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [isclicked,setisClicked] = useState(false);

    const handleemailChange = (e) => {
        setEmail(e.target.value);
        localStorage.setItem('username',e.target.value);
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
        try {
            const response = await fetch(`${host}/AdminTables/login.php`, {
           
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json(); 
          
    
            if (data.success) {
                setadminlogToken(1);
                localStorage.setItem('adminlogtoken',1);
                // setisClicked(true);
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
             <Message msgbody="You are not logged in"/>
            <NavBar header="" subheader=""/>
            <br />
            {adminlogtoken > 0 && !(localStorage.getItem('userlogtoken') > 0)? (
            navigate('/admin/dashboard')
            ) : (
                
                <div className="container mb-3" style={{ maxWidth: "500px", border: "1px solid black", padding: "20px", borderRadius: "8px"  }}>
                <form>
                   <center> <h1 style={{backgroundColor:'blue' , borderRadius:'10px', color:'white'}}>Administration</h1>
                    <h5 className="">Login Page for Administration.</h5></center>
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
            )}
              
        </>
    );
}

export default AdminLog;
