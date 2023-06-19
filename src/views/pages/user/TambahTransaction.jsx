import React from "react";
import { CButton, CCol, CForm, CFormInput } from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function TambahTransaction() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [organization_id, setOrganizationId] = useState("");
  const [member_id, setMemberId] = useState("");
  let navigate = useNavigate();

  const Post = async (e) => {
    e.preventDefault();
    const data = {
      organization_id: organization_id,
      member_id: member_id,
      description: description,
      amount: amount,
    };
    await axios
      .post(`https://api.byrtagihan.com/api/user/transaction`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/transaction");
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
            <h5>Tambah transaction</h5>
          </div>
          <div className="card-body">
            <CForm onSubmit={Post} className="row g-3">
              <CCol xs={12}>
                <CFormInput
                  id="description"
                  label="Description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  placeholder="Amount..."
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  label="Amount"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  id="organizationId"
                  onChange={(e) => setOrganizationId(e.target.value)}
                  placeholder="Organization..."
                  label="Organization"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  onChange={(e) => setMemberId(e.target.value)}
                  id="memberId"
                  placeholder="Member..."
                  label="Member"
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

export default TambahTransaction;
