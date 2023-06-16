import React from "react";
import { CButton, CCol, CForm, CFormInput } from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TambahPayment() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [periode, setPeriode] = useState("");
  let navigate = useNavigate();

  const Post = async (e) => {
    e.preventDefault();
    const data = {
      description: description,
      periode: periode,
      amount: amount,
    };
    await axios
      .post(`https://api.byrtagihan.com/api/user/payment`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/payment");
        Swal.fire({
          icon: "success",
          title: "Berhasil DiTambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "member" ? (
        <div className="card mb-3">
          <div className="card-header bg-transparent">
            <h5>Tambah Payment</h5>
          </div>
          <div className="card-body">
            <CForm onSubmit={Post} className="row g-3">
              <CCol xs={12}>
                <CFormInput
                  id="description"
                  label="Description"
                  type="text"
                  placeholder="Description..."
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  placeholder="Amount..."
                  id="amount"
                  label="Amount"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="date"
                  id="periode"
                  placeholder="Periode..."
                  label="Periode"
                  required
                />
              </CCol>

              <CCol xs={12}>
                <CButton type="submit">Simpan</CButton>
              </CCol>
            </CForm>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TambahPayment;
