import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import React, { useState } from "react";

function KonfirmasiPassword() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordIcon1, setPasswordIcon1] = useState("fa-solid fa-eye-slash");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setPasswordIcon("fa-solid fa-eye-slash");
  };

  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text");
      setPasswordIcon1("fa-solid fa-eye");
      return;
    }
    setPasswordType1("password");
    setPasswordIcon1("fa-solid fa-eye-slash");
  };
  return (
    <>
      <div
        style={{
          width: "40%",
          border: "1px solid gray",
          padding: "20px",
          display: "block",
          marginTop: "7%",
          marginLeft: "30%",
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <hr />
        <p style={{ fontWeight: "bold", fontSize: "21px" }}>
          Buat Password Baru
        </p>
        <br />
        <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
          Password :
        </label>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <span onClick={togglePassword}>
              <i class={passwordIcon}></i>
            </span>
          </CInputGroupText>
          <CFormInput
            placeholder="Password"
            autoComplete="Password"
            type={passwordType}
            required
          />
        </CInputGroup>
        <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
          Konfirmasi Password :
        </label>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <span onClick={togglePassword1}>
              <i class={passwordIcon1}></i>
            </span>
          </CInputGroupText>
          <CFormInput
            placeholder="Konfirmasi Password"
            autoComplete="Password"
            type={passwordType1}
            required
          />
        </CInputGroup>
        <button className="btn btn-primary">Setel ulang password</button>
        <hr />
      </div>
    </>
  );
}

export default KonfirmasiPassword;
