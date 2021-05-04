import './Login.css';
import Background from '../../components/loginBackground/Background';
import Logo from '../../assets/TGIF_vertical_color.png';
import {Link} from 'react-router-dom';

function LoginFail() {
  return (
    <div className="login">
      <Background />
      <div className="login-rectangle">
        <Link to="/login">
          <img className="tgif-image" src={Logo} alt="tgif"/>
        </Link>
        <div className="failure-message">Error: Contact administrator, you are not on the white list</div>
      </div>
    </div>
  )
}

export default LoginFail;