import Fern from "../../assets/fern.svg";
import "./FernRow.css";

function FernRow() {
  return (
    <div className="fern-row">
        <img className="fern" src={Fern} alt="fern"/>
        <img className="fern" src={Fern} alt="fern"/>
        <img className="fern" src={Fern} alt="fern"/>
        <img className="fern" src={Fern} alt="fern"/>
    </div>
  )
}

export default FernRow;