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
                    {/* <a href='#'>Admin</a> */}
                    <a href='#'>
                        <Link to="/proposal-management">
                            <button className="nav-page" type="submit">Manage Proposals</button>
                        </Link>
                    </a>
                    <a href='#'>
                        <Link to="/dashboard">
                            <button className="nav-page" type="submit">Logout</button>
                        </Link>
                    </a>
                </div>
            </div>
            <div className="navbar-outline"></div>
        </div>
    );
}

export default Navbar;