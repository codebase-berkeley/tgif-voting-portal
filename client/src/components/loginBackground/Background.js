import FernRow from "./FernRow";
import "./Background.css";

function Background() {    
  return (
      <div className="background">
            <div className={"row0"}><FernRow/></div>
            <div className={"row1"}><FernRow/></div>
            <div className={"row0"}><FernRow/></div>
            <div className={"row1"}><FernRow/></div>
            <div className={"row0"}><FernRow/></div>
            <div className={"row1"}><FernRow/></div>
      </div>
  )
}

export default Background;