import OffCanvas from './RMOffice.jsx';
import DatabaseSelection from './DatabaseSelection.jsx';
import TableView from './MainTable.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';
const AdminDashboard = ({host}) =>{
    return(
        <>
        {/* <OffCanvas /> */}
        <DatabaseSelection/>
       
        {/* <TableView /> */}
        
        </>
        // <NavBar />
    )
}

export default AdminDashboard