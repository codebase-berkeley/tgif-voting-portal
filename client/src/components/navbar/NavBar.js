import './NavBar.css';
import {ReactComponent as TGIFIcon} from './../../assets/TGIF.svg'
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <div className="top-navbar" id='nav'>
            <div className = "navbar-content">
                <div className="leftNavbar" >
                    <Link to="/dashboard"><TGIFIcon className="logo"/></Link>
                </div>
                <div className="rightNavbar">
                    <Link to="/members">Admin</Link>
                    <a href='#'>Logout</a>
                </div>
            </div>
            <div className="navbar-outline"></div>
        </div>
    );
}

export default Navbar;