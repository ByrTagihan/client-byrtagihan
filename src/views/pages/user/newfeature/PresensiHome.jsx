import React, { useState } from 'react';
import '../../../css/PresensiHome.css'; // Pastikan CSS diimpor dengan benar
import { API_DUMMY } from "../../../../../src/utils/baseURL";

const PresensiHomePulang = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userName, setUserName] = useState(''); // Menyimpan nama pengguna

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      card_number: cardNumber,
      type: 2, // Type 2 untuk pulang
    };

    try {
      const response = await fetch(`${API_DUMMY}/presensi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        const name = result.data; // Ambil nama pengguna dari respons API
        setUserName(name); // Simpan nama pengguna ke state
        setSuccessMessage(` ${name} `); // Set success message dengan nama dinamis
        setCardNumber(''); // Clear the input field
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat presensi.');
    }
  };

  return (
    <div className='body-presensi'>
    <div className="presensi-container">
      <h2>Presensi Pulang</h2>
      <form className="presensi-form" onSubmit={handleSubmit}>
        <label htmlFor="card_number">Scan Kartu RFID:</label>
        <input
          type="text"
          id="card_number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
    </div>
  );
};

export default PresensiHomePulang;
