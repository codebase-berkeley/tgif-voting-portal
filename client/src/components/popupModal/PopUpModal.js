import './PopUpModal.css';
import React, { useState, useEffect } from 'react';


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
                    <button className="secondaryButton" onClick={closeModal}>
                        {props.secondaryText}
                    </button>
                    <button className="primaryButton" onClick={props.primaryFunc}>
                        {props.primaryText}
                    </button>
                </div>
            </div>
            <div className="overlay">
            </div>
        </div>
    );
}

export default PopUpModal;