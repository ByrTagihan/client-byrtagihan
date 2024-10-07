import React, { useState } from "react";
import axios from "axios";
import "../css/Kirimdana.css"; // Pastikan ini mengarah ke file CSS

const Kirimdana = () => {
  const [description, setDescription] = useState("");
  const [memberId, setMemberId] = useState(0);
  const [organizationId, setOrganizationId] = useState(1);
  const [amount, setAmount] = useState(12000000);
  const [attachment, setAttachment] = useState([
    "https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls",
    "https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      description:
        description ||
        "Transfer ke sekolah test untuk 25 transaksi di bulan Oktober 2024",
      member_id: memberId,
      organization_id: organizationId,
      amount: amount,
      attachment: attachment,
    };

    try {
      const response = await axios.post("/api/user/transaction", data);
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
            <label style={{ fontWeight:'bold' }}>Description:</label>
            <input
              style={{ textAlign: 'start' }}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi transaksi"
            />
          </div>

          <div>
            <label style={{ fontWeight:'bold' }}>Member ID:</label>
            <input
              style={{ textAlign: 'start' }}
              type="number"
              value={memberId}
              onChange={(e) => setMemberId(Number(e.target.value))}
              placeholder="Member ID"
            />
          </div>

          <div>
            <label style={{ fontWeight:'bold' }}>Organization ID:</label>
            <input
              style={{ textAlign: 'start' }}
              type="number"
              value={organizationId}
              onChange={(e) => setOrganizationId(Number(e.target.value))}
              placeholder="Organization ID"
            />
          </div>

          <div>
            <label style={{ fontWeight:'bold' }}>Amount:</label>
            <input
              style={{ textAlign: 'start' }}
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Jumlah dana"
            />
          </div>

          <div>
            <label style={{ fontWeight:'bold' }}>Attachment:</label>
            <input
              style={{ textAlign: 'start' }}
              type="text"
              value={attachment[0]}
              onChange={(e) => setAttachment([e.target.value, attachment[1]])}
              placeholder="URL Attachment 1"
            />
            <input
              style={{ textAlign: 'start' }}
              type="text"
              value={attachment[1]}
              onChange={(e) => setAttachment([attachment[0], e.target.value])}
              placeholder="URL Attachment 2"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" style={{ background:'purple' }}>Kirim Dana</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Kirimdana;
