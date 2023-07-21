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
import "../../../css/Profile.css";
import { API_DUMMY } from "../../../utils/baseURL";

function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    hp: "",
    address: "",
    picture: "",
  });

  const get = async () => {
    await axios
      .get(`${API_DUMMY}/customer/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const profil = res.data.data;
        setProfile(profil);
        setHp(profil.hp);
        setName(profil.name);
        setAddress(profil.address);
        setPicture(profile.picture);
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

    try {
      await axios.put(
        `${API_DUMMY}/customer/profile`,
        {
          name: name,
          hp: hp,
          address: address,
          picture: picture,
        },
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
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

  const [file, setFile] = useState("");

  const Post = async (e) => {
    e.preventDefault();
    const data = {
      data: file,
    };
    await axios
      .put(`${API_DUMMY}/files`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // navigate("/payment");
        Swal.fire({
          icon: "success",
          title: "Berhasil Edit foto",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="allProfile">
      <div className="box1">
        <h4 className="textProfile">Profile Customer</h4>

        <div style={{ padding: "10px" }}>
          <img style={{ width: "20rem" }} src={profile.picture} alt="" />
        </div>
      </div>

      <div className="box2">
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

          {/* <CForm onSubmit={Post}> */}
            <CInputGroup className="mb-3">
              <CFormInput
                autoComplete="picture"
                placeholder="link picture"
                onChange={(e) => setPicture(e.target.value)}
                // value={file}
                type="link"
              />
              {/* <button type="submit">Post</button> */}
            </CInputGroup>
          {/* </CForm> */}

          <CRow>
            <CCol xs={6}>
              <CButton className="buttonSave" type="submit" color="primary">
                Simpan
              </CButton>
            </CCol>
            <CCol xs={6}></CCol>
          </CRow>
        </CForm>
      </div>
    </div>
  );
}

export default Profile;