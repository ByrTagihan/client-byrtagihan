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
  const [balance, setBalance] = useState(0);
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

    Swal.fire({
      title: "Apakah anda yakin dengan transaksi " + formatRupiah(amount) + "?",
      text: "Masukan amount dengan teliti dan benar !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShow(true);
        setShowAmount(true);
      }
    });
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
            AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
          },
        }
      );
      setBalance(response.data.data.balance);
      console.log("balance: ", response.data.data.balance);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil!",
        html: `
          <p style="color:#fff;">Selamat! Pembayaran Anda telah selesai.</p>
          <p style="font-size:24px; color:#fff; font-weight: bold;">${formatRupiah(
            amount
          )}</p>
          <p style="font-wight; bold, color: white; font-size: 20px">Saldo Sekarang Rp.${formatRupiah(
            response.data.data.balance
          )}<p/>`,
        background: "#4caf50",
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
                {/* {pin === "" ? (
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
                      />
                    </CCol>
                  </CRow>
                ) : ( */}
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
                      required
                      // disabled
                    />
                  </CCol>
                </CRow>
                {/* )} */}
                <CRow className="mb-3">
                  <CFormLabel htmlFor="pin" className="col-sm-2 col-form-label">
                    PIN
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="password"
                      id="pin"
                      value={pin}
                      required
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </CCol>
                </CRow>
                {pin === "" || rfid_number === "" ? (
                  <CButton type="disabled" disabled className="mt-5 float-end">
                    Bayar
                  </CButton>
                ) : (
                  <>
                    {" "}
                    <CButton type="submit" className="mt-5 float-end">
                      Bayar
                    </CButton>
                  </>
                )}
                <CButton
                  color="danger"
                  onClick={() => setShow(false)}
                  className="mt-5 mr-4">
                  Batal
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
