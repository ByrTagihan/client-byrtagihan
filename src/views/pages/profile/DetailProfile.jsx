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
import Swal from "sweetalert2";

const DetailProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    hp: "",
    address: "",
    picture: null,
  });

  const get = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const profil = res.data.data;
        setProfile(profil);
        setHp(profil.hp)
        setName(profil.name)
        setAddress(profil.address)
        setPicture(profil.picture)
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    get(0);
  }, []);

  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name: name,
      hp: hp,
      address: address,
      picture: picture,
    };

    try {
      await axios.put(`https://api.byrtagihan.com/api/customer/profile`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "berhasil mengedit",
        showConfirmButton: false,
        timer: 1500,
      });
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
                      <h3>Profile Customer</h3>
                      <br />

                      <p className="mb-1">Id : {profile.id}</p>
                      <p className="mb-3">
                        <CIcon icon={cilUser} /> Email : {profile.email}
                      </p>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Name"
                          autoComplete="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilTablet} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="No Hp"
                          autoComplete="hp"
                          onChange={(e) => setHp(e.target.value)}
                          value={hp}
                        />
                      </CInputGroup>


                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAddressBook} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Address"
                          autoComplete="address"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CFormInput
                          autoComplete="picture"
                          onChange={(e) => setPicture(e.target.files[0])}
                          type="file"
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
                <CCard className="text-white bg-primary py-5">
                  <CCardBody className="text-center">
                    <div>
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                        data-coreui-toggle="modal"
                        data-coreui-target="#exampleModal"
                      >
                        Update Foto
                      </CButton>

                      <img
                        style={{ height: "40vh" }}
                        alt=""
                        src={profile.picture}
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
