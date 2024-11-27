import React, { useState } from 'react';

const DataInsertForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInsert = () => {
    // Insert data logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Data Insert Form</h2>
      <form>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter Username" 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter Password" 
          />
        </div>
        <div>
          <button type="button" onClick={handleInsert}>Insert</button>
          <button type="button" onClick={handleClose}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default DataInsertForm;
