import React, { useState } from "react";
import gambar from "../../../assets/images/byrtagihan1.png";
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
import "./../../../css/Login.css";
import Swal from "sweetalert2";

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
    e.persist();

    try {
      if (type_token === "admin Sekolah") {
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
          alert("Successfully logged in Customer");
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/dashboard");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else if (type_token === "guru") {
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
            title: "Successfully logged in as user",
            showConfirmButton: false,
          });
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/dashboard");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else if (type_token === "siswa") {
        const { data, status } = await axios.post(
          "https://api.byrtagihan.com/api/member/login",
          {
            unique_id: unique_id,
            password: password,
          }
        );
        // Jika respon 200/ ok
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Successfully logged in as member",
            showConfirmButton: false,
          });
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/dashboard");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      alert("username/Password No Valid");
      console.log(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center div">
      <CContainer className="ccontainer ">
        <CRow>
          <CCol>
            <img style={{ width: "100%" }} src={gambar} alt="" />
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8} style={{ width: "30rem", marginTop: "25px" }}>
            <div>
              <p
                className="login" style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Login
              </p>
              <hr />
              <p
                className="text-medium-emphasis"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                Sign In to your account
              </p>
              <select
                className="selectt"
                style={{ background: "white", color: "black" }}
                aria-label="Default select example"
                onChange={(e) => setType_token(e.target.value)}
              >
                <option selected>Select Roles</option>
                <option value="guru">guru</option>
                <option value="admin Sekolah">admin Sekolah</option>
                <option value="siswa">siswa</option>
              </select>
              {type_token === "siswa" ? (
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
                {type_token === "siswa" ? (
                  <>
                    <CButton
                      color="link"
                      style={{
                        marginTop: "-20px",
                        marginLeft: "33.5%",
                        marginBottom: "10px",
                      }}
                    >
                      <a href="/#/resetpassiswa"> Forgot password</a>
                    </CButton>
                  </>
                ) : type_token === "admin Sekolah" ? (
                  <>
                    <CButton
                      color="link"
                      style={{
                        marginTop: "-20px",
                        marginLeft: "33.5%",
                        marginBottom: "10px",
                      }}
                    >
                      <a href="/#/reset"> Forgot password</a>
                    </CButton>
                  </>
                ) : (
                  <></>
                )}
                <CCol xs={6}>
                  <button
                    className="px-4"
                    onClick={login}
                    style={{
                      width: "211%",
                      background: "#213555",
                      color: "white",
                    }}
                  >
                    Login
                  </button>
                </CCol>
              </CRow>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
