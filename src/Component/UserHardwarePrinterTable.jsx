import { useState, useEffect } from 'react';

const UserHardwarePrinterTable = ({host}) => {
  // const host = 'http://officedatabase101.com.preview.services';
  

  const [data, setData] = useState([]); // Store the data from the backend
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState("");


  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
   
  };

  const filteredData = data.filter((row) => {
    return row.some((cell) =>
      cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Fetch data from the backend on component mount
  useEffect(() => {
    fetch(`${host}/Hardware/PrinterTable/getdata.php`)
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
    fetch(`${host}/Hardware/PrinterTable/delete.php`, {
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
          branch: rowData[1],
          make: rowData[2],
          model: rowData[3],
          s_no: rowData[4],
         
        };

        // Send the updated data to the backend
        fetch(`${host}/Hardware/PrinterTable/save.php`, {
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
    const newRow = [null, 'Branch 1', 'Make_01', 'Model-01', 'as12'];
    setIsAddButtonDisabled(true);
    const newData = [...data, newRow];
    setData(newData);
    setEditingRow(newData.length - 1); // Set the new row as editable
  };

  const handleDeleteRow = (rowIndex) => {
    const rowData = data[rowIndex];
    const printerId = rowData[0]; // ID should be in the first column

    fetch(`${host}/Hardware/PrinterTable/delete.php`, {
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
        case 1: // Section
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
            <li><a className="dropdown-item" onClick={() => handleCategorySelect('GIRADURU KOTTE WSS')}>GIRADURU KOTTE WSS</a></li>
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
        <thead className="table-dark">
          <tr>
              <th>#</th>
              <th>Branch</th>
              <th>Make</th>
              <th>Model</th>
              <th>Serial Number</th>
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
      .filter((row) => !selectedCategory || row[1] === selectedCategory || selectedCategory === 'ALL') // Filter rows by selected category
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

export default UserHardwarePrinterTable;
