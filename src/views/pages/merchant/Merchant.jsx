import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Merchant() {
  const [rfid_number, setRfIdNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showAmount, setShowAmount] = useState(false);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleLanjut = (e) => {
    e.preventDefault();

    // Cek apakah nominal valid
    if (amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Nominal tidak valid",
        showConfirmButton: true,
      });
      return;
    }

    // Tampilkan form untuk input PIN setelah nominal valid
    setShow(true);
    setShowAmount(true);
  };

  const addData = async (e) => {
    e.preventDefault();

    if (!pin) {
      Swal.fire({
        icon: "error",
        title: "PIN harus diisi",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_DUMMY}/merchant/payment/wallet`,
        {
          amount: amount,
          rfid_number: rfid_number,
          pin: pin,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
            "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
          },
        }
      );

      setShow(false);
      Swal.fire({
        icon: 'success',
        title: 'Payment successful!',
        html: `
          <p style="color:#fff;">Hooray! You have completed your payment.</p>
          <p style="font-size:24px; color:#fff; font-weight: bold;">${formatRupiah(
            amount
          )}</p>`,
        background: '#4caf50',
        showConfirmButton: false,
        timer: 5000,
      }).then(() => {
        navigate("/listTransaksi"); // Redirect setelah pembayaran berhasil
      });
    } catch (error) {
      // Menangani error pada pembayaran
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Saldo Anda Tidak Cukup",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Membayar",
          showConfirmButton: false,
          timer: 4000,
        });
      }
    }
  };

  return (
    <>
      <CCard className="mt-5">
        <CCardBody>
          <CCardTitle>Merchant</CCardTitle>
          <hr />
          <br />
          <form onSubmit={show ? addData : handleLanjut}>
            {!show && (
              <>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="amount"
                    className="col-sm-2 col-form-label">
                    Amount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                  </CCol>
                </CRow>
                <CButton type="submit" className="mt-5 float-end">
                  Lanjut
                </CButton>
              </>
            )}

            {show && (
              <>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="amount"
                    className="col-sm-2 col-form-label">
                    Amount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel id="amount" className="form-control-plaintext">
                      {formatRupiah(amount)}
                    </CFormLabel>
                  </CCol>
                </CRow>

                {pin === "" ? (
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="rfid_number"
                      className="col-sm-2 col-form-label">
                      KARTU
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="password"
                        id="rfid_number"
                        disabled
                        // disabled
                      />
                    </CCol>
                  </CRow>
                ) : (
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="rfid_number"
                      className="col-sm-2 col-form-label">
                      KARTU
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="password"
                        id="rfid_number"
                        value={rfid_number}
                        onChange={(e) => setRfIdNumber(e.target.value)}
                        // disabled
                      />
                    </CCol>
                  </CRow>
                )}

                <CRow className="mb-3">
                  <CFormLabel htmlFor="pin" className="col-sm-2 col-form-label">
                    PIN
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="password"
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </CCol>
                </CRow>

                <CButton type="submit" className="mt-5 float-end">
                  Bayar
                </CButton>
              </>
            )}
          </form>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Merchant;
