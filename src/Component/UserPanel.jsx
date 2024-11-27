import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './printerbutton.css';
import UserMainTableView from './UserMainTableView';
import UserPrinterTableView from './UserPrinterTableView';
import UserOtherTableView from './UserOtherTableView';
import UserUPSTableView from './UserUPSTableView';
import UserSummaryTableView from './UserSummaryTableView';

const UserPanel = () => {
    const Navigate = useNavigate();
    
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleOnClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <>
            <NavBar />
             <div className="container-fluid">
            
                <div className="offcanvas offcanvas-start show" style={{ fontSize:'10px', maxWidth: "100px", border: ".5px solid #ccc", marginTop: "60px", marginBottom: "20px", padding: "5px", borderRadius: "8px", backgroundColor: "black", color: "white" }} tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasLabel"></h5>
                    </div>

                    <div className="offcanvas-body">
                        <hr />
                        <div className="tab-content mt-3" id="myTabContent">
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Branch' ? '#007bff' : '', color: selectedComponent === 'Branch' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Branch')}
                            >
                                MAIN TABLES
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
                                OTHER TABLES
                            </button>
                          
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Summary' ? '#007bff' : '', color: selectedComponent === 'Summary' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Summary')}
                            >
                                SUMMARY TABLE
                            </button>
                        </div>
                    </div>
                </div>
                {/* Content on the right of the Offcanvas */}
                <div className="content-right" style={{ marginLeft: "125px", marginTop: "10px", border: '2px solid black', textAlign:'center', color: 'yellow', backgroundColor:'Black'}}>
                    <h2>USER DASHBOARD </h2>
                </div>

                <hr />

                <div className="content-right" style={{ marginLeft: "125px", marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <UserMainTableView />}
                    {selectedComponent === 'Printers' && <UserPrinterTableView style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'UPS' && <UserUPSTableView />}
                    {selectedComponent === 'Others' && <UserOtherTableView />}
                    {selectedComponent === 'Summary' && <UserSummaryTableView />}
                    {selectedComponent === null && <UserMainTableView />} {/* Default view */}
                </div>
            </div>
            <hr />
        </>
    );
}

export default UserPanel;
