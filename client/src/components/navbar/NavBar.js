import './NavBar.css';
import {ReactComponent as TGIFIcon} from './../../assets/TGIF.svg'
import {Link} from 'react-router-dom';

function Navbar(props) {
  const PRIVILEGES = props.privileges;
  return (
    <div className="top-navbar" id='nav'>
        <div className = "navbar-content">
            <div className="leftNavbar" >
                <Link to="/dashboard"><TGIFIcon className="logo"/></Link>
            </div>
            <div className="rightNavbar">
                {PRIVILEGES === 'Admin' ?
                    <>
                    <Link to="/members">
                        <button className="nav-page" type="submit">Members</button>
                    </Link>
                    <Link to="/proposal-management">
                        <button className="nav-page" type="submit">Proposals</button>
                    </Link>
                    </>
                : null}
                    <Link to="/dashboard">
                        <button className="nav-page" type="submit">Logout</button>
                    </Link>
            </div>
        </div>
        <div className="navbar-outline"></div>
    </div>
  );
}

export default Navbar;