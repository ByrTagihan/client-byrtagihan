import React from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAddressBook, cilTablet, cilUser } from "@coreui/icons";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Profile() {
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
        setHp(profil.hp);
        setName(profil.name);
        setAddress(profil.address);
        setPicture(profil.picture);
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
      picture: null,
    };

    try {
      await axios.put(`https://api.byrtagihan.com/api/customer/profile`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Tersimpan",
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
    <div style={{ display: "flex", gap: "2rem" }}>
      <div
        style={{
          borderRadius: "10px",
          width: "21.5rem",
          height: "27rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <h4 style={{ textAlign: "center", padding: "10px" }}>Profile Customer</h4>
        <div style={{ padding: "10px" }}>
          <img style={{ width: "20rem" }} src={profile.picture} alt="" />
        </div>
      </div>

      <div
        style={{
          borderRadius: "10px",
          width: "40rem",
          height: "27rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "30px",
        }}
      >
        <h6 className="mb-2">Id : {profile.id}</h6>
        <h6 className="mb-3">
          <CIcon icon={cilUser} /> Email : {profile.email}
        </h6>
        <CForm onSubmit={Put}>
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
              onChange={(e) => setProfile(e.target.files[0])}
              type="file"
            />
          </CInputGroup>

          <CRow>
            <CCol xs={6}>
              <CButton type="submit" color="primary" className="px-3 py-1.5">
                Simpan
              </CButton>
            </CCol>
            <CCol xs={6}>
              <CButton
                href="/#/gantiPasswordCustomer"
                color="primary"
                style={{ textDecoration: "none" }}
              >
                Ubah Password
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </div>
    </div>
  );
}

export default Profile;
