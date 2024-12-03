import { useState, useEffect, useRef } from 'react';

const HardwarePrinterTable = () => {
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
    fetch(`${host}/test/Hardware/Other/getdata.php`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData); // Set the fetched data in the state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = () => {
    const rowData = data[editingRow];
    const printerId = rowData[0]; // Assuming ID is in the first column
    setIsAddButtonDisabled(false);
    // Delete the existing row from the database
    fetch(`${host}/test/Hardware/Other/delete.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: printerId }).toString(),
    })
      .then((response) => response.text())
      .then(() => {
        // Update with the new data
        const payload = {
          serial_no: rowData[1],
          rvpn_user: rowData[2],
          employee_no: rowData[3],
          designation: rowData[4],
          working_location: rowData[5],
          code: rowData[6],
          serial_no_RVPN: rowData[7],
          rvpn_username: rowData[8],
          connection_required: rowData[9], // yes or no
          branch: rowData[10], // yes or no
         
        };

        // Send the updated data to the backend
        fetch(`${host}/test/Hardware/Other/save.php`, {
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
    const newRow = [null, '', '', '', '','','','','','',''];
    setIsAddButtonDisabled(true);
    const newData = [...data, newRow];
    setData(newData);
    setEditingRow(newData.length - 1);
    
    setTimeout(() => {
      if (rowRef.current) {
        rowRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100);// Set the new row as editable
  };

  const handleDeleteRow = (rowIndex) => {
    const rowData = data[rowIndex];
    const printerId = rowData[0]; // ID should be in the first column

    fetch(`${host}/test/Hardware/Other/delete.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: printerId }).toString(),
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
        case 10: // Section
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
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
          case 9: // Mouse Status
          return (
            <select value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}>
                 <option>Select Option</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          );
        default:
          return <input type="text" value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />;

      }
      
    }
    return <span>{highlightText(rowIndex,cell, searchTerm)}</span>;
  };

  return (
    <>
      <div className="content-right" style={{ marginLeft: '0px', marginTop: '10px' }}>
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
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('GIRADURU KOTTE WSS')}>GIRADURU KOTTE WSS</a></li>
          </ul>
          <button onClick={handleAddEmptyRow} disabled={isAddButtonDisabled} className="btn btn-primary" style={{ margin: '5px', marginRight: '100px', padding: '4px 8px', fontSize: '15px' }}>ADD DATA</button>
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
        <table className="table border table-hover table-bordered text-center" style={{ fontSize: '13.5px', width: '100%' }}>
        <thead className="table-dark">            <tr>
              <th>#</th> {/* Row number column */}
              <th>Serial No</th>
              <th>RVPN User</th>
              <th>Employee Number</th>
              <th>Designation</th>
              <th>Working Location</th>
              <th>Code</th>
              <th>RVPN Connection S/No</th>
              <th>RVPN Connection Username</th>
              <th>Required</th> 
              <th>Branch</th> 
              <th>Action</th> 
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
    .filter((row) => !selectedCategory || row[10] === selectedCategory || selectedCategory === 'ALL')
    
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

export default HardwarePrinterTable;
