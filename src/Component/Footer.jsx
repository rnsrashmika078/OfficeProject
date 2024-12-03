import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'
function Footer() {
    return (
        <div className="sticky">
        <div className="container-flex">
        <div className='footerbody'>
            <br></br>
            <center><img className='image' src="./public/icon.png"></img></center>
            <h4 className='header'>National Water Supply & Drainage Board</h4>
            <h6 className='header'>Database Management @ 2024</h6>
            <p className='para'>V4.24</p>
            <br></br>
        </div>
        </div>
        </div>
    );
}

export default Footer;