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
import RepairTable from './RepairTable';

const RMOffice = () => {
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
                                SUMMARY TABLE
                            </button>
                        </div>
                    </div>
                </div>
                {/* Content on the right of the Offcanvas */}
                <div className="content-right" style={{ marginLeft: "100px", marginTop: "10px", border: '2px solid black', textAlign:'center', color: 'white', backgroundColor:'black'}}>
                    <h2>ADMIN DASHBOARD </h2>
                    <h5>RM Office Bandarawela</h5>
                </div>
                <hr />
                <div className="content-right" style={{ marginLeft: "100px", marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <MainTable />}
                    {selectedComponent === 'Printers' && <PrinterTable style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'UPS' && <UPSTable />}
                    {selectedComponent === 'Others' && <OtherTable />}
                    {selectedComponent === 'Summary' && <SummaryTable />}
                    {selectedComponent === 'repair' && <RepairTable />}
                    {/* {selectedComponent === null && <DatabaseSelection />} */}
                    {selectedComponent === 'Hardware' && <OtherTable />} {/* Or another table for Hardware */}
                </div>
            </div>
            <hr />
        </>
    );
}

export default RMOffice