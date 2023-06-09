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
import { cilAddressBook, cilEyedropper } from "@coreui/icons";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import usePasswordToggle from "./usePasswordToggle";

const GantiPasswordCustomer = () => {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");


  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      old_password: old_password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    };

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/password`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
          

      if (new_password === confirm_new_password) {
        Swal.fire({
          icon: "success",
          title: "Successfully Edited Password",
          showConfirmButton: false,
          timer: 1500,
        });
      } 
      // else if (old_password !== old_password) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Password tidak sesuai dengan sebelumnya",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
       else {
        Swal.fire({
          icon: "error",
          title: "Different Password Confirmation",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-light min-vh-99 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={Put}>
                      <h3 style={{ color: "gray" }}>Ganti Password</h3>
                      <br />
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "26.5vh" }}>
                          Password Lama
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Lama"
                          autoComplete="passwordLama"
                          type="password"
                          onChange={(e) => setOld_password(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "26.5vh" }}>
                          Password Baru 
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Baru"
                          autoComplete="passwordBaru"
                          type="password"
                          onChange={(e) => setNew_password(e.target.value)}
                        />
                      
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>Konfirmasi Password</CInputGroupText>
                        <CFormInput
                          placeholder="Konfirmasi Password Baru"
                          autoComplete="konfirmasiPasswordBaru"
                          type="password"
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
