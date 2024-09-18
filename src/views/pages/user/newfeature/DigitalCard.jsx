import React from "react";
import "../../../css/DigitalCard.css";
function DigitalCard() {
  return (
    <div className="container card-container">
      <div className="card-header">
        {/* <button className="back-button">&larr;</button> */}
        <h2>Digital Card</h2>
      </div>

      <div className="card-info">
        <div className="card-balance">
          <h3 className="card-owner">KRISNA ABDUL RASYID PUSPITO SUGIYARTO</h3>
          <p className="balance-label">Card Balance</p>
          <h1 className="balance">Rp 20.000</h1>
          <p className="nfc-id">NFC ID: 3825246227</p>
        </div>
      </div>

      <div className="info-section">
        <h4>Information Card</h4>
        <div className="info-details">
          <div className="info-item">
            <span>Maximum Accumulation Limit</span>
            <span>20.000</span>
          </div>
          <div className="info-item">
            <span>Daily Limit</span>
            <span>20.000</span>
          </div>
          <div className="info-item">
            <span>Last Sync</span>
            <span>-</span>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h4>Card Menu</h4>
        <div className="menu-buttons">
          <button className="menu-button sync-button">
            <span className="icon-wrapper">
              <i className="fa-solid fa-rotate"></i>
            </span>
            Sync History
          </button>
          <button className="menu-button help-button">
            <span className="icon-wrapper">
              <i className="fa-solid fa-question"></i>
            </span>
            Help
          </button>
        </div>
      </div>
    </div>
  );
}

export default DigitalCard;
