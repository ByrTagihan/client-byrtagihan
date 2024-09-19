import React, { useState, useEffect } from "react";
import "../../../css/Pagetransuction.css";

export const API_DUMMY = "http://dev-api.byrtagihan.com/api";

function PageTransaction() {
  const [selectedDate, setSelectedDate] = useState("September 2024");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Fungsi untuk mengambil data transaksi dari API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_DUMMY}/transactions`);
        if (!response.ok) {
          throw new Error("Error fetching transaction data");
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="transaction-page">
      {/* Header dan dropdown untuk bulan */}
      <div className="header">
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
        {transactions.map((transaction, index) => (
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
