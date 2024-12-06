import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import NavBar from './NavBar';
import { useState ,useEffect } from 'react';
import MainTable from './MainTable';
import { useNavigate } from 'react-router-dom';
import './printerbutton.css';
import PrinterTable from './PrinterTable';
import OtherTable from './OtherTable';
import UPSTable from './UPSTable';
import SummaryTable from './SummaryTable';
import HardwareMainTable from './HardwareMainTable';
import HardwarePrinterTable from './HardwarePrinterTable';
import HardwareOther from './HardwareOther';
import NetworkTable from './NetworkTable';
import HardwareVirusGuard from './HardwareVirusGuard';
import HardwareSummaryTable from './HardwareSummaryTable';

const Hardware = ({host}) => {
    const Navigate = useNavigate();
    
    // State to keep track of the selected component
    const [selectedComponent, setSelectedComponent] = useState('Branch'); // Default to 'Branch'

    // Function to handle button clicks
    const handleOnClick = (componentName) => {
        setSelectedComponent(componentName);  // Update the state to reflect the active component
        localStorage.setItem('divisional', componentName); // Save to localStorage

    };
    useEffect(() => {
        // Retrieve the value from localStorage on component mount
        const savedComponent = localStorage.getItem('divisional');
        if (savedComponent) {
            setSelectedComponent(savedComponent);
        }
    }, []); // Empty dependency array to run only once
    return (
        <>
            <NavBar header="ADMIN DASHBOARD" subheader="Divisional Site Details"/>
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
                            <button 
                                className='printer-button' 
                                style={{ backgroundColor: selectedComponent === 'Summary' ? '#007bff' : '', color: selectedComponent === 'Summary' ? 'white' : '' }} 
                                onClick={() => handleOnClick('Summary')}
                            >
                                SUMMARY
                            </button>
                            <hr />
                      </div>
               
                  </center>
                <hr />
                <div className="content-right" style={{ marginTop: "10px" }}>
                    {selectedComponent === 'Branch' && <HardwareMainTable host={host}/>}
                    {selectedComponent === 'VirusGuard' && <HardwareVirusGuard host={host} style={{ marginLeft: '0px', marginTop: '10px' }} />}
                    {selectedComponent === 'Printers' && <HardwarePrinterTable host={host}/>}
                    {selectedComponent === 'Others' && <HardwareOther host={host}/>}
                    {selectedComponent === 'Summary' && <HardwareSummaryTable host={host}/>}
            </div>
            </div>
                 <hr />
        </>
    );
}

export default Hardware;
