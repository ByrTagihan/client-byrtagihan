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
    if (localStorage.getItem("type_token") === "Merchant") {
      e.preventDefault();
      //console.log(customer_id);
      //console.log(organization_id);

      const data = {
        amount: amount,
        rfid_number: rfid_number,
        pin: pin,
      };
      try {
        await axios.post(
          `${API_DUMMY}/merchant/payment/wallet`,
          {
            amount: amount,
            rfid_number: rfid_number,
            pin: pin,
          },
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil diBayar",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log("erro: ", error.response.status);
        if (error.response.status == 400) {
          Swal.fire({
            icon: "error",
            title: "Saldo Ando Tidak Cukup",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Membayar",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai guru",
        "error"
      ).then((result) => {
        //Untuk munuju page selanjutnya
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
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
                className="col-sm-2 col-form-label">
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
