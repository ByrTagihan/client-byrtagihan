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
  const [show, setShow] = useState(false); // Control visibility of PIN input for Siswa
  const [showAmount, setShowAmount] = useState(false); // Control display of amount as label

  // Format amount as Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleLanjut = (e) => {
    e.preventDefault();
    // Ensure amount is entered
    if (amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Nominal tidak valid",
        showConfirmButton: true,
      });
      return;
    }

    // Move to the next step (enter PIN)
    setShow(true);
    setShowAmount(true);
  };

  const addData = async (e) => {
    e.preventDefault();

    // Periksa apakah token valid dan user adalah Merchant
    if (localStorage.getItem("type_token") === "merchant") {
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
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Pastikan token tersimpan
            },
          }
        );
        setShow(false);

        Swal.fire({
          icon: 'success',
          title: '<h2 style="color:#fff;">Payment successful!</h2>',
          html: `
            <div style="
              background-color: #28a745;
              border-radius: 50%;
              padding: 20px;
              display: inline-block;
              margin-bottom: 20px;
            ">
              // <i class="fa-solid fa-check" style="font-size: 50px; color: white;"></i>
            </div>
            <p style="color: white; font-size: 18px;">Hooray! You have completed your payment.</p>
            <p style="color: white; font-size: 22px;">AMOUNT PAID</p>
             <p style="font-size:24px; color:#fff; font-weight: bold;">${formatRupiah(
              amount
            )}</p>
            <div style="background-color: #ffc107; padding: 10px; border-radius: 5px; color: black;">
              Rp${(
              amount * 0.1
            ).toFixed(3)} 
            </div>
            <br>
            <p style="color: white; font-size: 16px;">How was your payment experience?</p>
            <button style="background-color: #28a745; border: none; border-radius: 50%; padding: 10px; cursor: pointer; margin-right: 10px;">
              <i class="fa-solid fa-thumbs-up" style="font-size: 30px; color: white;"></i>
            </button>
            <button style="background-color: #dc3545; border: none; border-radius: 50%; padding: 10px; cursor: pointer;">
              <i class="fa-solid fa-thumbs-down" style="font-size: 30px; color: white;"></i>
            </button>
          `,
          background: '#4caf50',  // Green background for the SweetAlert2 popup
          showConfirmButton: false,
          timer: 5000, // Auto-close after 5 seconds
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        
        // SweetAlert berhasil dengan tampilan kustom
        Swal.fire({
          icon: "success",
          title: '<h2 style="color:#fff;">Payment successful!</h2>',
          html: `
            <p style="color:#fff;">Hooray! You have completed your payment.</p>
            <hr style="color:#fff;"/>
            <p style="font-size:20px; color:#fff;">AMOUNT PAID</p>
            <p style="font-size:24px; color:#fff; font-weight: bold;">${formatRupiah(
              amount
            )}</p>
            <p style="background-color:#FFC107; color:#fff; padding:10px; border-radius:5px; font-size:16px;">Rp${(
              amount * 0.1
            ).toFixed(3)} Cashback</p>
            <hr style="color:#fff;"/>
            <p style="margin-top:20px; color:#fff;">HOW WAS YOUR PAYMENT EXPERIENCE?</p>
            <button style="background: none; border: none; cursor: pointer;">
  <i class="fa-solid fa-thumbs-up" style="font-size: 40px; color: white;"></i>
</button>
<button style="background: none; border: none; cursor: pointer;">
  <i class="fa-solid fa-thumbs-down" style="font-size: 40px; color: white;"></i>
</button>

          `,
          background: "#4CAF50",
          showConfirmButton: false,
          timer: 4000, // Tampilkan selama 4 detik
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          // Redirect atau reload halaman transaksi untuk menampilkan data baru
          navigate("/listTransaksi"); // Arahkan ke halaman daftar transaksi
        });
      } catch (error) {
        console.log("error: ", error.response?.status);

        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Saldo Anda Tidak Cukup",
            showConfirmButton: false,
            timer: 2000, // Tampilkan selama 2 detik
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
                    className="col-sm-2 col-form-label"
                  >
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
                    className="col-sm-2 col-form-label"
                  >
                    Amount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel id="amount" className="form-control-plaintext">
                      {formatRupiah(amount)}
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="rfid_number"
                    className="col-sm-2 col-form-label"
                  >
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
