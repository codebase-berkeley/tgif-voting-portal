import './PopUpModal.css';
import React, { useState } from 'react';


function PopUpModal(props) { 
  var displayModalDefault = 'page';
  const [displayModalClassName, setDisplayModalClassName] = useState(displayModalDefault);

  function closeModal() {
    setDisplayModalClassName(displayModalDefault + ' hide');
  }
  
  return (
    <div className={displayModalClassName}>
      <div className="ourModal">
          <div className="modalText">
              {props.warning}
          </div>
          <div className="buttons"> 
              <button className="secondaryButton" onClick={() => {if (props.secondaryFunc !== undefined) {
                                                                      props.secondaryFunc()};
                                                                  closeModal();}}>
                  {props.secondaryText}
              </button>
              <button className="primaryButton" onClick={() => {if (props.primaryFunc !== undefined) {
                                                                  props.primaryFunc();}
                                                                closeModal()}}>
                  {props.primaryText}
              </button>
          </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default PopUpModal;