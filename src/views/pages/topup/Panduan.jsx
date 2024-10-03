import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./../../css/Panduan.css";
import logo from "../../../assets/images/BNILogo.png";
import { API_DUMMY } from "../../../utils/baseURL";
import axios from "axios";
import { CButton, CCard, CCardBody } from "@coreui/react";

const Panduan = () => {
  const [member, setMember] = useState({});
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isCardVisible1, setIsCardVisible1] = useState(false);

  const handleButtonClick = () => {
    setIsCardVisible(true);
  };

  const handleButtonClick1 = () => {
    setIsCardVisible1(true);
  };

  const get = async () => {
    if (localStorage.getItem("type_token") === "member") {
      try {
        const { data, status } = await axios.get(`${API_DUMMY}/member/card`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          });
        if (status === 200) {
          console.log("Data dari API:", data); // Periksa seluruh data
          console.log("Data.data:", data.data); // Periksa data.data
          console.log("name: ", data.data.name);

          // Pastikan bahwa data.data adalah array
          // if (Array.isArray(data.data)) {
          setMember(data.data);
          console.log("member: ", data.data);
          // } else {
          //   console.error("Data yang diterima bukan array");
          //   setMember([]); // Atur state ke array kosong jika data tidak valid
          // }
        }
      } catch (err) {
        console.error("Terjadi Kesalahan", err); // Gunakan console.error untuk kesalahan
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai member",
        "error"
      ).then((result) => {
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
    }
  };

  useEffect(() => {
    get();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(member.va_wallet).then(() => {
      alert("Teks berhasil disalin ke clipboard!"); // Opsional: Menampilkan alert atau pesan lain
    });
  };

  return (
    <Container style={{ padding: "20px", maxWidth: "600px" }}>
      <Row>
        <Col className="text-center">
          <h4>Panduan</h4>
        </Col>
      </Row>

      <Card className="mt-3">
        <Card.Body>
          {/* <Row>
            <Col xs={12} className="text-center mb-3"> */}
          <br />
          <img
            src={logo}
            alt="BSI Logo"
            // style={{ height: "100px", width: "80%" }}
          />
          <br />
          {/* </Col>
          </Row> */}
          <br />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>Nama Bank</p>
              <br />
              <p>Nama Akun</p>
              <p>Biaya Admin</p>
              <p>Nomor Virtual Account</p>
            </div>
            <div>
              <p>Bank Nasional Indonesia</p>
              <p>{member.name}</p>
              <p>RP. 3.000</p>
              <p style={{ color: "blue" }}>
                {member.va_wallet}{" "}
                <span onClick={handleCopy} style={{ cursor: "pointer" }}>
                  <i class="fa-regular fa-copy"></i>
                </span>
              </p>
            </div>
          </div>

          <hr />

          <h5 className="text-center">PANDUAN PEMBAYARAN BSI</h5>
          <p className="text-center">
            Anda dapat melakukan pembayaran dengan menggunakan Bank BSI Virtual
            Account dengan mengikuti langkah-langkah berikut:
          </p>

          <img style={{ width: "100px" }} src={logo} alt="" />
          <br />
          <br />
          <hr />
          <div className="d-grid gap-2">
            <CButton onClick={handleButtonClick}>
              Pembayaran Melalui BNI Mobile
            </CButton>
            {isCardVisible && (
              <CCard>
                <CCardBody>
                  <p style={{ fontWeight: "bold" }}>
                    Pembayaran Melalui BNI Mobile
                  </p>
                  <ul className="px-3" style={{ listStyleType: "decimal" }}>
                    <li>Pilih Menu Pembayaran/Payment</li>
                    <li>Pilih Akademik</li>
                    <li>
                      Masukan Id Pelanggan/Kode Bayar ... (
                      {member.va_wallet.toString().slice(-8)},{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        8 digit terakhir dari nomor VA)
                      </span>
                    </li>
                    <li>Pilih Selanjutnya</li>
                    <li>Masukan Nominal Yang Akan diTopup Kedalam Aplikasi</li>
                    <li>Masukan PIN</li>
                    <li>
                      Konfirmasi Transaksi, Pastikan Nama Dan Nominal Sudah
                      Sesuai
                    </li>
                    <li>Selanjutnya</li>
                  </ul>
                </CCardBody>
              </CCard>
            )}
            <CButton onClick={handleButtonClick1}>
              Pembayaran Melalui ATM Bank Lain
            </CButton>
            {isCardVisible1 && (
              <CCard>
                <CCardBody>
                  <p style={{ fontWeight: "bold" }}>
                    Pembayaran Melalui Mobile Banking Bank Lain:{" "}
                  </p>
                  <ul className="px-3" style={{ listStyleType: "decimal" }}>
                    <li>Pilih Menu Transfer</li>
                    <li>Pilih Menu Antar Bank</li>
                    <li>
                      Masukan Bank Tujuan{" "}
                      <span style={{ fontWeight: "bold" }}>Bank BNI</span>
                    </li>
                    <li>Masukan Nomor Va Tujuan ({member.va_wallet})</li>
                    <li>
                      Masukan Nominal Transfer, Dan Layanan Transfer Realtime
                      <span style={{ fontWeight: "bold" }}>ONLINE,</span> Lalu
                      Klik Masuk
                    </li>
                    <li>Pastikan Nama Rekening VA Dan Nominal Sudah Sesuai</li>
                    <li>Klik Selanjutnya</li>
                  </ul>
                </CCardBody>
              </CCard>
            )}
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />
      <br />
    </Container>
  );
};

export default Panduan;
