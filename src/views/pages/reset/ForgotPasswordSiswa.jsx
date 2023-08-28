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
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import "../../../css/ForgotPasswordSiswa.css";
import { API_DUMMY } from "../../../utils/baseURL";
import CIcon from "@coreui/icons-react";
import { cilMobile } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

function ForgotPasswordSiswa() {
  const [unique_id, setUniqueId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_DUMMY}/member/forgot_password`, {
        unique_id: unique_id,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: "Password reset link sent to your number.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/memberVerification");
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
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
              <CForm onSubmit={handleSubmit}>
                <p className="text-medium-emphasis"></p>
                <br />
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMobile} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="unique_id"
                    autoComplete="unique_id"
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
