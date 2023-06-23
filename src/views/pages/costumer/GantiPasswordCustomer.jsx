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
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import "../../../css/GantiPasswordCustomer.css"
import { API_DUMMY } from "../../../utils/baseURL";


const GantiPasswordCustomer = () => {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");
  const navigate = useNavigate();

  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      old_password: old_password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    };

    try {
      await axios
        .put(`${API_DUMMY}/customer/password`, data, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "Sukses mengedit password",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 1500);
    } catch (eror) {
      Swal.fire({
        icon: "error",
        title: "Password lama tidak sesuai",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="bg-light min-vh-99 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9}>
              <CCardGroup>
                <CCard className="card">
                  <CCardBody>
                    <CForm onSubmit={Put}>
                      <h3 className="title">Ganti Password</h3>
                      <br />
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="inputText">
                          Password Lama
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Lama"
                          autoComplete="passwordLama"
                          required
                          type="password"
                          onChange={(e) => setOld_password(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText className="inputText">
                          Password Baru
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Baru"
                          autoComplete="passwordBaru"
                          required
                          type="password"
                          onChange={(e) => setNew_password(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText className="inputText">
                          Konfirmasi Password
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Konfirmasi Password Baru"
                          autoComplete="konfirmasiPasswordBaru"
                          type="password"
                          required
                          onChange={(e) =>
                            setConfirm_new_password(e.target.value)
                          }
                        />
                      </CInputGroup>

                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            type="submit"
                            color="primary"
                            className="px-3 py-1.5"
                          >
                            Simpan
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default GantiPasswordCustomer;
