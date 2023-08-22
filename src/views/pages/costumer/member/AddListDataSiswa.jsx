import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

function AddListDataSiswa() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  let navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      unique_id,
      name,
      address,
      hp,
      password,
    };
    try {
      await axios.post(`${API_DUMMY}/customer/member`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/customerMember");
        window.location.reload();
      }, 1500);
    } catch (error) {
      //console.log(error);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setPasswordIcon("fa-solid fa-eye-slash");
  };

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <CCard>
      {localStorage.getItem("type_token") === "Customer" ? (
        <>
          <CCardHeader className="card-header bg-transparent">
            <h4>Tambah Data Siswa</h4>
          </CCardHeader>
          <CCardBody className="card-body">
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormInput
                  label="Unique_id"
                  placeholder="Unique id"
                  autoComplete="Unique id"
                  onChange={(e) => setUnique_id(e.target.value)}
                  value={unique_id}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Name"
                  placeholder="Name"
                  autoComplete="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </CCol>
              <CCol md={6}>
                <CFormTextarea
                  label="Address"
                  placeholder="Address"
                  autoComplete="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="No Hp"
                  placeholder="No hp"
                  autoComplete="No hp"
                  onChange={(e) => setHp(e.target.value)}
                  value={hp}
                />
              </CCol>
              <CCol md={6}>
              <CFormLabel>Password</CFormLabel>
                <CInputGroup>
                  <CInputGroupText>
                    <span onClick={togglePassword}>
                      <i className={passwordIcon}></i>
                    </span>
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Password"
                    autoComplete="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </CInputGroup>
              </CCol>

              <CCol className="d-flex justify-content-between" xs={12}>
                <CButton className="btn-danger" onClick={handleGoBack}>
                  Kembali
                </CButton>
                <CButton onClick={add}>Simpan</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}{" "}
    </CCard>
  );
}

export default AddListDataSiswa;
