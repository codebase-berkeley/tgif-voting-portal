import './NavBar.css';
import {ReactComponent as TGIFIcon} from './../../assets/TGIF.svg'

function Navbar() {
    return (
        <div className="top-navbar" id='nav'>
            <div className="leftNavbar" >
                <a href='#' id="tgif-logo">
                    <TGIFIcon className="logo"/>
                </a>
            </div>
            <div className="rightNavbar">
                <a href='#'>Admin</a>
                <a href='#'>Logout</a>
            </div>
        </div>
    );
}

export default Navbar;