import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './printerbutton.css';
import UserHardwareMainTable from './UserHardwareMainTable';
import UserVirusGuard from './UserVirusGuard';
import UserHardwarePrinterTable from './UserHardwarePrinterTable';
import UserHardwareOther from './UserHardwareOther';
import UserHardwareNetwork from './UserHardwareNetwork';

const UserHardware = () => {
    const Navigate = useNavigate();
    
    // State to keep track of the selected component
    const [selectedComponent, setSelectedComponent] = useState('Branch'); // Default to 'Branch'

    // Function to handle button clicks
    const handleOnClick = (componentName) => {
        setSelectedComponent(componentName);  // Update the state to reflect the active component
    };
   
    return (
        <>
            <NavBar />
            <div className="container-fluid">
            
            <div className="offcanvas offcanvas-start show" style={{ fontSize:'10px', maxWidth: "100px", border: ".5px solid #ccc", marginTop: "100px", marginBottom: "20px", padding: "5px", borderRadius: "8px", backgroundColor: "black", color: "white" }} tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
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
                                DEVICE INFO
                            </button>
                            <hr />
                            {/* <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'network' ? '#007bff' : '', color: selectedComponent === 'network' ? 'white' : '' }} 
                                onClick={() => handleOnClick('network')}
                            >
                                NETWORK INFO
                            </button>
                            <hr /> */}
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'VirusGuard' ? '#007bff' : '', color: selectedComponent === 'VirusGuard' ? 'white' : '' }} 
                                onClick={() => handleOnClick('VirusGuard')}
                            >
                                VIRUS GUARD
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
                                style={{ backgroundColor: selectedComponent === 'Others' ? '#007bff' : '', color: selectedComponent === 'Others' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Others')}
                            >
                                OTHER TABLE
                            </button>
                            <hr />
                            {/* <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Hardware' ? '#007bff' : '', color: selectedComponent === 'Hardware' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Hardware')}
                            >
                                Hardware
                            </button>
                            <hr />
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Summary' ? '#007bff' : '', color: selectedComponent === 'Summary' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Summary')}
                            >
                                SUMMARY
                            </button> */}
                        </div>
                    </div>
                </div>
                {/* Content on the right of the Offcanvas */}
                <div className="content-right" style={{ marginLeft: "100px", marginTop: "10px", border: '2px solid black', textAlign:'center', color: 'white', backgroundColor:'black'}}>
                    <h2>USER DASHBOARD </h2>
                    <h5>DIVISIONAL SITE DETAILS</h5>
                </div>
                <hr />
                <div className="content-right" style={{ marginLeft: "100px", marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <UserHardwareMainTable />}
                    {/* {selectedComponent === 'network' && <UserHardwareNetwork />} */}
                    {selectedComponent === 'VirusGuard' && <UserVirusGuard style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'Printers' && <UserHardwarePrinterTable />}
                    {selectedComponent === 'Others' && <UserHardwareOther />}
                 
                </div>
            </div>
            <hr />
        </>
    );
}

export default UserHardware;
