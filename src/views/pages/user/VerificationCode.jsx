import React, { useState } from "react";
import "../../../views/css/ForgotPassword.css";
import { CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCode } from "@coreui/icons";
import { API_DUMMY } from "../../../utils/baseURL";
import axios from "axios";
import Swal from "sweetalert2";

function VerificationCode() {
    const [verification_code, setVerificationCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post(`${API_DUMMY}/user/verification_code`, {
            code: verification_code
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
                Verifikasi Code
              </p>
              <hr />
              <CForm onSubmit={handleSubmit}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCode} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Verifikasi Code"
                    autoComplete="verifikasi Code"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verification_code}
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
                      Submit
                    </button>
                  </CCol>
                </CRow>
              </CForm>
            </CRow>
          </CCol>
        </CRow>
            <img style={{ width: "40%"}} src="https://cdn3d.iconscout.com/3d/premium/thumb/security-check-6877543-5639689.png" alt="" />
      </CContainer>
    </div>
  );
}

export default VerificationCode;
