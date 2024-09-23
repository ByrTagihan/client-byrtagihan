import React, { useEffect, useState } from "react";
import gambar from "../../../assets/images/byrtagihan1.png";
import { Form, Link, useNavigate } from "react-router-dom";
import {
  CButton,
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
import "./../../../views/css/Login.css";
import Swal from "sweetalert2";
import "../../../views/pages/login/Login.css";
import { API_DUMMY } from "../../../utils/baseURL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [type_token, setType_token] = useState("Member");
  const [unique_id, setUnique_id] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setPasswordIcon("fa-solid fa-eye-slash");
  };

  const login = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      if (type_token === "Costumer") {
        const { data, status } = await axios.post(
          `${API_DUMMY}/customer/login`,
          {
            email: email,
            password: password,
          }
        );
        // Jika respon 200/ ok
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil Login Sebagai Customer",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/dashboardd");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
      // else if (type_token === "User") {
      //   const { data, status } = await axios.post(`${API_DUMMY}/user/login`, {
      //     email: email,
      //     password: password,
      //   });
      //   // Jika respon 200/ ok
      //   if (status === 200) {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Berhasil Login Sebagai User",
      //       showConfirmButton: false,
      //     });
      //     localStorage.setItem("type_token", data.data.type_token);
      //     localStorage.setItem("id", data.data.id);
      //     localStorage.setItem("token", data.data.token);
      //     navigate("/dashboardUser");
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1500);
      //   }
      // }
      else if (type_token === "Member") {
        const { data, status } = await axios.post(`${API_DUMMY}/member/login`, {
          unique_id: unique_id,
          password: password,
        });
        // Jika respon 200/ ok
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil Login Sebagai Member",
            showConfirmButton: false,
          });
          localStorage.setItem("type_token", data.data.type_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("token", data.data.token);
          navigate("/dashboardNew");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "email / Password Salah",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setUnique_id(""); // Reset unique_id when type_token changes
  }, [type_token]);

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setType_token(event.target.value);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center div">
      <CContainer className="ccontainer ">
        <CRow>
          <CCol>
            <img
              className="images1"
              style={{ width: "115%" }}
              src={gambar}
              alt=""
            />
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8} style={{ width: "30rem", marginTop: "25px" }}>
            <div>
              <p
                className="login"
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}>
                Login
              </p>
              <hr />
              <p
                className="text-medium-emphasis"
                style={{ textAlign: "center", marginBottom: "30px" }}>
                Masuk ke akun anda
              </p>
              <div className="container1">
                <div className="selector">
                  <div className="selector-item">
                    <input
                      type="radio"
                      id="radio1"
                      name="selector"
                      className="selector-item_radio"
                      checked={type_token === "Member"}
                      value="Member"
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="radio1" className="selector-item_label">
                      Siswa
                    </label>
                  </div>
                  <div className="selector-item">
                    <input
                      type="radio"
                      id="radio2"
                      name="selector"
                      className="selector-item_radio"
                      checked={type_token === "Costumer"}
                      value="Costumer"
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="radio2" className="selector-item_label">
                      Sekolah
                    </label>
                  </div>
                  {/* <div className="selector-item">
                    <input
                      type="radio"
                      id="radio3"
                      name="selector"
                      className="selector-item_radio"
                      onChange={handleOptionChange}
                      checked={type_token === "User"}
                      value="User"
                    />
                    <label htmlFor="radio3" className="selector-item_label">
                      Admin
                    </label>
                  </div> */}
                </div>
              </div>
              {
                // type_token === "User" ? (
                //   <>
                //     <CInputGroup className="mb-3">
                //       <CInputGroupText>
                //         <CIcon icon={cilUser} />
                //       </CInputGroupText>
                //       <CFormInput
                //         placeholder="email"
                //         autoComplete="email"
                //         value={email}
                //         type="email"
                //         onChange={(e) => setEmail(e.target.value)}
                //       />
                //     </CInputGroup>
                //   </>
                // )
                // :
                type_token === "Costumer" ? (
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
                ) : (
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
                )
              }
              <CInputGroup className="mb-4">
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
                />
              </CInputGroup>
              <CRow>
                <p>
                  pilih role yang diinginkan terlebih dahulu sebelum ke forgot
                  password.
                </p>
                {type_token === "Costumer" ? (
                  <CButton
                    color="link"
                    style={{
                      marginTop: "-20px",
                      marginLeft: "33.5%",
                      marginBottom: "10px",
                    }}>
                    <a href="/#/reset"> Forgot password</a>
                  </CButton>
                ) : // : type_token === "User" ? (
                //   <CButton
                //     color="link"
                //     style={{
                //       marginTop: "-20px",
                //       marginLeft: "33.5%",
                //       marginBottom: "10px",
                //     }}>
                //     <a href="/#/forgotPassUser"> Forgot password</a>
                //   </CButton>
                // )
                type_token === "Member" ? (
                  <CButton
                    color="link"
                    style={{
                      marginTop: "-20px",
                      marginLeft: "33.5%",
                      marginBottom: "10px",
                    }}>
                    <a href="/#/forgotPasswordSiswa"> Forgot password</a>
                  </CButton>
                ) : (
                  <></>
                )}
                <CCol xs={6}>
                  <button
                    type="button"
                    className="px-4"
                    onClick={login}
                    style={{
                      width: "211%",
                      background: "#213555",
                      color: "white",
                    }}>
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
