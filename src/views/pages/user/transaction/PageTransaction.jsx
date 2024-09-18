import React, { useState } from "react";
import { AppSidebar } from "../../../../components";

// Contoh data JSON untuk bulan dan tahun
const dateData = {
  dates: [
    { month: "January", year: 2022 },
    { month: "February", year: 2022 },
    { month: "March", year: 2023 },
    { month: "April", year: 2023 }
  ]
};

function PageTransaction() {
  const [selectedDate, setSelectedDate] = useState("");

  // Handle change event saat pilihan bulan dan tahun dipilih
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <>
        <AppSidebar />
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full height of viewport for vertical centering
            flexDirection: "column", // Mengatur input dan card berurutan secara vertikal
          }}
        >
          {/* Select bulan dan tahun */}
          <select
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              marginBottom: "20px", // Memberikan jarak antara select dan card
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ced4da",
            }}
          >
            <option value="" disabled>
              Pilih Bulan dan Tahun
            </option>
            {dateData.dates.map((date, index) => (
              <option key={index} value={`${date.month} ${date.year}`}>
                {date.month} {date.year}
              </option>
            ))}
          </select>

          <div className="date">
            <p style={{ marginRight:"50%" }}> income</p>
          </div>

          <div
            className="card"
            style={{
              marginLeft: "10%",
              width: "70%",
              height: "20%",
              backgroundColor: "#f8f9fa", // Pucat warna (light grey)
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // Shadow tipis di bagian bawah
            }}
          >
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default PageTransaction;
