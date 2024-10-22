import React, { useState } from "react";
import axios from "axios";
import "../css/Kirimdana.css"; // Pastikan ini mengarah ke file CSS

const Kirimdana = () => {
  const [description, setDescription] = useState("");
  const [organizationId, setOrganizationId] = useState(1);
  const [amount, setAmount] = useState(12000000);
  const [attachment, setAttachment] = useState([null, null]);

  const handleFileChange1 = (e) => {
    setAttachment([e.target.files[0], attachment[1]]);
  };

  const handleFileChange2 = (e) => {
    setAttachment([attachment[0], e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "description",
      description || "Transfer ke sekolah test untuk 25 transaksi di bulan Oktober 2024"
    );
    formData.append("member_id", 0); // Default value for memberId
    formData.append("organization_id", organizationId);
    formData.append("amount", amount);

    if (attachment[0]) {
      formData.append("attachment1", attachment[0]); // Upload file 1
    }
    if (attachment[1]) {
      formData.append("attachment2", attachment[1]); // Upload file 2
    }

    try {
      const response = await axios.post("/api/user/transaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Transaksi berhasil dikirim:", response.data);
      alert("Transaksi berhasil dikirim!");
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim transaksi:", error);
      alert("Gagal mengirim transaksi. Coba lagi.");
    }
  };

  return (
    <>
      <h2>Kirim Dana ke Sekolah</h2>
      <div className="one">
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontWeight: "bold" }}>Description:</label>
            <input
              style={{ textAlign: "start" }}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi transaksi"
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Organization :</label>
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(Number(e.target.value))}
              style={{ textAlign: "start", marginLeft:'2%', width:"290px" }}
            >
              <option value={1}>school </option>
              {/* Tambahkan opsi lain sesuai kebutuhan */}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Amount:</label>
            <input
              style={{ textAlign: "start" }}
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Jumlah dana"
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Attachment </label>
            <input
            style={{ marginLeft:"2%" }}
              type="file"
              onChange={handleFileChange1}
              placeholder="Pilih file Attachment 1"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <button type="submit" style={{ background: "#4C3BCF" }}>Kirim Dana</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Kirimdana;
