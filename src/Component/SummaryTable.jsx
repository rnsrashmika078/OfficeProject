import { useState, useEffect } from 'react';

const SummaryTable = () => {
  const host = 'http://officedatabase101.com.preview.services';  

  const [data, setData] = useState([]); // Store the data from the backend
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');


  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const calculateTotal = (row) => {
    // Sum only the numeric columns (index 2 to 12)
    const numericColumns = row.slice(2, 13);  // This will include all columns from 2 to 12 (inclusive)
    
    // Calculate the total sum of the numeric columns
    const total = numericColumns.reduce((sum, value) => {
      // Ensure value is numeric, if not set it to 0
      return sum + (parseFloat(value) || 0); // Convert to number or 0 if not valid
    }, 0);
    
    return total;
  };
  const [error, setError] = useState([]);

  const [SummaryCategory, SetSummaryCategory] = useState([]);

  const [servervalues, setservervalues] = useState({
    managerServerCount: 0,
    engineerServerCount:0,
    accountServerCount:0,
    commercialServerCount: 0,
    supplyServerCount: 0,
    hrServerCount:0,
    sociologistServerCount:0,
    workshopServerCount: 0,
    itServerCount:0,
    receptionServerCount:0,
    omServerCount: 0,
    auditServerCount:0,
    labServerCount: 0,
    total:0
});
const [laptopvalues, setlaptopvalues] = useState({
  managerServerCount: 0,
    engineerServerCount:0,
    accountServerCount:0,
    commercialServerCount: 0,
    supplyServerCount: 0,
    hrServerCount:0,
    sociologistServerCount:0,
    workshopServerCount: 0,
    itServerCount:0,
    receptionServerCount:0,
    omServerCount: 0,
    auditServerCount:0,
    labServerCount: 0,
});
const [desktopvalues, setdesktopvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});
const [printervalues, setprintervalues] = useState({
  managerServerCount: 0,
    engineerServerCount:0,
    accountServerCount:0,
    commercialServerCount: 0,
    supplyServerCount: 0,
    hrServerCount:0,
    sociologistServerCount:0,
    workshopServerCount: 0,
    itServerCount:0,
    receptionServerCount:0,
    omServerCount: 0,
    auditServerCount:0,
    labServerCount: 0,
});
const [photocopyvalues,setphotocopyvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});

const [lineprintervalues,setlineprintervalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});

const [faxvalues,setfaxvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});
const [tvvalues,settvvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});

const [projectorvalues,setprojectorvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});
const [upsvalues,setupsvalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});

const [scannervalues,setscannervalues] = useState({
  managerServerCount: 0,
  engineerServerCount:0,
  accountServerCount:0,
  commercialServerCount: 0,
  supplyServerCount: 0,
  hrServerCount:0,
  sociologistServerCount:0,
  workshopServerCount: 0,
  itServerCount:0,
  receptionServerCount:0,
  omServerCount: 0,
  auditServerCount:0,
  labServerCount: 0,
});

