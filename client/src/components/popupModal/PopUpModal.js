import './PopUpModal.css';
import React, { useState, useEffect } from 'react';

function PopUpModal(props) {
  if (props.mode && props.isManagement) {
    return PopUpModalInput(props);
  } else {
      return PopUpModalInput(props);
  }
}

function PopUpModalInput(props) {
  var displayModalDefault = 'page';
  const [displayModalClassName, setDisplayModalClassName] = useState(displayModalDefault);
  const[textboxValue, setTextboxValue] = useState('');

  function closeModal() {
    setDisplayModalClassName(displayModalDefault + ' hide');
    setTextboxValue('');
  }

  
  return (
    <div className={displayModalClassName}>
      <div className="ourModal">
          <div className="modalText">
              Amount to be funded:
              <textarea value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} className= 'userInputAmount' id='userInputAmount' type='textarea' placeholder='amount'/>
          </div>
          <div className="buttons"> 
              <button className="secondaryButton" onClick={() => {if (props.secondaryFunc !== undefined) {
                                                                      props.secondaryFunc()};
                                                                  closeModal();}}>
                  Cancel
              </button>
              <button className="primaryButton" onClick={() => {if (props.primaryFunc !== undefined) {
                                                                  props.primaryFunc();}
                                                                closeModal()}}>
                  Confirm
              </button>
          </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
}

function PopUpModalDefault(props) { 
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