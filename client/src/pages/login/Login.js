import './Login.css';
import Background from '../../components/loginBackground/Background';
import Logo from '../../assets/TGIF_vertical_color.png';
import axios from 'axios';

function Login() {
  return (
    <div className="login">
      <Background />
      <div className="login-rectangle">
        <img className="tgif-image" src={Logo} alt="tgif"/>
        <a href='http://localhost:8000/auth/google' className="calnet-button">Sign In With CalNet</a>
      </div>
    </div>
  )
}

export default Login;