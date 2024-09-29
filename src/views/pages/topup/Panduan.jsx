import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./../../css/Panduan.css";

const Panduan = () => {
  return (
    <Container style={{ padding: '20px', maxWidth: '600px' }}>
      <Row>
        <Col className="text-center">
          <h4>Panduan</h4>
        </Col>
      </Row>

      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col xs={12} className="text-center mb-3">
              <img
                src="https://jurnalislam.com/wp-content/uploads/2021/02/logo-bsi.png"
                alt="BSI Logo"
                style={{ height: "100px", width :"80%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p><strong>Nama Bank</strong></p>
              <p><strong>Nama Akun</strong></p>
              <p><strong>Biaya Admin</strong></p>
              <p><strong>Nomor Virtual Account</strong></p>
            </Col>
            <Col xs={6} className="text-end">
              <p>Bank Syariah Indonesia</p>
              <p>KRISNA ABDUL RASYID PUSPITO SUGIYARTO</p>
              <p>Rp. 3.000</p>
              <p style={{ color: 'blue' }}>900799900000699 <img src="https://img.icons8.com/ios-filled/20/000000/copy.png" alt="copy" /></p>
            </Col>
          </Row>

          <hr />

          <h5 className="text-center">PANDUAN PEMBAYARAN BSI</h5>
          <p className="text-center">
            Anda dapat melakukan pembayaran dengan menggunakan Bank BSI Virtual
            Account dengan mengikuti langkah-langkah berikut:
          </p>

          <div className="d-grid gap-2">
            <Button variant="info" size="lg">
              Pembayaran Melalui BSI Mobile
            </Button>
            <Button variant="info" size="lg">
              Pembayaran Melalui ATM BSI
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Panduan;
