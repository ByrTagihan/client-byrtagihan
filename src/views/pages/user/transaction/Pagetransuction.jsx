import React, { useState } from "react";
import "../../../css/Pagetransuction.css"

const transactionData = [
  { title: "ADMIN TOPUP VA", amount: "- Rp 3.000", transactions: 1 },
  { title: "IURAN SANTRI 10.000", amount: "- Rp 10.000", transactions: 1 },
  {
    title: "SMP SYAHRIYAH SEPTEMBER 2024 KELAS 7",
    amount: "- Rp 2.100.000",
    transactions: 1,
  },
  { title: "TOPUP VA (BSI-MAKARA)", amount: "Rp 2.200.000", transactions: 1 },
  {
    title: "TRANSAKSI KARTU ABUYAQU MART",
    amount: "- Rp 29.500",
    transactions: 1,
  },
];

function PageTransaction() {
  const [selectedDate, setSelectedDate] = useState("September 2024");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="transaction-page">
      {/* Header dan dropdown untuk bulan */}
      <div className="header">
        {/* <button className="back-button">{"<"}</button> */}
        <h1>Transaction</h1>
      </div>

      <div className="dropdown-container">
        <select value={selectedDate} onChange={handleDateChange}>
          <option value="September 2024">September 2024</option>
          <option value="October 2024">October 2024</option>
        </select>
      </div>

      {/* Income dan Outcome */}
      <div className="summary">
        <div className="summary-row">
          <p>Income</p>
          <p className="income">Rp. 2.200.000</p>
        </div>
        <div className="summary-row">
          <p>Outcome</p>
          <p className="outcome">- Rp. 2.176.000</p>
        </div>
      </div>

      {/* List of transactions */}
      <div className="transactions">
        {transactionData.map((transaction, index) => (
          <div key={index} className="transaction-card">
            <div className="card-content">
              <h2>{transaction.title}</h2>

              {/* Amount */}
              <div className="transaction-detail-row">
                <p>Amount</p>
                <p className="amount">{transaction.amount}</p>
              </div>

              {/* Number Of Transactions */}
              <div className="transaction-detail-row">
                <p>Number Of Transactions</p>
                <p>{transaction.transactions}</p>
              </div>
            </div>

            <button className="detail-button">Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageTransaction;