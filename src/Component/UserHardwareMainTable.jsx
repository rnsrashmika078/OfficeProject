import { useState, useEffect } from 'react';

const UserHardwareMainTable = () => {
  const host = 'http://localhost';
  const [data, setData] = useState([]); // Store the data from the backend
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState("");
  const [datalength,setdataLength] = useState(0);



  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
   
  };

  const filteredData = data.filter((row) => {
    return Object.values(row).some((cell) =>
      cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Check if cell is not null/undefined
    );
  });
  
  
  // Fetch data from the backend on component mount
  useEffect(() => {
    fetch(`${host}/test/Hardware/MainTable/getData.php`)
    
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Fetched Data:', responseData); // Debug log
        setData(responseData); // Set the fetched data in the state
        setdataLength(data.length);
      })

    
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  useEffect(() => {
    
    console.log('Data after fetch:', data);

    // alert(data.length)
    
  }, [data]);
  

  const handleSave = () => {
    const rowData = data[editingRow];
    const upsId = rowData[0]; // Assuming ID is in the first column
    setIsAddButtonDisabled(false);

    // Delete the existing row from the database
    fetch('http://localhost/test/Hardware/MainTable/delete.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: upsId }).toString(),
    })
      .then((response) => response.text())
      .then(() => {
        // Update with the new data
        const payload = {
          Person: rowData[1],
          DeviceType: rowData[2],
          OperatingSystem: rowData[3],
          Processor: rowData[4],
          RAM: rowData[5],
          HardDiskCapacity: rowData[6],
          KeyboardStatus: rowData[7],
          MouseStatus: rowData[8],
          NetworkConnectivity: rowData[6],
          PrinterConnectivity: rowData[7],
          VirusGuard: rowData[8],
          IPAddress: rowData[9],
          Monitor: rowData[10],
          CPU: rowData[11],
          Laptop: rowData[12],
          PurchaseDate: rowData[13],
          Branch: rowData[14],
        };

        // Send the updated data to the backend
        fetch('http://localhost/test/Hardware/MainTable/save.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(payload).toString(),
        })
          .then((response) => response.json())
          .then((responseData) => {
            const newId = responseData.id; // Get the new ID from the response

            // Update the data state with the new ID
            const updatedData = [...data];
            updatedData[editingRow][0] = newId; // Update the ID in the row data
            setData(updatedData);
            // alert(updatedData);
            setEditingRow(null); // Exit edit mode
          })
          .catch((error) => console.error('Error saving new data:', error));
      })
      .catch((error) => console.error('Error deleting old row:', error));
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setData(updatedData);
  };

  const handleAddEmptyRow = () => {
    setSelectedCategory('ALL');
    const newRow = [null, '', '','', '','','','','','','','','','','','','',''];
    const newData = [...data, newRow];
    setIsAddButtonDisabled(true);
    setData(newData);
    setEditingRow(newData.length - 1); // Set the new row as editable
  };

  const handleDeleteRow = (rowIndex) => {
    const rowData = data[rowIndex];
    const OtherId = rowData[0]; // ID should be in the first column

    fetch('http://localhost/test/Hardware/MainTable/delete.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: OtherId }).toString(),
    })
      .then((response) => response.text())
      .then(() => {
        const updatedData = data.filter((_, index) => index !== rowIndex);
        setData(updatedData);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  const renderCell = (cell, rowIndex, colIndex) => {
    if (colIndex === 0) {
      return null; // Return nothing for the ID column
    }
    if (editingRow === rowIndex) {
      switch (colIndex) {
        case 0:
          return <span>{cell}</span>; // ID is just plain text
          case 17: // Section
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
            <option >Ettampitiya WSS</option>
            <option >Keppetipola WSS</option>
            <option >Divithotawela WSS</option>
            <option >Ambagasdowa WSS</option>
            <option >Welimada WSS</option>
            <option >Diyathalawa WSS</option>
            <option >Bandarawela WSS</option>
            <option >Makulella WSS</option>
            <option >Demodara WTP</option>
            <option >Badulla DE Office</option>
            <option >Badulla WSS</option>
            <option >Mahiyanganaya WSS</option>
            <option >GIRADURU KOTTE WSS</option>
          </select>
          
          );
          case 2:
            return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
                 <option>Server</option>
                 <option>Desktop</option>
              <option>Laptop</option>
              <option>Printer</option>
              <option>Photocopy Machine</option>
              <option>Line Printer</option>
              <option>Fax</option>
              <option>Scanner</option>
              <option>Projector</option>
              <option>TV</option>
              <option>UPS</option>
            </select>
          );
        default:
          return <input type="text" value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />;
      }
    }
    return <span>{cell}</span>;
  };

  return (
    <>
        <div className="content-right" style={{ marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}}>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" style={{ padding: '4px 8px', fontSize: '15px', marginRight: '5px' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {'FILTER: ' + selectedCategory  || 'FILTER: ALL'}
          </button>
          <ul className="dropdown-menu">
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('ALL')}>ALL</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Ettampitiya WSS')}>Ettampitiya WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Keppetipola WSS')}>Keppetipola WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Divithotawela WSS')}>Divithotawela WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Ambagasdowa WSS')}>Ambagasdowa WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Welimada WSS')}>Welimada WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Diyathalawa WSS')}>Diyathalawa WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Bandarawela WSS')}>Bandarawela WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Makulella WSS')}>Makulella WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Demodara WTP')}>Demodara WTP</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Badulla DE Office')}>Badulla DE Office</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Badulla WSS')}>Badulla WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Mahiyanganaya WSS')}>Mahiyanganaya WSS</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Giraduru Kotte WSS')}>Giraduru Kotte WSS</a></li>
</ul>
        </div>
        <div className="input-group mb-2 mt-2" >
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, name, or field..."
                value={searchTerm}
                onChange={handleSearch}
             />       
        </div>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table className="table border table-hover table-bordered text-center" style={{ fontSize: '13.5px', width: '100%' }}>
        <thead className="table-dark">            <tr>
              <th>#</th> {/* Row number column */}
              <th>Person</th>
              <th>Device Type</th>
              <th>Operating System</th>
              <th>Processor</th>
              <th>RAM</th>
              <th>HardDisk Capacity</th>
              <th>Keyboard Status</th>
              <th>Mouse Status</th>
              <th>Network Connectivity</th>
              <th>Printer Connectivity</th>
              <th>Virus Guard</th>
              <th>IP Address</th>
              <th>Monitor</th>
              <th>CPU</th>
              <th>Laptop</th>
              <th>Purchase Date</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan="15" className="text-center">
        No Data Available
      </td>
    </tr>
  ) : (
    filteredData
      .filter((row) => !selectedCategory || row[17] === selectedCategory || selectedCategory === 'ALL') // Filter rows by selected category
      .map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={rowIndex === selectedRow ? 'selected-row' : ''}
          onClick={() => handleRowClick(rowIndex)}
        >
          <td>{rowIndex + 1}</td>
          {row.map((cell, colIndex) => {
            // Skip the empty column
            if (colIndex !== 0) {
              return <td key={colIndex}>{renderCell(cell, rowIndex, colIndex)}</td>;
            }
          })}
        </tr>
      ))
  )}
</tbody>
        </table>
      </div>
    </>
  );
};

export default UserHardwareMainTable;