//server
useEffect(() => {
  fetch(`${host}/test/SummaryTable/Custom_Server.php`)
    .then((response) => response.json())
    .then((responseData) => {
      const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

        setservervalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    });
}, []);

   //desktop
   useEffect(() => {
    // Make an API call to the backend to fetch the count data
    fetch(`${host}/test/SummaryTable/Custom_Desktop.php`)
      .then((response) => response.json()) // Assuming the server returns a JSON response
      .then((responseData) => {
        // Dynamically create the servervaluess state from the received data
        const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setdesktopvalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Optionally, set an error message
      });
  }, []);

     //laptop
     useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom_Laptop.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.managerServerCount) || 0) +
          (Number(responseData.engineerServerCount) || 0) +
          (Number(responseData.accountServerCount) || 0) +
          (Number(responseData.commercialServerCount) || 0) +
          (Number(responseData.supplyServerCount) || 0) +
          (Number(responseData.hrServerCount) || 0) +
          (Number(responseData.sociologistServerCount) || 0) +
          (Number(responseData.workshopServerCount) || 0) +
          (Number(responseData.itServerCount) || 0) +
          (Number(responseData.receptionServerCount) || 0) +
          (Number(responseData.omServerCount) || 0) +
          (Number(responseData.auditServerCount) || 0) +
          (Number(responseData.labServerCount) || 0);
  
        setlaptopvalues({
          managerServerCount: Number(responseData.managerServerCount) || 0,
          engineerServerCount: Number(responseData.engineerServerCount) || 0,
          accountServerCount: Number(responseData.accountServerCount) || 0,
          commercialServerCount: Number(responseData.commercialServerCount) || 0,
          supplyServerCount: Number(responseData.supplyServerCount) || 0,
          hrServerCount: Number(responseData.hrServerCount) || 0,
          sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
          workshopServerCount: Number(responseData.workshopServerCount) || 0,
          itServerCount: Number(responseData.itServerCount) || 0,
          receptionServerCount: Number(responseData.receptionServerCount) || 0,
          omServerCount: Number(responseData.omServerCount) || 0,
          auditServerCount: Number(responseData.auditServerCount) || 0,
          labServerCount: Number(responseData.labServerCount) || 0,
          total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);

    //printer
    useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom3_Printer.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.managerServerCount) || 0) +
          (Number(responseData.engineerServerCount) || 0) +
          (Number(responseData.accountServerCount) || 0) +
          (Number(responseData.commercialServerCount) || 0) +
          (Number(responseData.supplyServerCount) || 0) +
          (Number(responseData.hrServerCount) || 0) +
          (Number(responseData.sociologistServerCount) || 0) +
          (Number(responseData.workshopServerCount) || 0) +
          (Number(responseData.itServerCount) || 0) +
          (Number(responseData.receptionServerCount) || 0) +
          (Number(responseData.omServerCount) || 0) +
          (Number(responseData.auditServerCount) || 0) +
          (Number(responseData.labServerCount) || 0);
  
        setprintervalues({
          managerServerCount: Number(responseData.managerServerCount) || 0,
          engineerServerCount: Number(responseData.engineerServerCount) || 0,
          accountServerCount: Number(responseData.accountServerCount) || 0,
          commercialServerCount: Number(responseData.commercialServerCount) || 0,
          supplyServerCount: Number(responseData.supplyServerCount) || 0,
          hrServerCount: Number(responseData.hrServerCount) || 0,
          sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
          workshopServerCount: Number(responseData.workshopServerCount) || 0,
          itServerCount: Number(responseData.itServerCount) || 0,
          receptionServerCount: Number(responseData.receptionServerCount) || 0,
          omServerCount: Number(responseData.omServerCount) || 0,
          auditServerCount: Number(responseData.auditServerCount) || 0,
          labServerCount: Number(responseData.labServerCount) || 0,
          total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);
    

     //photocopy machine
     useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_Photocopy.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.managerServerCount) || 0) +
          (Number(responseData.engineerServerCount) || 0) +
          (Number(responseData.accountServerCount) || 0) +
          (Number(responseData.commercialServerCount) || 0) +
          (Number(responseData.supplyServerCount) || 0) +
          (Number(responseData.hrServerCount) || 0) +
          (Number(responseData.sociologistServerCount) || 0) +
          (Number(responseData.workshopServerCount) || 0) +
          (Number(responseData.itServerCount) || 0) +
          (Number(responseData.receptionServerCount) || 0) +
          (Number(responseData.omServerCount) || 0) +
          (Number(responseData.auditServerCount) || 0) +
          (Number(responseData.labServerCount) || 0);
  
        setphotocopyvalues({
          managerServerCount: Number(responseData.managerServerCount) || 0,
          engineerServerCount: Number(responseData.engineerServerCount) || 0,
          accountServerCount: Number(responseData.accountServerCount) || 0,
          commercialServerCount: Number(responseData.commercialServerCount) || 0,
          supplyServerCount: Number(responseData.supplyServerCount) || 0,
          hrServerCount: Number(responseData.hrServerCount) || 0,
          sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
          workshopServerCount: Number(responseData.workshopServerCount) || 0,
          itServerCount: Number(responseData.itServerCount) || 0,
          receptionServerCount: Number(responseData.receptionServerCount) || 0,
          omServerCount: Number(responseData.omServerCount) || 0,
          auditServerCount: Number(responseData.auditServerCount) || 0,
          labServerCount: Number(responseData.labServerCount) || 0,
          total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);


 //line printer
 useEffect(() => {
  // Make an API call to the backend to fetch the count data
  fetch(`${host}/test/SummaryTable/Custom4_Line.php`)
    .then((response) => response.json()) // Assuming the server returns a JSON response
    .then((responseData) => {
      // Dynamically create the servervaluess state from the received data
      const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setlineprintervalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
       
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setError('Error fetching data'); // Optionally, set an error message
    });
}, []);
     //fax machine
     useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_Fax.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setfaxvalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);

    //tv machine
    useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_TV.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      settvvalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);

    //projector machine
    useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_Projector.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setprojectorvalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);
  
    
    //ups machine
    useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_UPS.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setupsvalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total,
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);

     //Scanner
     useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/test/SummaryTable/Custom4_Scanner.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
        (Number(responseData.managerServerCount) || 0) +
        (Number(responseData.engineerServerCount) || 0) +
        (Number(responseData.accountServerCount) || 0) +
        (Number(responseData.commercialServerCount) || 0) +
        (Number(responseData.supplyServerCount) || 0) +
        (Number(responseData.hrServerCount) || 0) +
        (Number(responseData.sociologistServerCount) || 0) +
        (Number(responseData.workshopServerCount) || 0) +
        (Number(responseData.itServerCount) || 0) +
        (Number(responseData.receptionServerCount) || 0) +
        (Number(responseData.omServerCount) || 0) +
        (Number(responseData.auditServerCount) || 0) +
        (Number(responseData.labServerCount) || 0);

      setscannervalues({
        managerServerCount: Number(responseData.managerServerCount) || 0,
        engineerServerCount: Number(responseData.engineerServerCount) || 0,
        accountServerCount: Number(responseData.accountServerCount) || 0,
        commercialServerCount: Number(responseData.commercialServerCount) || 0,
        supplyServerCount: Number(responseData.supplyServerCount) || 0,
        hrServerCount: Number(responseData.hrServerCount) || 0,
        sociologistServerCount: Number(responseData.sociologistServerCount) || 0,
        workshopServerCount: Number(responseData.workshopServerCount) || 0,
        itServerCount: Number(responseData.itServerCount) || 0,
        receptionServerCount: Number(responseData.receptionServerCount) || 0,
        omServerCount: Number(responseData.omServerCount) || 0,
        auditServerCount: Number(responseData.auditServerCount) || 0,
        labServerCount: Number(responseData.labServerCount) || 0,
        total, // Use the calculated total
           
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data'); // Optionally, set an error message
        });
    }, []);


  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = () => {
    const rowData = data[editingRow];
    const deviceId = rowData[0]; // ID should be in the first column
    setIsAddButtonDisabled(false);
    // First, delete the existing row from the database
    fetch(`${host}/test/SummaryTable/delete.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: deviceId }).toString(),
    })
      .then((response) => response.text())
      .then(() => {
        // After deleting the old row, now update with the new data
        const payload = {
          Section: rowData[1],
          Regional_Manager: rowData[2],
          Regional_Engineer: rowData[3],
          Account_Section: rowData[4],
          Commercial_Section: rowData[5],
          Human_Resources: rowData[6],
          Sociologist: rowData[7],
          Workshop: rowData[8],
          IT_Branch: rowData[9],
          OM: rowData[10],
          Audit_Branch: rowData[11],
          Laboratory: rowData[12],
          Total: rowData[13],
        };

        // Send the updated data to the backend
        fetch(`${host}/test/SummaryTable/save.php`, {
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
  
    // Recalculate the total after updating a cell value
    if (colIndex >= 3 && colIndex <= 12) { // Assuming these columns are numeric
      const total = calculateTotal(updatedData[rowIndex]);
      updatedData[rowIndex][13] = total; // Update the total column
    }
  
    setData(updatedData);
  };
  

  const handleAddEmptyRow = () => {
    setSelectedCategory('ALL');
    const newRow = [null, 'Laptop', '', '','','', '', '', '','' ,'' ,'', '',''];
    const newData = [...data, newRow];
    setIsAddButtonDisabled(true);
    setData(newData);
    setEditingRow(newData.length - 1); // Set the new row as editable
  };

  const handleDeleteRow = (rowIndex) => {
    const rowData = data[rowIndex];
    const deviceId = rowData[0]; // ID should be in the first column

    fetch(`${host}/test/SummaryTable/delete.php`, {
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
    if (colIndex === 13) {
      return <span>{cell}</span>; // Return plain text for the 'Total' column
    }
    if (editingRow === rowIndex) {
      switch (colIndex) {
        case 0:
          return <span>{cell}</span>; // ID is just plain text
        // case 1: // Purchase Date
        //   return <input type="text" value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />;
        case 1:
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
    
      <div className="content-right" style={{ marginLeft: '0px', marginTop: '10px' }}>
        <div className="dropdown">
          {/* <button className="btn btn-secondary dropdown-toggle" style={{ padding: '4px 8px', fontSize: '15px', marginRight: '5px' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {'FILTER: ' + selectedCategory  || 'FILTER: ALL'}
          </button> */}
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
          {/* <button onClick={handleAddEmptyRow} disabled={isAddButtonDisabled} className="btn btn-primary" style={{ margin: '5px', marginRight: '100px', padding: '4px 8px', fontSize: '15px' }}>ADD DATA</button> */}
        </div>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
  <table className="table table-hover table-bordered text-center" style={{ fontSize: '13.5px', width: '100%' }}>
  <thead className="table-dark">
               <tr>
                <th>#</th>
                <th>SECTION</th>
                <th>Regional-Manager</th>
                <th>Regional-Engineer</th>
                <th>Account Section</th>
                <th>Commercial Section</th>
                <th>Supply Section</th>
                <th>Human Resources</th>
                <th>Sociologist</th>
                <th>Workshop</th>
                <th>IT Branch</th>
                <th>Reception</th>
                <th>O&M</th>
                <th>Audit Branch</th>
                <th>Laboratory</th>
                <th>Total</th>
            </tr>
          </thead>
          <tbody>
      <tr>
        <td>1</td>
        <td>SERVER</td>
        <td>{servervalues.managerServerCount}</td>
        <td>{servervalues.engineerServerCount}</td>
        <td>{servervalues.accountServerCount}</td>
        <td>{servervalues.commercialServerCount}</td>
        <td>{servervalues.supplyServerCount}</td>
        <td>{servervalues.hrServerCount}</td>
        <td>{servervalues.sociologistServerCount}</td>
        <td>{servervalues.workshopServerCount}</td>
        <td>{servervalues.itServerCount}</td>
        <td>{servervalues.receptionServerCount}</td>
        <td>{servervalues.omServerCount}</td>
        <td>{servervalues.auditServerCount}</td>
        <td>{servervalues.labServerCount}</td>
        <td>{servervalues.total ||0}</td>
    </tr>
       <tr>
        <td>2</td>
        <td>DESKTOP</td> 
        <td>{desktopvalues.managerServerCount}</td>
        <td>{desktopvalues.engineerServerCount}</td>
        <td>{desktopvalues.accountServerCount}</td>
        <td>{desktopvalues.commercialServerCount}</td>
        <td>{desktopvalues.supplyServerCount}</td>
        <td>{desktopvalues.hrServerCount}</td>
        <td>{desktopvalues.sociologistServerCount}</td>
        <td>{desktopvalues.workshopServerCount}</td>
        <td>{desktopvalues.itServerCount}</td>
        <td>{desktopvalues.receptionServerCount}</td>
        <td>{desktopvalues.omServerCount}</td>
        <td>{desktopvalues.auditServerCount}</td>
        <td>{desktopvalues.labServerCount}</td>
        <td>{desktopvalues.total ||0}</td>
      </tr>
       <tr>
        <td>3</td>
        <td>LAPTOP</td> 
        <td>{laptopvalues.managerServerCount}</td>
        <td>{laptopvalues.engineerServerCount}</td>
        <td>{laptopvalues.accountServerCount}</td>
        <td>{laptopvalues.commercialServerCount}</td>
        <td>{laptopvalues.supplyServerCount}</td>
        <td>{laptopvalues.hrServerCount}</td>
        <td>{laptopvalues.sociologistServerCount}</td>
        <td>{laptopvalues.workshopServerCount}</td>
        <td>{laptopvalues.itServerCount}</td>
        <td>{laptopvalues.receptionServerCount}</td>
        <td>{laptopvalues.omServerCount}</td>
        <td>{laptopvalues.auditServerCount}</td>
        <td>{laptopvalues.labServerCount}</td>
        <td>{laptopvalues.total || 0}</td>
      </tr>
      <tr>
        <td>4</td>
        <td>PRINTER</td>
        <td>{printervalues.managerServerCount}</td>
        <td>{printervalues.engineerServerCount}</td>
        <td>{printervalues.accountServerCount}</td>
        <td>{printervalues.commercialServerCount}</td>
        <td>{printervalues.supplyServerCount}</td>
        <td>{printervalues.hrServerCount}</td>
        <td>{printervalues.sociologistServerCount}</td>
        <td>{printervalues.workshopServerCount}</td>
        <td>{printervalues.itServerCount}</td>
        <td>{printervalues.receptionServerCount}</td>
        <td>{printervalues.omServerCount}</td>
        <td>{printervalues.auditServerCount}</td>
        <td>{printervalues.labServerCount}</td>
        <td>{printervalues.total || 0}</td>
      </tr>
      <tr>
        <td>5</td>
        <td>PHOTOCOPY MACHINE</td>
        <td>{photocopyvalues.managerServerCount}</td>
        <td>{photocopyvalues.engineerServerCount}</td>
        <td>{photocopyvalues.accountServerCount}</td>
        <td>{photocopyvalues.commercialServerCount}</td>
        <td>{photocopyvalues.supplyServerCount}</td>
        <td>{photocopyvalues.hrServerCount}</td>
        <td>{photocopyvalues.sociologistServerCount}</td>
        <td>{photocopyvalues.workshopServerCount}</td>
        <td>{photocopyvalues.itServerCount}</td>
        <td>{photocopyvalues.receptionServerCount}</td>
        <td>{photocopyvalues.omServerCount}</td>
        <td>{photocopyvalues.auditServerCount}</td>
        <td>{photocopyvalues.labServerCount}</td>
        <td>{photocopyvalues.total || 0}</td>
       
      </tr>
      <tr>
        <td>6</td>
        <td>LINE PRINTER</td>
        <td>{lineprintervalues.managerServerCount}</td>
        <td>{lineprintervalues.engineerServerCount}</td>
        <td>{lineprintervalues.accountServerCount}</td>
        <td>{lineprintervalues.commercialServerCount}</td>
        <td>{lineprintervalues.supplyServerCount}</td>
        <td>{lineprintervalues.hrServerCount}</td>
        <td>{lineprintervalues.sociologistServerCount}</td>
        <td>{lineprintervalues.workshopServerCount}</td>
        <td>{lineprintervalues.itServerCount}</td>
        <td>{lineprintervalues.receptionServerCount}</td>
        <td>{lineprintervalues.omServerCount}</td>
        <td>{lineprintervalues.auditServerCount}</td>
        <td>{lineprintervalues.labServerCount}</td>
        <td>{lineprintervalues.total || 0}</td>

      </tr>
      <tr>
        <td>7</td>
        <td>FAX</td>
        <td>{faxvalues.managerServerCount}</td>
        <td>{faxvalues.engineerServerCount}</td>
        <td>{faxvalues.accountServerCount}</td>
        <td>{faxvalues.commercialServerCount}</td>
        <td>{faxvalues.supplyServerCount}</td>
        <td>{faxvalues.hrServerCount}</td>
        <td>{faxvalues.sociologistServerCount}</td>
        <td>{faxvalues.workshopServerCount}</td>
        <td>{faxvalues.itServerCount}</td>
        <td>{faxvalues.receptionServerCount}</td>
        <td>{faxvalues.omServerCount}</td>
        <td>{faxvalues.auditServerCount}</td>
        <td>{faxvalues.labServerCount}</td>
        <td>{faxvalues.total  || 0}</td>
       
      </tr>
      <tr>
        <td>8</td>
        <td>SCANNER</td>
        <td>{scannervalues.managerServerCount}</td>
        <td>{scannervalues.engineerServerCount}</td>
        <td>{scannervalues.accountServerCount}</td>
        <td>{scannervalues.commercialServerCount}</td>
        <td>{scannervalues.supplyServerCount}</td>
        <td>{scannervalues.hrServerCount}</td>
        <td>{scannervalues.sociologistServerCount}</td>
        <td>{scannervalues.workshopServerCount}</td>
        <td>{scannervalues.itServerCount}</td>
        <td>{scannervalues.receptionServerCount}</td>
        <td>{scannervalues.omServerCount}</td>
        <td>{scannervalues.auditServerCount}</td>
        <td>{scannervalues.labServerCount}</td>
        <td>{scannervalues.total || 0}</td>
        
      </tr>
      <tr>
        <td>9</td>
        <td>PROJECTOR</td>
        <td>{projectorvalues.managerServerCount}</td>
        <td>{projectorvalues.engineerServerCount}</td>
        <td>{projectorvalues.accountServerCount}</td>
        <td>{projectorvalues.commercialServerCount}</td>
        <td>{projectorvalues.supplyServerCount}</td>
        <td>{projectorvalues.hrServerCount}</td>
        <td>{projectorvalues.sociologistServerCount}</td>
        <td>{projectorvalues.workshopServerCount}</td>
        <td>{projectorvalues.itServerCount}</td>
        <td>{projectorvalues.receptionServerCount}</td>
        <td>{projectorvalues.omServerCount}</td>
        <td>{projectorvalues.auditServerCount}</td>
        <td>{projectorvalues.labServerCount}</td>
        <td>{projectorvalues.total || 0}</td>
        
      </tr>
      <tr>
        <td>10</td>
        <td>TV</td>
        <td>{tvvalues.managerServerCount}</td>
        <td>{tvvalues.engineerServerCount}</td>
        <td>{tvvalues.accountServerCount}</td>
        <td>{tvvalues.commercialServerCount}</td>
        <td>{tvvalues.supplyServerCount}</td>
        <td>{tvvalues.hrServerCount}</td>
        <td>{tvvalues.sociologistServerCount}</td>
        <td>{tvvalues.workshopServerCount}</td>
        <td>{tvvalues.itServerCount}</td>
        <td>{tvvalues.receptionServerCount}</td>
        <td>{tvvalues.omServerCount}</td>
        <td>{tvvalues.auditServerCount}</td>
        <td>{tvvalues.labServerCount}</td>
        <td>{tvvalues.total || 0}</td>
       
      </tr>
      <tr>
        <td>11</td>
        <td>UPS</td> 
        <td>{upsvalues.managerServerCount}</td>
        <td>{upsvalues.engineerServerCount}</td>
        <td>{upsvalues.accountServerCount}</td>
        <td>{upsvalues.commercialServerCount}</td>
        <td>{upsvalues.supplyServerCount}</td>
        <td>{upsvalues.hrServerCount}</td>
        <td>{upsvalues.sociologistServerCount}</td>
        <td>{upsvalues.workshopServerCount}</td>
        <td>{upsvalues.itServerCount}</td>
        <td>{upsvalues.receptionServerCount}</td>
        <td>{upsvalues.omServerCount}</td>
        <td>{upsvalues.auditServerCount}</td>
        <td>{upsvalues.labServerCount}</td>
        <td>{upsvalues.total || 0}</td>
      </tr>
</tbody>
        </table>
        <div>
      
    </div>
      </div>
    </>
  );
};

export default SummaryTable;
