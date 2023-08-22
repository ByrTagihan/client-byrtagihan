import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../utils/baseURL";
import {
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import axios from "axios";
import Swal from "sweetalert2"; // Import Swal for alerts

function ForgotPassUser() {
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_DUMMY}/user/forgot_password`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: "Password reset link sent to your email.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/userVerification");
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error",
        });
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
                Forgot Password Guru
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
                    placeholder="Email"
                    autoComplete="Email"
                    onChange={(e) => {
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
        <img
          style={{ width: "55%" }}
          src="https://static.vecteezy.com/system/resources/previews/016/774/705/original/email-with-bell-notification-chat-message-alert-new-event-web-icon-3d-illustration-png.png"
          alt=""
        />
      </CContainer>
    </div>
  );
}

export default ForgotPassUser;
