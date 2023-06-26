import { CButton, CCol, CForm, CFormInput } from "@coreui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TambahOrganization() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [balance, setBalance] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [bank_account_name, setBank_account_name] = useState("");
  const [bank_name, setBank_name] = useState("");
  const navigate = useNavigate();

  const Post = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      customer_id: customer_id,
      hp: hp,
      email: email,
      address: address,
      city: city,
      provinsi: provinsi,
      balance: balance,
      bank_account_number: bank_account_number,
      bank_account_name: bank_account_name,
      bank_name: bank_name,
    };
    await axios
      .post(`${API_DUMMY}/user/organization`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/tableOrganization");
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
      <div className="card mb-3">
        <div className="card-header bg-transparent">
          <h5>Tambah transaction</h5>
        </div>
        <div className="card-body">
          <CForm onSubmit={Post} className="row g-3">
            <CCol xs={12}>
              <CFormInput
                id="name"
                label="Nama"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama..."
                required
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="customer_id"
                label="Customer_id"
                type="text"
                onChange={(e) => setCustomer_id(e.target.value)}
                placeholder="Customer Id..."
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Alamat..."
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                label="Alamat"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="No Hp..."
                id="hp"
                onChange={(e) => setHp(e.target.value)}
                label="No Hp"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Email..."
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Kota..."
                id="city"
                onChange={(e) => setCity(e.target.value)}
                label="Kota"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Provinsi..."
                id="provinsi"
                onChange={(e) => setProvinsi(e.target.value)}
                label="Provinsi"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="No Rekening..."
                id="bank_account_name"
                onChange={(e) => setBank_account_number(e.target.value)}
                label="No Rekening"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Nama Rekening..."
                id="bank_account_name"
                onChange={(e) => setBank_account_name(e.target.value)}
                label="Nama Rekening"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Nama Bank..."
                id="bank_name"
                onChange={(e) => setBank_name(e.target.value)}
                label="Nama Bank"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Saldo..."
                id="balance"
                onChange={(e) => setBalance(e.target.value)}
                label="Saldo"
                required
              />
            </CCol>

            <CCol xs={12}>
              <CButton type="submit">Simpan</CButton>
            </CCol>
          </CForm>
        </div>
      </div>
    </div>
  );
}

export default TambahOrganization;
