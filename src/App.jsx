import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLog from './Component/AdminLog.jsx';
import Reset from './Component/Reset.jsx';
import HomePage from './Component/HomePage.jsx';
import AdminDashboard from './Component/AdminDashboard.jsx';
import PrinterTable from './Component/PrinterTable.jsx';
import AdminCreateAccount from './Component/AdminCreateAccount.jsx';
import UserPanel from './Component/UserPanel.jsx';
import RMOffice from './Component/RMOffice.jsx';
import Hardware from './Component/Hardware.jsx';
import UserRMOffice from './Component/UserRMOffice.jsx';
import UserDatabaseSelection from './Component/UserDatabaseSelection.jsx';
import UserHardware from './Component/UserHardware.jsx';
import Test from './Component/Test.jsx';
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';
import UserCreateAccount from './Component/UserCreateAccount.jsx';
import UserLog from './Component/UserLog.jsx';
import Message from './Component/Message.jsx';
import { useEffect, useState } from 'react';


function App() {
  // const host = 'http://192.168.43.110'; // change this accordingly

   
  // const host = 'http://172.20.10.2/NWSDB';
  const host = 'http://localhost/NWSDB';

  const [adminCount, setAdminCount] = useState(0); // To store the admin count
  const [userCount, setUserCount] = useState(0); // To store the user count

  useEffect(() => {
    fetch(`${host}/UserCount.php`)
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        setAdminCount(data.adminCount); // Set adminCount state
        setUserCount(data.userCount);   // Set userCount state
      })
      .catch(error => {
        console.log(error); // Handle errors
      });
  }, [host]); // Only re-run if `host` changes


  return (
  <>
     
    <Router>
      <Routes>
        <Route path="/" element={<HomePage host={host} />} />
        <Route path="/admin" element={<AdminLog host={host} />} />
        {/* <Route path="/user" element={<UserLog host={host} />} /> */}
        <Route path="/admin/reset" element={<Reset host={host}/>} />
        <Route path="/admin/createaccount" element={<AdminCreateAccount host={host} />} />
        {/* <Route path="/user/createaccount" element={<UserCreateAccount host={host} />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard host={host}/>} />
        <Route path="/admin/dashboard/printer" element={<PrinterTable host={host}/>} />
        <Route path="/users" element={<UserDatabaseSelection host={host}/>} />
        <Route path="/users/dashboard/rmoffice" element={<UserRMOffice host={host}/>} />
        <Route path="/users/dashboard/hardware" element={<UserHardware host={host}/>} />
        <Route path="/admin/dashboard/rmoffice" element={<RMOffice host={host}/>} />
        <Route path="/admin/dashboard/hardware" element={<Hardware host={host}/>} />
      </Routes>
    </Router>
      <div style={{
        backgroundColor:'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25px', // Adjust the height to avoid covering the full screen
        textAlign: 'center',
        width: '100%',
        color:'white',
        fontFamily:'sans-serif',
      }}>
        Registered Users: {userCount} | Registered Admins : {adminCount}
      </div>
    <Footer/>
    </>
  );
}

export default App;
