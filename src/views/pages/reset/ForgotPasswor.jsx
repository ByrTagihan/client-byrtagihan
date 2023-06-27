import React, { useState } from "react";

// import "./../../../css/ForgotPassword.css"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import gambarEmail from "../../../assets/images/email.png";
import "../../../views/css/ForgotPassword.css";
import { API_DUMMY } from "../../../utils/baseURL";

export default function ResetPassword() {
  const [email, setEmail] = useState();
  const [unique_id, setUnique_id] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_DUMMY}/member/forgot_password`, {
        email,
        unique_id,
        // email: email,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((err) => {
        alert("Terjadi Kesalahan " + err);
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flexz-row align-items-center">
      <CContainer className="justify-content-center ccontainer">
        <CRow className="justify-content-center">
          <CCol md={8} style={{ width: "30rem", marginTop: "130px" }}>
            <CRow className="forgot">
              <p
                className="forgotPass"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Forgot Password
              </p>
              <hr />
              <CForm onSubmit={handleSubmit}>
                <p className="text-medium-emphasis"></p>
                <br />
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="email / Nisn"
                    autoComplete="email"
                    onChange={(e) => {
                      setUnique_id(e.target.value);
                      setEmail(e.target.value);
                    }}
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <button
                      style={{
                        width: "211%",
                        background: "#213555 ",
                        color: "white",
                        fontSize: "18px",
                      }}
                      className="px-4"
                      type="submit"
                    >
                      Send
                    </button>
                  </CCol>
                </CRow>
              </CForm>
            </CRow>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <img style={{ width: "90%" }} src={gambarEmail} alt="" />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
