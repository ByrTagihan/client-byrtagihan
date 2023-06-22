import {
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import React from "react";
import gambarEmail from "../../../assets/images/handphone.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import "../../../css/ForgotPasswordSiswa.css";
// import { useNavigate } from "react-router";

function ForgotPasswordSiswa() {
  const [unique_id, setUniqueId] = useState("");
  // const navigate = useNavigate();

  const Add = (e) => {
    e.preventDefault();
    const data = {
      unique_id: unique_id
    }
    axios
      .post("https://api.byrtagihan.com/api/member/forgot_password", data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Terkirim",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/login");
        window.location.reload();
      })
      .catch((err) => {
        // alert("Terjadi Kesalahan " + err);
        Swal.fire({
          icon: "error",
          title: "Nomor Hp tidak ada",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="all">
        <CRow className="justify-content-center">
          <CCol md={8} style={{ width: "30rem", marginTop: "130px" }}>
            <div>
              <p className="forgot">Forgot Password Siswa</p>
              <hr />
              <CForm onSubmit={Add}>
                <p className="text-medium-emphasis"></p>
                <br />
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <FontAwesomeIcon icon="fa-solid fa-mobile" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="No Handphone"
                    autoComplete="no Handphone"
                    required
                    value={unique_id}
                    onChange={(e) => setUniqueId(e.target.value)}
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <button
                      style={{
                        width: "211%",
                        background: "#213555 ",
                        color: "white",
                      }}
                      className="px-4"
                      type="submit"
                    >
                      Send
                    </button>
                  </CCol>
                </CRow>
              </CForm>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <img src={gambarEmail} alt="" />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default ForgotPasswordSiswa;