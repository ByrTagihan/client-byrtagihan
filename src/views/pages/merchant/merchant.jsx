import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./../../css/merchan.css";

function Merchant() {
  // Array yang berisi beberapa data transaksi
  const dataTransaksi = [
    {
      rfid_number: "e280699500005014cca339b4001",
      pin: "123456",
      amount: 2100,
    },
    {
      rfid_number: "e280699500005014cca339b4002",
      pin: "789101",
      amount: 5000,
    },
    {
      rfid_number: "e280699500005014cca339b4003",
      pin: "112131",
      amount: 10000,
    },
  ];

  // Fungsi untuk mengubah teks menjadi bintang-bintang
  const maskText = (text) => {
    return "*****"; // Tampilkan hanya 5 bintang
  };

  return (
    <Container className="notification-screen text-center">
      <div className="header">
        <h3>Merchant</h3>
      </div>

      {/* Menampilkan semua kartu dengan warna transparan */}
      {dataTransaksi.map((data, index) => (
        <Card key={index} className="mx-auto my-4 notification-card transparent-card">
          <Card.Body>
            <h5 className="text-muted">payment via wallet {index + 1}</h5>

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

            <button className="button">Bayar</button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Merchant;
