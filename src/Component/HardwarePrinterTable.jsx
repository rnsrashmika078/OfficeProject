import { useState, useEffect, useRef } from 'react';

const HardwarePrinterTable = ({host}) => {

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
    setSelectedCategory('ALL');
    const newRow = [null, '', '', '', ''];
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
    }, 100); // Set the new row as editable
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
                 <option>Select Option</option>
            <option >Ettampitiya</option>
            <option >Keppetipola</option>
            <option >Divithotawela</option>
            <option >Ambagasdowa</option>
            <option >Welimada</option>
            <option >Diyathalawa</option>
            <option >Bandarawela</option>
            <option >Makulella</option>
            <option >Demodara</option>
            <option >BadullaDE</option>
            <option >Badulla</option>
            <option >Mahiyanganaya</option>
            <option >GiraduruKotte</option>
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
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Ettampitiya')}>Ettampitiya</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Keppetipola')}>Keppetipola</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Divithotawela')}>Divithotawela</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Ambagasdowa')}>Ambagasdowa</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Welimada')}>Welimada</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Diyathalawa')}>Diyathalawa</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Bandarawela')}>Bandarawela</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Makulella')}>Makulella</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Demodara')}>Demodara</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('BadullaDE')}>BadullaDE</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Badulla')}>Badulla</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('Mahiyanganaya')}>Mahiyanganaya</a></li>
  <li><a className="dropdown-item" onClick={() => handleCategorySelect('GiraduruKotte')}>GiraduruKotte</a></li>
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
              <th>Branch</th>
              <th>Make</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Actions</th>
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
    .filter((row) => !selectedCategory || row[1] === selectedCategory || selectedCategory === 'ALL')
    
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
