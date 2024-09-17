import React from 'react'
import "../../../css/DigitalCard.css"
function DigitalCard() {
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-7 col-12">
        <div className="card p-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Invoice for Alex Parkinson</h5>
            <p className="text-muted">Total Amount: $1400</p>

            <div className="mb-4">
              <h6 className="fw-bold">Payment Details</h6>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                </div>
                <div className="col-3">
                  <label className="form-label">Expiry Date</label>
                  <input type="text" className="form-control" placeholder="MM/YY" />
                </div>
                <div className="col-3">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="CVV" />
                </div>
              </div>
              <button className="btn btn-primary w-100">
                Pay Now <i className="fas fa-dollar-sign ms-2"></i>1400
              </button>
            </div>

            <p className="text-muted text-center">
              More payment methods available
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DigitalCard