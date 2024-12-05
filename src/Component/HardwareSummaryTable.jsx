import { useState, useEffect } from 'react';

const HardwareSummaryTable = ({host}) => {


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
    ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
    total:0
});
const [laptopvalues, setlaptopvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});
const [desktopvalues, setdesktopvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});
const [printervalues, setprintervalues] = useState({
  ettampitiyaServerCount: 0,
  keppetipolaServerCount:0,
  divithotawelaServerCount:0,
  ambagasdowaServerCount: 0,
  welimdaServerCount: 0,
  diyathalawaServerCount:0,
  bandarawelaServerCount:0,
  makulellaServerCount: 0,
  demodaraServerCount:0,
  badulladeServerCount:0,
  badullaServerCount: 0,
  mahiyanganayaServerCount:0,
  giradurukotteServerCount: 0,
});
const [photocopyvalues,setphotocopyvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});

const [lineprintervalues,setlineprintervalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});

const [faxvalues,setfaxvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});
const [tvvalues,settvvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});

const [projectorvalues,setprojectorvalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});
const [upsvalues,setupsvalues] = useState({
  ettampitiyaServerCount: 0,
  keppetipolaServerCount:0,
  divithotawelaServerCount:0,
  ambagasdowaServerCount: 0,
  welimdaServerCount: 0,
  diyathalawaServerCount:0,
  bandarawelaServerCount:0,
  makulellaServerCount: 0,
  demodaraServerCount:0,
  badulladeServerCount:0,
  badullaServerCount: 0,
  mahiyanganayaServerCount:0,
  giradurukotteServerCount: 0,
});

const [scannervalues,setscannervalues] = useState({
  ettampitiyaServerCount: 0,
    keppetipolaServerCount:0,
    divithotawelaServerCount:0,
    ambagasdowaServerCount: 0,
    welimdaServerCount: 0,
    diyathalawaServerCount:0,
    bandarawelaServerCount:0,
    makulellaServerCount: 0,
    demodaraServerCount:0,
    badulladeServerCount:0,
    badullaServerCount: 0,
    mahiyanganayaServerCount:0,
    giradurukotteServerCount: 0,
});

