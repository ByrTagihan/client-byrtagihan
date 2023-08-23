import React, { useEffect } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormCheck,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
} from "@coreui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function TambahCostumer() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  let navigate = useNavigate();

  const add = async (e) => {
    if (localStorage.getItem("type_token") === "User") {
      e.preventDefault();
      e.persist();

      const data = {
        name,
        active,
        email,
        address,
        hp,
        password,
      };
      try {
        await axios.post(`${API_DUMMY}/user/customer`, data, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        // //console.log(unique_id);
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil DiTambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        // //console.log(data);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        //console.log(error);
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
    <div>
      {localStorage.getItem("type_token") === "User" ? (
        <>
          <div className="card mb-3">
            <div className="card-header bg-transparent">
              <h5>Tambah Costumer</h5>
            </div>
            <div className="card-body">
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    placeholder="Nama"
                    id="amount"
                    onChange={(e) => setName(e.target.value)}
                    label="Nama"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="Hp"
                    type="text"
                    placeholder="Hp"
                    onChange={(e) => setHp(e.target.value)}
                    label="Hp"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="address"
                    type="text"
                    placeholder="address"
                    onChange={(e) => setAddress(e.target.value)}
                    label="Address"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="Email"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    required
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
                      type={passwordType}
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6} className="d-flex align-items-center">
                  <div className="mx-auto">
                    <CFormCheck
                      id="flexCheckDefault"
                      label="Active"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                    />
                  </div>
                </CCol>

                <CCol className="d-flex justify-content-between" xs={12}>
                  <CButton className="btn-danger" onClick={handleGoBack}>
                    Kembali
                  </CButton>
                  <CButton onClick={add}>Simpan</CButton>
                </CCol>
              </CForm>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default TambahCostumer;
