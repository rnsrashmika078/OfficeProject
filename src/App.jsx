import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLog from './Component/AdminLog.jsx';
import Reset from './Component/Reset.jsx';
import HomePage from './Component/HomePage.jsx';
import AdminDashboard from './Component/AdminDashboard.jsx';
import PrinterTable from './Component/PrinterTable.jsx';
import CreateAccount from './Component/CreateAccount.jsx';
import UserPanel from './Component/UserPanel.jsx';
import RMOffice from './Component/RMOffice.jsx';
import Hardware from './Component/Hardware.jsx';
import UserRMOffice from './Component/UserRMOffice.jsx';
import UserDatabaseSelection from './Component/UserDatabaseSelection.jsx';
import UserHardware from './Component/UserHardware.jsx';
import Test from './Component/Test.jsx';
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';

function App() {
  return (
    <>
    {/* <Header/> */}
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLog />} />
        {/* <Route path="/admin" element={<Test />} /> */}
        <Route path="/admin/reset" element={<Reset />} />
        <Route path="/admin/createaccount" element={<CreateAccount />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/printer" element={<PrinterTable />} />
        <Route path="/users" element={<UserDatabaseSelection />} />
        <Route path="/users/dashboard/rmoffice" element={<UserRMOffice />} />
        <Route path="/users/dashboard/hardware" element={<UserHardware />} />
        <Route path="/admin/dashboard/rmoffice" element={<RMOffice />} />
        <Route path="/admin/dashboard/hardware" element={<Hardware />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
