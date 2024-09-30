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

  const addData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const typeToken = localStorage.getItem("type_token");

    // Periksa apakah token valid dan user adalah Merchant
    if (!token || !isTokenValid() || typeToken !== "merchant") {
      Swal.fire({
        icon: "error",
        title: "Peringatan",
        text: "Anda tidak diizinkan mengakses API ini. Login dulu sebagai merchant",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/"); // Kembali ke halaman utama
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear(); // Hapus data localStorage
      });
      return; // Hentikan proses jika token tidak valid atau bukan Merchant
    }

    // Jika sudah login dan token valid, lanjutkan proses
    try {
      await axios.post(
        `${API_DUMMY}/merchant/payment/wallet`,
        {
          amount: amount,
          rfid_number: rfid_number,
          pin: pin,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Pastikan token tersimpan
          },
        }
      );
      setShow(false);

      // SweetAlert berhasil
      Swal.fire({
        icon: "success",
        title: "Berhasil diBayar",
        showConfirmButton: false,
        timer: 3000, // Tampilkan selama 3 detik
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } catch (error) {
      console.log("error: ", error.response.status);

      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Saldo Anda Tidak Cukup",
          showConfirmButton: false,
          timer: 5000, // Tampilkan selama 5 detik
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Membayar",
          showConfirmButton: false,
          timer: 4000, // Tampilkan selama 4 detik
          allowOutsideClick: false,
          allowEscapeKey: false,
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
          <form onSubmit={addData}>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="rfid_number"
                className="col-sm-2 col-form-label"
              >
                RF ID Number
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="password"
                  id="rfid_number"
                  value={rfid_number}
                  onChange={(e) => setRfIdNumber(e.target.value)}
                />
              </CCol>
            </CRow>
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
            <CRow className="mb-3">
              <CFormLabel htmlFor="amount" className="col-sm-2 col-form-label">
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
              Bayar
            </CButton>
          </form>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Merchant;
