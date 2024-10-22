import React, { useState } from "react";
// import "../../../css/PresensiHome.css"
import { API_DUMMY } from "../../../../../src/utils/baseURL";

const PresensiLeave = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userName, setUserName] = useState(""); // Menyimpan nama pengguna

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      card_number: cardNumber,
      type: 1, // Type 1 untuk berangkat
    };

    try {
      const response = await fetch(`${API_DUMMY}/presensi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        const name = result.data; // Ambil nama pengguna dari respons API
        setUserName(name); // Simpan nama pengguna ke state
        setSuccessMessage(` ${name} `); // Set success message dengan nama dinamis
        setCardNumber(""); // Clear the input field
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat presensi.");
    }
  };
  return (
    <div className="body-presensi">
      <div className="presensi-container">
        {" "}
        {/* Menggunakan class yang sama */}
        <h2>Presensi Berangkat</h2> {/* Pastikan ini sama */}
        <form className="presensi-form" onSubmit={handleSubmit}>
          {" "}
          {/* Class form yang sama */}
          <label htmlFor="card_number">Scan Kartu RFID:</label>
          <input
            type="text"
            id="card_number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>{" "}
          {/* Tombol submit yang sama */}
        </form>
        {successMessage && ( // Conditionally render success message
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default PresensiLeave;