//server
useEffect(() => {
  fetch(`${host}/HardwareSummaryTable/Custom_Server.php`)
    .then((response) => response.json())
    .then((responseData) => {
      const total =
        (Number(responseData.ettampitiyaServerCount) || 0) +
        (Number(responseData.keppetipolaServerCount) || 0) +
        (Number(responseData.divithotawelaServerCount) || 0) +
        (Number(responseData.ambagasdowaServerCount) || 0) +
        (Number(responseData.welimdaServerCount) || 0) +
        (Number(responseData.diyathalawaServerCount) || 0) +
        (Number(responseData.bandarawelaServerCount) || 0) +
        (Number(responseData.makulellaServerCount) || 0) +
        (Number(responseData.demodaraServerCount) || 0) +
        (Number(responseData.badulladeServerCount) || 0) +
        (Number(responseData.badullaServerCount) || 0) +
        (Number(responseData.mahiyanganayaServerCount) || 0) +
        (Number(responseData.giradurukotteServerCount) || 0);

        setservervalues({
          ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
    fetch(`${host}/HardwareSummaryTable/Custom_Desktop.php`)
      .then((response) => response.json()) // Assuming the server returns a JSON response
      
      .then((responseData) => {
        // Dynamically create the servervaluess state from the received data
        const total =
        (Number(responseData.ettampitiyaServerCount) || 0) +
        (Number(responseData.keppetipolaServerCount) || 0) +
        (Number(responseData.divithotawelaServerCount) || 0) +
        (Number(responseData.ambagasdowaServerCount) || 0) +
        (Number(responseData.welimdaServerCount) || 0) +
        (Number(responseData.diyathalawaServerCount) || 0) +
        (Number(responseData.bandarawelaServerCount) || 0) +
        (Number(responseData.makulellaServerCount) || 0) +
        (Number(responseData.demodaraServerCount) || 0) +
        (Number(responseData.badulladeServerCount) || 0) +
        (Number(responseData.badullaServerCount) || 0) +
        (Number(responseData.mahiyanganayaServerCount) || 0) +
        (Number(responseData.giradurukotteServerCount) || 0);

      setdesktopvalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
        keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
        divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
        ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
        welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
        diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
        bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
        makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
        demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
        badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
        badullaServerCount: Number(responseData.badullaServerCount) || 0,
        mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
        giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
      total, // Use the calculated total
        });
      })
     
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Optionally, set an error message
      });
  }, []);
    useEffect(()=>{
      console.log("this is the data " ,laptopvalues);
    })
     //laptop
     useEffect(() => {
      // Make an API call to the backend to fetch the count data
      fetch(`${host}/HardwareSummaryTable/Custom_Laptop.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);
  
        setlaptopvalues({
          ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom3_Printer.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);
  
        setprintervalues({
          ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom4_Photocopy.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);
  
        setphotocopyvalues({
          ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
  fetch(`${host}/HardwareSummaryTable/Custom4_Line.php`)
    .then((response) => response.json()) // Assuming the server returns a JSON response
    .then((responseData) => {
      // Dynamically create the servervaluess state from the received data
      const total =
      (Number(responseData.ettampitiyaServerCount) || 0) +
      (Number(responseData.keppetipolaServerCount) || 0) +
      (Number(responseData.divithotawelaServerCount) || 0) +
      (Number(responseData.ambagasdowaServerCount) || 0) +
      (Number(responseData.welimdaServerCount) || 0) +
      (Number(responseData.diyathalawaServerCount) || 0) +
      (Number(responseData.bandarawelaServerCount) || 0) +
      (Number(responseData.makulellaServerCount) || 0) +
      (Number(responseData.demodaraServerCount) || 0) +
      (Number(responseData.badulladeServerCount) || 0) +
      (Number(responseData.badullaServerCount) || 0) +
      (Number(responseData.mahiyanganayaServerCount) || 0) +
      (Number(responseData.giradurukotteServerCount) || 0);

      setlineprintervalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
        keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
        divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
        ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
        welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
        diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
        bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
        makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
        demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
        badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
        badullaServerCount: Number(responseData.badullaServerCount) || 0,
        mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
        giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom4_Fax.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);

      setfaxvalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom4_TV.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);

      settvvalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom4_Projector.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);

      setprojectorvalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
          keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
          divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
          ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
          welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
          diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
          bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
          makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
          demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
          badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
          badullaServerCount: Number(responseData.badullaServerCount) || 0,
          mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
          giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
      fetch(`${host}/HardwareSummaryTable/Custom4_UPS.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);

      setupsvalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
        keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
        divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
        ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
        welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
        diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
        bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
        makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
        demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
        badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
        badullaServerCount: Number(responseData.badullaServerCount) || 0,
        mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
        giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
      total, // Use the calculated total
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
      fetch(`${host}/HardwareSummaryTable/Custom4_Scanner.php`)
        .then((response) => response.json()) // Assuming the server returns a JSON response
        .then((responseData) => {
          // Dynamically create the servervaluess state from the received data
          const total =
          (Number(responseData.ettampitiyaServerCount) || 0) +
          (Number(responseData.keppetipolaServerCount) || 0) +
          (Number(responseData.divithotawelaServerCount) || 0) +
          (Number(responseData.ambagasdowaServerCount) || 0) +
          (Number(responseData.welimdaServerCount) || 0) +
          (Number(responseData.diyathalawaServerCount) || 0) +
          (Number(responseData.bandarawelaServerCount) || 0) +
          (Number(responseData.makulellaServerCount) || 0) +
          (Number(responseData.demodaraServerCount) || 0) +
          (Number(responseData.badulladeServerCount) || 0) +
          (Number(responseData.badullaServerCount) || 0) +
          (Number(responseData.mahiyanganayaServerCount) || 0) +
          (Number(responseData.giradurukotteServerCount) || 0);

      setscannervalues({
        ettampitiyaServerCount: Number(responseData.ettampitiyaServerCount) || 0,
        keppetipolaServerCount: Number(responseData.keppetipolaServerCount) || 0,
        divithotawelaServerCount: Number(responseData.divithotawelaServerCount) || 0,
        ambagasdowaServerCount: Number(responseData.ambagasdowaServerCount) || 0,
        welimdaServerCount: Number(responseData.welimdaServerCount) || 0,
        diyathalawaServerCount: Number(responseData.diyathalawaServerCount) || 0,
        bandarawelaServerCount: Number(responseData.bandarawelaServerCount) || 0,
        makulellaServerCount: Number(responseData.makulellaServerCount) || 0,
        demodaraServerCount: Number(responseData.demodaraServerCount) || 0,
        badulladeServerCount: Number(responseData.badulladeServerCount) || 0,
        badullaServerCount: Number(responseData.badullaServerCount) || 0,
        mahiyanganayaServerCount: Number(responseData.mahiyanganayaServerCount) || 0,
        giradurukotteServerCount: Number(responseData.giradurukotteServerCount) || 0,
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
    fetch(`${host}/HardwareSummaryTable/delete.php`, {
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
          section: rowData[1],
          ettampitiya: rowData[2],
          keppetipola: rowData[3],
          divithotawela: rowData[4],
          ambagasdowa: rowData[5],
          welimda: rowData[6],
          diyathalawa: rowData[7],
          bandarawela: rowData[8],
          makulella: rowData[9],
          demodara: rowData[10],
          badullade: rowData[11],
          badulla: rowData[12],
          mahiyanganaya: rowData[13],
          giradurukotte: rowData[14],
          Total: rowData[15],
        };

        // Send the updated data to the backend
        fetch(`${host}/HardwareSummaryTable/save.php`, {
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

    fetch(`${host}/HardwareSummaryTable/delete.php`, {
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
                <th>Ettampitiya</th>
                <th>Keppetipola</th>
                <th>Divithotawela</th>
                <th>Ambagasdowa</th>
                <th>Welimada</th>
                <th>Diyathalawa</th>
                <th>Bandarawela</th>
                <th>Makulella</th>
                <th>Demodara</th>
                <th>Badulla DE</th>
                <th>Badulla</th>
                <th>Mahiyanganaya</th>
                <th>Giradurukotte</th>
                <th>Total</th>
            </tr>
          </thead>
          <tbody>
      <tr>
        <td>1</td>
        <td>SERVER</td>
        <td>{servervalues.ettampitiyaServerCount}</td>
        <td>{servervalues.keppetipolaServerCount}</td>
        <td>{servervalues.divithotawelaServerCount}</td>
        <td>{servervalues.ambagasdowaServerCount}</td>
        <td>{servervalues.welimdaServerCount}</td>
        <td>{servervalues.diyathalawaServerCount}</td>
        <td>{servervalues.bandarawelaServerCount}</td>
        <td>{servervalues.makulellaServerCount}</td>
        <td>{servervalues.demodaraServerCount}</td>
        <td>{servervalues.badulladeServerCount}</td>
        <td>{servervalues.badullaServerCount}</td>
        <td>{servervalues.mahiyanganayaServerCount}</td>
        <td>{servervalues.giradurukotteServerCount}</td>
        <td>{servervalues.total ||0}</td>
    </tr>
       <tr>
        <td>2</td>
        <td>DESKTOP</td> 
        <td>{desktopvalues.ettampitiyaServerCount}</td>
        <td>{desktopvalues.keppetipolaServerCount}</td>
        <td>{desktopvalues.divithotawelaServerCount}</td>
        <td>{desktopvalues.ambagasdowaServerCount}</td>
        <td>{desktopvalues.welimdaServerCount}</td>
        <td>{desktopvalues.diyathalawaServerCount}</td>
        <td>{desktopvalues.bandarawelaServerCount}</td>
        <td>{desktopvalues.makulellaServerCount}</td>
        <td>{desktopvalues.demodaraServerCount}</td>
        <td>{desktopvalues.badulladeServerCount}</td>
        <td>{desktopvalues.badullaServerCount}</td>
        <td>{desktopvalues.mahiyanganayaServerCount}</td>
        <td>{desktopvalues.giradurukotteServerCount}</td>
        <td>{desktopvalues.total ||0}</td>
      </tr>
       <tr>
        <td>3</td>
        <td>LAPTOP</td> 
        <td>{laptopvalues.ettampitiyaServerCount}</td>
        <td>{laptopvalues.keppetipolaServerCount}</td>
        <td>{laptopvalues.divithotawelaServerCount}</td>
        <td>{laptopvalues.ambagasdowaServerCount}</td>
        <td>{laptopvalues.welimdaServerCount}</td>
        <td>{laptopvalues.diyathalawaServerCount}</td>
        <td>{laptopvalues.bandarawelaServerCount}</td>
        <td>{laptopvalues.makulellaServerCount}</td>
        <td>{laptopvalues.demodaraServerCount}</td>
        <td>{laptopvalues.badulladeServerCount}</td>
        <td>{laptopvalues.badullaServerCount}</td>
        <td>{laptopvalues.mahiyanganayaServerCount}</td>
        <td>{laptopvalues.giradurukotteServerCount}</td>
        <td>{laptopvalues.total || 0}</td>
      </tr>
      <tr>
        <td>4</td>
        <td>PRINTER</td>
        <td>{printervalues.ettampitiyaServerCount}</td>
        <td>{printervalues.keppetipolaServerCount}</td>
        <td>{printervalues.divithotawelaServerCount}</td>
        <td>{printervalues.ambagasdowaServerCount}</td>
        <td>{printervalues.welimdaServerCount}</td>
        <td>{printervalues.diyathalawaServerCount}</td>
        <td>{printervalues.bandarawelaServerCount}</td>
        <td>{printervalues.makulellaServerCount}</td>
        <td>{printervalues.demodaraServerCount}</td>
        <td>{printervalues.badulladeServerCount}</td>
        <td>{printervalues.badullaServerCount}</td>
        <td>{printervalues.mahiyanganayaServerCount}</td>
        <td>{printervalues.giradurukotteServerCount}</td>
        <td>{printervalues.total || 0}</td>
      </tr>
      <tr>
        <td>5</td>
        <td>PHOTOCOPY MACHINE</td>
        <td>{photocopyvalues.ettampitiyaServerCount}</td>
        <td>{photocopyvalues.keppetipolaServerCount}</td>
        <td>{photocopyvalues.divithotawelaServerCount}</td>
        <td>{photocopyvalues.ambagasdowaServerCount}</td>
        <td>{photocopyvalues.welimdaServerCount}</td>
        <td>{photocopyvalues.diyathalawaServerCount}</td>
        <td>{photocopyvalues.bandarawelaServerCount}</td>
        <td>{photocopyvalues.makulellaServerCount}</td>
        <td>{photocopyvalues.demodaraServerCount}</td>
        <td>{photocopyvalues.badulladeServerCount}</td>
        <td>{photocopyvalues.badullaServerCount}</td>
        <td>{photocopyvalues.mahiyanganayaServerCount}</td>
        <td>{photocopyvalues.giradurukotteServerCount}</td>
        <td>{photocopyvalues.total || 0}</td>
       
      </tr>
      <tr>
        <td>6</td>
        <td>LINE PRINTER</td>
        <td>{lineprintervalues.ettampitiyaServerCount}</td>
        <td>{lineprintervalues.keppetipolaServerCount}</td>
        <td>{lineprintervalues.divithotawelaServerCount}</td>
        <td>{lineprintervalues.ambagasdowaServerCount}</td>
        <td>{lineprintervalues.welimdaServerCount}</td>
        <td>{lineprintervalues.diyathalawaServerCount}</td>
        <td>{lineprintervalues.bandarawelaServerCount}</td>
        <td>{lineprintervalues.makulellaServerCount}</td>
        <td>{lineprintervalues.demodaraServerCount}</td>
        <td>{lineprintervalues.badulladeServerCount}</td>
        <td>{lineprintervalues.badullaServerCount}</td>
        <td>{lineprintervalues.mahiyanganayaServerCount}</td>
        <td>{lineprintervalues.giradurukotteServerCount}</td>
        <td>{lineprintervalues.total || 0}</td>

      </tr>
      <tr>
        <td>7</td>
        <td>FAX</td>
        <td>{faxvalues.ettampitiyaServerCount}</td>
        <td>{faxvalues.keppetipolaServerCount}</td>
        <td>{faxvalues.divithotawelaServerCount}</td>
        <td>{faxvalues.ambagasdowaServerCount}</td>
        <td>{faxvalues.welimdaServerCount}</td>
        <td>{faxvalues.diyathalawaServerCount}</td>
        <td>{faxvalues.bandarawelaServerCount}</td>
        <td>{faxvalues.makulellaServerCount}</td>
        <td>{faxvalues.demodaraServerCount}</td>
        <td>{faxvalues.badulladeServerCount}</td>
        <td>{faxvalues.badullaServerCount}</td>
        <td>{faxvalues.mahiyanganayaServerCount}</td>
        <td>{faxvalues.giradurukotteServerCount}</td>
        <td>{faxvalues.total  || 0}</td>
       
      </tr>
      <tr>
        <td>8</td>
        <td>SCANNER</td>
        <td>{scannervalues.ettampitiyaServerCount}</td>
        <td>{scannervalues.keppetipolaServerCount}</td>
        <td>{scannervalues.divithotawelaServerCount}</td>
        <td>{scannervalues.ambagasdowaServerCount}</td>
        <td>{scannervalues.welimdaServerCount}</td>
        <td>{scannervalues.diyathalawaServerCount}</td>
        <td>{scannervalues.bandarawelaServerCount}</td>
        <td>{scannervalues.makulellaServerCount}</td>
        <td>{scannervalues.demodaraServerCount}</td>
        <td>{scannervalues.badulladeServerCount}</td>
        <td>{scannervalues.badullaServerCount}</td>
        <td>{scannervalues.mahiyanganayaServerCount}</td>
        <td>{scannervalues.giradurukotteServerCount}</td>
        <td>{scannervalues.total || 0}</td>
        
      </tr>
      <tr>
        <td>9</td>
        <td>PROJECTOR</td>
        <td>{projectorvalues.ettampitiyaServerCount}</td>
        <td>{projectorvalues.keppetipolaServerCount}</td>
        <td>{projectorvalues.divithotawelaServerCount}</td>
        <td>{projectorvalues.ambagasdowaServerCount}</td>
        <td>{projectorvalues.welimdaServerCount}</td>
        <td>{projectorvalues.diyathalawaServerCount}</td>
        <td>{projectorvalues.bandarawelaServerCount}</td>
        <td>{projectorvalues.makulellaServerCount}</td>
        <td>{projectorvalues.demodaraServerCount}</td>
        <td>{projectorvalues.badulladeServerCount}</td>
        <td>{projectorvalues.badullaServerCount}</td>
        <td>{projectorvalues.mahiyanganayaServerCount}</td>
        <td>{projectorvalues.giradurukotteServerCount}</td>
        <td>{projectorvalues.total || 0}</td>
        
      </tr>
      <tr>
        <td>10</td>
        <td>TV</td>
        <td>{tvvalues.ettampitiyaServerCount}</td>
        <td>{tvvalues.keppetipolaServerCount}</td>
        <td>{tvvalues.divithotawelaServerCount}</td>
        <td>{tvvalues.ambagasdowaServerCount}</td>
        <td>{tvvalues.welimdaServerCount}</td>
        <td>{tvvalues.diyathalawaServerCount}</td>
        <td>{tvvalues.bandarawelaServerCount}</td>
        <td>{tvvalues.makulellaServerCount}</td>
        <td>{tvvalues.demodaraServerCount}</td>
        <td>{tvvalues.badulladeServerCount}</td>
        <td>{tvvalues.badullaServerCount}</td>
        <td>{tvvalues.mahiyanganayaServerCount}</td>
        <td>{tvvalues.giradurukotteServerCount}</td>
        <td>{tvvalues.total || 0}</td>
       
      </tr>
      <tr>
        <td>11</td>
        <td>UPS</td> 
        <td>{upsvalues.ettampitiyaServerCount}</td>
        <td>{upsvalues.keppetipolaServerCount}</td>
        <td>{upsvalues.divithotawelaServerCount}</td>
        <td>{upsvalues.ambagasdowaServerCount}</td>
        <td>{upsvalues.welimdaServerCount}</td>
        <td>{upsvalues.diyathalawaServerCount}</td>
        <td>{upsvalues.bandarawelaServerCount}</td>
        <td>{upsvalues.makulellaServerCount}</td>
        <td>{upsvalues.demodaraServerCount}</td>
        <td>{upsvalues.badulladeServerCount}</td>
        <td>{upsvalues.badullaServerCount}</td>
        <td>{upsvalues.mahiyanganayaServerCount}</td>
        <td>{upsvalues.giradurukotteServerCount}</td>
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

export default HardwareSummaryTable;
