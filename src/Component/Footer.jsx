import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer-container sticky">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                        <img className='footer-logo' src="./public/wbl.png" alt="Logo" style={{width:'350px', backgroundColor:'white', borderRadius:'10px', padding:'10px'}}/>
                        <h5 className='footer-header'>National Water Supply & Drainage Board</h5>
                        <h5 className='footer-subheader'>Bandarawela</h5>
                        <p className='footer-version' style={{fontSize:'10px'}}>V4.24</p>
                    </div>

                    <div className="col-md-4 text-center">
                        <h5>Quick Links</h5>
                        <ul className="footer-links list-unstyled">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4 text-center">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <p className='footer-copyright'>
                            &copy; 2024 National Water Supply & Drainage Board - Bandarawela . All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
