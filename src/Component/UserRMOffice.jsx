import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useState } from 'react';
import MainTable from './MainTable';
import { useNavigate } from 'react-router-dom';
import './printerbutton.css';
import PrinterTable from './PrinterTable';
import OtherTable from './OtherTable';
import UPSTable from './UPSTable';
import SummaryTable from './SummaryTable';
import DatabaseSelection from './DatabaseSelection';
import UserMainTableView from './UserMainTableView';
import UserPrinterTableView from './UserPrinterTableView';
import UserUPSTableView from './UserUPSTableView';
import UserOtherTableView from './UserOtherTableView';
import UserSummaryTableView from './UserSummaryTableView';
import UserRepairTable from './UserRepairTable';

const UserRMOffice = ({host}) => {
    const Navigate = useNavigate();
    
    // State to keep track of the selected component
    const [selectedComponent, setSelectedComponent] = useState('Branch'); // Default to 'Branch'

    // Function to handle button clicks
    const handleOnClick = (componentName) => {
        setSelectedComponent(componentName);  // Update the state to reflect the active component
    };
   
    return (
        <>
            <NavBar header="USER DASHBOARD" subheader="Rm Office Bandarawela"/>
            <div className="container-fluid">

                 <center><div style={{display:'flex', width:'100%', padding:'10px'}} className="tables">
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Branch' ? '#007bff' : '', color: selectedComponent === 'Branch' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Branch')}
                            >
                                DEVICE INFO
                            </button>
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Printers' ? '#007bff' : '', color: selectedComponent === 'Printers' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Printers')}
                            >
                                PRINTER DEVICES
                            </button>
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'UPS' ? '#007bff' : '', color: selectedComponent === 'UPS' ? 'white' : '' }} 
                                onClick={() => handleOnClick('UPS')}
                            >
                                UPS DEVICES
                            </button>
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'repair' ? '#007bff' : '', color: selectedComponent === 'repair' ? 'white' : '' }} 
                                onClick={() => handleOnClick('repair')}
                            >
                                REPAIR DETAILS
                            </button>
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Others' ? '#007bff' : '', color: selectedComponent === 'Others' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Others')}
                            >
                                OTHER DEVICES
                            </button>
                          
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Summary' ? '#007bff' : '', color: selectedComponent === 'Summary' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Summary')}
                            >
                                SUMMARY
                            </button>
                        </div>
                        </center>  
                <hr />
                <div className="content-right" style={{ marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <UserMainTableView host={host}/>}
                    {selectedComponent === 'Printers' && <UserPrinterTableView host={host} style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'UPS' && <UserUPSTableView host={host}/>}
                    {selectedComponent === 'repair' && <UserRepairTable host={host}/>}
                    {selectedComponent === 'Others' && <UserOtherTableView host={host}/>}
                    {selectedComponent === 'Summary' && <SummaryTable host={host}/>}
                    
                </div>
            </div>
            <hr />
        </>
    );
}

export default UserRMOffice;
