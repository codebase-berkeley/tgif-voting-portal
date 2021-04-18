import './Login.css';
import Background from '../../components/loginBackground/Background';
import Logo from '../../assets/TGIF_vertical_color.png'

function Login() {
    return (
      <div className="login">
        <Background />
        <div className="login-rectangle">
          <img className="tgif-image" src={Logo} alt="tgif"/>
          <button className="calnet-button">Sign In With CalNet</button>
        </div>
      </div>
    )
}

export default Login;