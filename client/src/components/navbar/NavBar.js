import './NavBar.css';
import {ReactComponent as TGIFIcon} from './../../assets/TGIF.svg'
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <div className="top-navbar" id='nav'>
            <div className = "navbar-content">
                <div className="leftNavbar" >
                    <a href='#' id="tgif-logo">
                    <Link to="/dashboard"><TGIFIcon className="logo"/></Link>
                    </a>
                </div>
                <div className="rightNavbar">
                    <a href='#'>Admin</a>
                    <a href='#'>Logout</a>
                </div>
            </div>
            <div className="navbar-outline"></div>
        </div>
    );
}

export default Navbar;