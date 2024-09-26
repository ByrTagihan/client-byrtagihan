import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import "./../../css/merchan.css";

function Merchant() {
  // State untuk menyimpan data transaksi yang diambil dari API
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data transaksi dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/merchant/transactions"); // Sesuaikan endpoint API
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        console.log("Data transaksi yang diterima:", data); // Log untuk memeriksa data
        setDataTransaksi(data);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk mengubah teks menjadi bintang-bintang
  const maskText = (text) => {
    return "*****"; // Tampilkan hanya 5 bintang
  };

  // Fungsi untuk menangani pembayaran
  const handlePayment = async (transaction) => {
    try {
      console.log("Transaksi yang akan dikirim:", transaction); // Log sebelum mengirim data
      const response = await fetch("/api/merchant/payment/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Payment failed: ${errorResponse.message}`);
      }

      const data = await response.json();
      alert(`Payment successful: ${data.message}`);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="notification-screen text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="notification-screen text-center">
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="notification-screen text-center">
      <div className="header">
        <h3>Merchant</h3>
      </div>

      {/* Menampilkan kartu dengan data yang diambil dari API */}
      {dataTransaksi.map((data, index) => (
        <Card key={index} className="mx-auto my-4 shadow-lg notification-card">
          <Card.Body>
            <h5 className="text-muted">Payment via wallet {index + 1}</h5>

            {/* Menampilkan informasi dari setiap data transaksi */}
            <Card className="transaction-summary">
              <Card.Body>
                <Row>
                  <Col xs={12} className="d-flex justify-content-between">
                    <h6>Number</h6>
                    <p>{maskText(data.rfid_number)}</p>
                  </Col>
                  <Col xs={12} className="d-flex justify-content-between">
                    <h6>PIN</h6>
                    <p>{maskText(data.pin)}</p>
                  </Col>
                  <Col xs={12} className="d-flex justify-content-between">
                    <h6>Amount</h6>
                    <p className="text">Rp {data.amount.toLocaleString()}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Tombol Bayar dengan event handler */}
            <div className="d-flex justify-content-end mt-3">
              <Button onClick={() => handlePayment(data)} className="button">
                Bayar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Merchant;
