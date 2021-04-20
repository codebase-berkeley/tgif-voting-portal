import './Login.css';
import Background from '../../components/loginBackground/Background';
import Logo from '../../assets/TGIF_vertical_color.png';
import axios from 'axios';

function Login() {
  async function authenticate() {
    await axios.get("http://localhost8000/auth/google");
  }

  return (
    <div className="login">
      <Background />
      <div className="login-rectangle">
        <img className="tgif-image" src={Logo} alt="tgif"/>
        <button className="calnet-button" onClick={authenticate}>Sign In With CalNet</button>
      </div>
    </div>
  )
}

export default Login;