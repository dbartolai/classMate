import React, { useState } from "react";
import "./InfoPopup.css";

interface InfoPopupProps {
  explanation: string | React.ReactNode;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ explanation }) => {
  const [open, setOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setOpen(false);
      setFadeOut(false);
    }, 170); // duration matches your fadeOut animation
  };

  const handleClick = () => {
    if (open) {
      handleClose()
    } else {
      setOpen(true)
    }
  }




  return (
    <span className="info-popup-wrapper">
      <button
        className="info-icon-btn"
        aria-label="Info Card"
        onClick={handleClick}
        type="button"
      >
        {/* Unicode Question Mark icon */}
        <span className="info-icon">?</span>
      </button>
      {open && (
        <div className={`info-popup-card${fadeOut ? " fade-out" : ""}`}>
          <div className="info-popup-content">{explanation}</div>
          <button
            className="info-popup-dismiss"
            onClick={handleClose}
            type="button"
          >
            Dismiss
          </button>
        </div>
      )}
    </span>
  );
};

export default InfoPopup;
