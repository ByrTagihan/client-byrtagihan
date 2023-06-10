import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import "./../../../css/Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [type_token, setType_token] = useState("");
  const [unique_id, setUnique_id] = useState("");

  // const [passwordType, setPasswordType] = useState("password");
  // const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");

  // const togglePassword = () => {
  //   if (passwordType === "password") {
  //     setPasswordType("text");
  //     setPasswordIcon("fa-solid fa-eye");
  //     return;
  //   }
  //   setPasswordType("password");
  //   setPasswordIcon("fa-solid fa-eye-slash");
  // };

  const login = async (e) => {
    e.preventDefault();

    try {
      if(type_token === "admin Sekolah") {
      const { data, status } = await axios.post(
        "https://api.byrtagihan.com/api/customer/login",
        {
          email: email,
          password: password,
        }
      );
      // Jika respon 200/ ok
      if (status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title:  "Successfully logged in",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        alert("Successfully logged in Customer")
        localStorage.setItem("type_token", data.data.type_token);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("token", data.data.token);
        navigate("/#/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
      }
      }

        const { data, status } = await axios.post(
          "https://api.byrtagihan.com/api/user/login",
          {
            email: email,
            password: password,
          }
        );
        // Jika respon 200/ ok
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Successfully logged in as " + localStorage.getItem("type_token"),
            showConfirmButton: false,
          });
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if(type_token === "siswa") {
          const { data, status } = await axios.post(
            "https://api.byrtagihan.com/api/member/login",
            {
              unique_id : unique_id,
              password: password,
            }
          );
          // Jika respon 200/ ok
          if (status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successfully logged in as " + localStorage.getItem("type_token"),
              showConfirmButton: false,
            });
            localStorage.setItem("type_token", data.data.type_token);
            localStorage.setItem("id", data.data.id);
            localStorage.setItem("token", data.data.token);
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        // Jika respon 200/ ok
        if (status === 200) {
          alert("Success");
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("toke", data.data.token);
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      alert("username/ Password No Valid");
      console.log(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 style={{ color: "black" }}>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <select className="selectt" aria-label="Default select example" onChange={(e) => setType_token(e.target.value)}>
                      <option>Select Roles</option>
                      <option value="guru">guru</option>
                      <option value="admin Sekolah">admin Sekolah</option>
                      <option value="siswa">siswa</option>
                    </select>
                    {type_token === "member" ? (
                      <>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="unique_id"
                        autoComplete="unique_id"
                        value={unique_id}
                        type="text"
                        onChange={(e) => setUnique_id(e.target.value)}
                      />
                    </CInputGroup>
                      </>
                    ) : (
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="email"
                          autoComplete="email"
                          value={email}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CInputGroup>
                    )}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={login}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          <a href="/#/reset"> Forgot password?</a>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Log In</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
