import { useState, useEffect, useRef } from 'react';
const MainTable = () => {
  // const host = 'https://office-project.infinityfreeapp.com';
  const host = 'http://localhost';
  
  const [data, setData] = useState([]); // Store the data from the backend
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const rowRef = useRef();
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
 
    
  const highlightText = (rowIndex,text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <>
        <span key={index} style={{ 
         backgroundColor: 'yellow', 
         fontSize: '1.2em',  // Increase font size
         padding: '.2em', 
         transform: 'scale(1.1)' // Optionally, scale up the text slightly
        }}>
  {part}
</span>

        </>

      ) : (
        part
      )
    );
  };
  const isRowHighlighted = (row) => {
    // Ensure searchTerm is not null or empty before highlighting
    if (!searchTerm) return false;
  
    // Ensure the row is valid
    if (!row || !Array.isArray(row)) return false;
  
    // Check if any cell matches the searchTerm
    return row.some(cell =>
      cell?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  
  const scrollToRow = () => {
    
    if (rowRef.current) {
      rowRef.current.scrollIntoView({
        behavior: 'smooth', // Smooth scroll
        block: 'center', // Center the row in the viewport
      });
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    scrollToRow();
  };
  

  
  // Fetch data from the backend on component mount
  useEffect(() => {
    // Make an API call to the backend to fetch the data
    fetch(`${host}/test/getdata.php`)
      .then((response) => response.json()) // Assuming the server returns a JSON response
      .then((responseData) => {
        setData(responseData); // Set the fetched data in the state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

 
 

  const handleSave = () => {
    const rowData = data[editingRow];
    const deviceId = rowData[0]; // ID should be in the first column
    setIsAddButtonDisabled(false);
    // First, delete the existing row from the database
    fetch(`${host}/test/delete.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: deviceId }).toString(),
    })
      .then((response) => response.text())
      .then(() => {
        const payload = {
          person: rowData[1],
          device_type: rowData[2],
          os: rowData[3],
          processor: rowData[4],
          ram: rowData[5],
          hard_drive_capacity: rowData[6],
          keyboard_status: rowData[7],
          mouse_status: rowData[8],
          network_connectivity: rowData[9],
          printer_connectivity: rowData[10],
          virus_guard: rowData[11],
          ip_address: rowData[12],
          monitor: rowData[13],
          cpu: rowData[14],
          laptop: rowData[15],
          purchase_date: rowData[16],
          section: rowData[17],
        };

        // Send the updated data to the backend
        fetch(`${host}/test/save.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(payload).toString(),
        })
          .then((response) => response.json())
          .then((responseData) => {
            const newId = responseData.id; // Get the new ID from the response
            const updatedData = [...data];
            updatedData[editingRow][0] = newId; // Update the ID in the row data
            setData(updatedData);
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

  const handleEditClick = (rowIndex) => {
    
    setEditingRow(rowIndex);

  };

  const handleAddEmptyRow = () => {
    setSelectedCategory('ALL');
    const newRow = [null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    const newData = [...data, newRow];
    setData(newData);
    setEditingRow(newData.length - 1); // Set the new row as editable
    setIsAddButtonDisabled(true);
    
    // Scroll to the newly added row
    setTimeout(() => {
      if (rowRef.current) {
        rowRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100); // Use a slight delay to ensure the row is rendered before scrolling
  };
  

  const handleDeleteRow = (rowIndex) => {
    const rowData = data[rowIndex];
    const deviceId = rowData[0];

    fetch(`${host}/test/delete.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: deviceId }).toString(),
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
        case 2:
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
                 <option>Server</option>
                 <option>Desktop</option>
              <option>Laptop</option>
              {/* <option>Printer</option>
              <option>Photocopy Machine</option>
              <option>Line Printer</option>
              <option>Fax</option>
              <option>Scanner</option>
              <option>Projector</option>
              <option>TV</option>
              <option>UPS</option> */}
            </select>
          );
        case 16: // Purchase Date
          return <input type="date" value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />;
        case 7: // Keyboard Status
        case 8: // Mouse Status
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
              <option>Working</option>
              <option>Not Working</option>
            </select>
          );
          case 9: // Printer Connectivity
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
              <option>Connected</option>
              <option>Disconnected</option>
            </select>
          );
        case 10: // Printer Connectivity
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
              <option>Connected</option>
              <option>Disconnected</option>
            </select>
          );
        case 11: // Virus Guard
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
              <option>Select Option</option>
              <option>Installed</option>
              <option>Not Installed</option>
            </select>
          );
        case 17: // Section
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
              <option>Select Option</option>
              <option>Manager</option>
              <option>Engineer</option>
              <option>Account</option>
              <option>Commercial</option>
              <option>Supply</option>
              <option>HR</option>
              <option>Sociologist</option>
              <option>Workshop</option>
              <option>IT</option>
              <option>Reception</option>
              <option>OM</option>
              <option>Audit</option>
              <option>LAB</option>
            </select>
          );
        default:
          return <input type="text" value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />;
      }
    }
    // return <span>{cell}</span>;
    return <span>{highlightText(rowIndex,cell, searchTerm)}</span>;

  };

  return (
    <>
    {/* End of the search bar */}
      <div className="content-right" style={{ marginLeft: '0px', marginTop: '10px' }}>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" style={{ padding: '4px 8px', fontSize: '15px', marginRight: '5px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {'FILTER: ' + selectedCategory  || 'FILTER: ALL'}
          </button>
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" onClick={() => handleCategorySelect('ALL')}>ALL</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Manager')}>Manager</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Engineer')}>Engineer</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Account')}>Account Section</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Commercial')}>Commercial Section</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Supply')}>Supply Section</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('HR')}>Human Resources</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Sociologist')}>Sociologist</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Workshop')}>Workshop</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('IT')}>IT Branch</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Reception')}>Reception</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('OM')}>O & M</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('Audit')}>Audit Branch</a></li>
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('LAB')}>LAB</a></li>
          </ul>
          <button onClick={handleAddEmptyRow} disabled={isAddButtonDisabled} className="btn btn-primary" style={{ margin: '5px',marginRight: '100px', padding: '4px 8px', fontSize: '15px' }}>ADD DATA</button>
          <div className="input-group mb-2" >
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, name, or field..."
                value={searchTerm}
                onChange={handleSearch}
             />       
        </div>
        </div>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <table className="table border table-hover table-bordered text-center" style={{ fontSize: '13.5px', width: '100%'}}>
      <thead className="table-dark">
        <tr>
                <th>#</th>
                <th>PERSON</th>
                <th>DEVICE TYPE</th>
                <th>OS</th>
                <th>PROCESSOR</th>
                <th>RAM</th>
                <th>HARD DRIVE CAPACITY</th>
                <th>KEYBOARD STATUS</th>
                <th>MOUSE STATUS</th>
                <th>NETWORK CONNECTIVITY</th>
                <th>PRINTER Connectivity</th>
                <th>VIRUS GUARD</th>
                <th>IP ADDRESS</th>
                <th>MONITOR</th>
                <th>CPU</th>
                <th>LAPTOP</th>
                <th>PURCHASE DATE</th>
                <th>SECTION</th>
                <th>ACTION</th> 
            </tr>
          </thead>
          <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan="20" className="text-center">
        No Data Available 
      </td>
    </tr>
  ) : (
    data
    .filter((row) => !selectedCategory || row[17] === selectedCategory || selectedCategory === 'ALL')
    
    .map((row, rowIndex) => (
      <tr
      key={rowIndex}
      className={rowIndex === selectedRow ? 'selected-row' : ''}
      onClick={() => handleRowClick(rowIndex)} 
      ref={rowRef}
    >
    
    <td>{rowIndex + 1}</td>
{row.map((cell, colIndex) => {
  // Skip the empty column (assuming colIndex 0 is empty or for the index)
  if (colIndex !== 0) {
    return (
      <td key={colIndex} style={isRowHighlighted(row) ? { backgroundColor: 'yellow' } : {backgroundColor:'white'}}>
        {renderCell(cell, rowIndex, colIndex)}
      </td>
    );
  }
  return null; // Return null for skipped columns (index 0)
})}

          <td>
            {editingRow === rowIndex ? (
              <button
                onClick={handleSave}
                className="btn btn-success"
                hidden={selectedCategory && selectedCategory !== 'ALL'} // Button will be hidden if a filter is active
                style={{ padding: '2px 5px', fontSize: '12px', marginRight: '5px' }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(rowIndex)}
                className="btn btn-primary"
                hidden={selectedCategory && selectedCategory !== 'ALL'} // Button will be hidden if a filter is active
                style={{ padding: '2px 5px', fontSize: '12px', marginRight: '5px' }}
              >
                
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteRow(rowIndex)}
              className="btn btn-danger"
              hidden={selectedCategory && selectedCategory !== 'ALL'} // Button will be hidden if a filter is active
              style={{ padding: '2px 5px', fontSize: '12px' }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
  )}
</tbody>
        </table>
      </div>
    </>
  );
  
};
export default MainTable;
