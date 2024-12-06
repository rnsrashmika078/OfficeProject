import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import MainTable from './MainTable';
import { useNavigate } from 'react-router-dom';
import './printerbutton.css';
import PrinterTable from './PrinterTable';
import OtherTable from './OtherTable';
import UPSTable from './UPSTable';
import SummaryTable from './SummaryTable';
import DatabaseSelection from './DatabaseSelection';
import RepairTable from './RepairTable';

const RMOffice = ({host}) => {
    const Navigate = useNavigate();
    
    // State to keep track of the selected component
    const [selectedComponent, setSelectedComponent] = useState('Branch'); // Default to 'Branch'

    // Function to handle button clicks
    const handleOnClick = (componentName) => {
        setSelectedComponent(componentName);  // Update the state to reflect the active component
        localStorage.setItem('selectedComponent', componentName); // Save to localStorage

    };

    useEffect(() => {
        // Retrieve the value from localStorage on component mount
        const savedComponent = localStorage.getItem('selectedComponent');
        if (savedComponent) {
            setSelectedComponent(savedComponent);
        }
    }, []); // Empty dependency array to run only once

   const[ hide , sethide] = useState(false);
    const handleoffcanvas = () =>{
        sethide(!hide);
    }
    return (
        <>
            <NavBar header="ADMIN DASHBOARD" subheader="RM Office Bandarawela"/>
            <div className="container-fluid">
            <center><div style={{display:'flex', width:'100%', padding:'10px'}} className="tables">
                   <hr />
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
                  
               </center>
                {/* Content on the right of the Offcanvas */}
                <hr />
                <div className="content-right" style={{marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <MainTable host={host}/>}
                    {selectedComponent === 'Printers' && <PrinterTable host={host} style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'UPS' && <UPSTable host={host}/>}
                    {selectedComponent === 'Others' && <OtherTable host={host}/>}
                    {selectedComponent === 'Summary' && <SummaryTable host={host}/>}
                    {selectedComponent === 'repair' && <RepairTable host={host}/>}
                    {/* {selectedComponent === null && <DatabaseSelection />} */}
                    {selectedComponent === 'Hardware' && <OtherTable host={host}/>} {/* Or another table for Hardware */}
                </div>
            <hr />
            </div>
        </>
    );
}

export default RMOffice
