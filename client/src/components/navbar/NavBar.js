import './NavBar.css';
import {ReactComponent as TGIFIcon} from './../../assets/TGIF.svg'
import {Link} from 'react-router-dom';

var IS_ADMIN = true;

function Navbar() {
    return (
        <div className="top-navbar" id='nav'>
            <div className = "navbar-content">
                <div className="leftNavbar" >
                    <Link to="/dashboard"><TGIFIcon className="logo"/></Link>
                </div>
                <div className="rightNavbar">
                    {IS_ADMIN ?
                        <>
                        <Link to="/members">Members</Link>
                        <Link to="/proposal-management"><button className="nav-page" type="submit">Manage</button></Link>
                        </>
                    : null}
                        <Link to="/dashboard"><button className="nav-page" type="submit">Logout</button></Link>
                </div>
            </div>
            <div className="navbar-outline"></div>
        </div>
    );
}

export default Navbar;