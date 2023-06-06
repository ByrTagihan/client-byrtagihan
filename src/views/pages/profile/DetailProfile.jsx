import React, { useState } from "react";
import { useEffect } from "react";
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
import { cilAddressBook, cilTablet, cilUser } from "@coreui/icons";
import axios from "axios";


const DetailProfile = () => {

// const [email, setEmail] = useState("");
// const [nama, setNama] = useState("");
// const [hp, setHp] = useState("");
// const [alamat, setAlamat] = useState("");
// const [profile, setProfile] = useState({
//   nama: "",
//   email: "",
//   hp: "",
//   alamat: "",
// });

// const getAll = async () => {
//   await axios
//     .get(`http://localhost:3000/postingans`)
//     .then((res) => {
//       setProfile(res.data.data);
//       console.log(res.data.data);
//     })
//     .catch((error) => {
//       alert("Terjadi Kesalahan" + error);
//     });
// };

// useEffect(() => {
//   getAll(0);
// }, []);
  return (
    <div>
      <div className="bg-light min-vh-99 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h3>Profile Customer</h3>
                      <br />

                      <p className="mb-3">Id : </p>
                      <p className="mb-3">
                        <CIcon icon={cilUser} /> Email : 
                        {/* {profile.email} */}
                      </p>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nama"
                          autoComplete="username"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilTablet} />
                        </CInputGroupText>
                        <CFormInput placeholder="No Hp" autoComplete="hp" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAddressBook} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Alamat"
                          autoComplete="alamat"
                        />
                      </CInputGroup>

                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-3 py-1.5">
                            Simpan
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5">
                  <CCardBody className="text-center">
                    <div>
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Update Foto
                      </CButton>

                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTImk8eQKoXGjObbR2hHG1XBE_TpIeiRwMDlg&usqp=CAU"
                        alt=""
                      />
                    </div>
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

export default DetailProfile;
