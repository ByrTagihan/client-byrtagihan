import React, { useState, useEffect } from "react";
import "../../../css/Pagetransuction.css";
import { API_DUMMY } from "../../../../utils/baseURL";
import { CFormInput } from "@coreui/react";

function PageTransaction() {
  const [selectedDate, setSelectedDate] = useState("September 2024");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periode, setPeriode] = useState("");
  const [desription, setDesription] = useState("");

  // Fungsi untuk mengambil token dari localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Fungsi untuk mengambil data payment dari API yang baru
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `${API_DUMMY}/member/payment?periode=${periode}&description=`,
          {
            method: "GET",
            headers: { "auth-tgh": `jwt ${getToken()}` },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching payment data");
        }

        // Parsing data JSON langsung
        const data = await response.json();
        setTransactions(data.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayments();
    // console.log("periode: ", periode);

  }, [periode]);

  // Fungsi untuk menghitung total income dan outcome
  const calculateTotals = () => {
    let income = 0;
    let outcome = 0;

    transactions.forEach((payment) => {
      if (payment.amount > 0) {
        income += payment.amount;
      } else {
        outcome += payment.amount;
      }
    });

    return { income, outcome };
  };

  const { income, outcome } = calculateTotals();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="transaction-page">
      {/* Header dan dropdown untuk bulan */}
      <div className="header-tr">
        <h1>Transactions</h1>
      </div>
      <CFormInput
        className="mb-3"
        type="month"
        value={periode}
        onChange={(e) => setPeriode(e.target.value)}
        // placeholder="name@example.com"
        // text="Must be 8-20 characters long."
        aria-describedby="exampleFormControlInputHelpInline"
      />
      {/* <div className="dropdown-container">
        <select value={selectedDate} onChange={handleDateChange}>
          <option value="September 2024">September 2024</option>
          <option value="October 2024">October 2024</option>
        </select>
      </div> */}

      {/* Income dan Outcome */}
      <div className="summary">
        <div className="summary-row">
          <p>Income</p>
          <p className="income">Rp. {income.toLocaleString()}</p>
        </div>
        <div className="summary-row">
          <p>Outcome</p>
          <p className="outcome">
            - Rp. {Math.abs(outcome).toLocaleString()}
          </p>{" "}
          {/* Menggunakan Math.abs untuk outcome */}
        </div>
      </div>

      {/* List of payments */}
      <div className="transactions">
        {transactions.length > 0 ? (
          transactions.map((payment, index) => (
            <div key={index} className="transaction-card">
              <div className="card-content">
                <h2>{payment.description}</h2>

                {/* Amount */}
                <div className="transaction-detail-row">
                  <p>Amount</p>
                  <p className="amount">{payment.amount.toLocaleString()}</p>
                </div>

                {/* Payment Date */}
                <div className="transaction-detail-row">
                  <p>Number Of Transactions</p>
                  <p>{payment.member_id}</p>
                </div>
              </div>

              <button className="detail-button">Detail</button>
            </div>
          ))
        ) : (
          <p>No transactions available.</p>
        )}
      </div>
    </div>
  );
}

export default PageTransaction;
