
import { cilAddressBook, cilTablet, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import "../../../css/Profile.css";
import axios from "axios";
import { API_DUMMY } from "../../../utils/baseURL";
import Swal from "sweetalert2";

function UserProfile() {
const [name, setName] = useState("");
const [hp, setHp] = useState("");
const [address, setAddress] = useState("");
const [email, setEmail] = useState("");
const [picture, setPicture] = useState("");
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    name: "",
    hp: "",
    address: "",
    picture: "",
  });

  const get = async () => {
      await axios
        .get(`https://api.byrtagihan.com/api/user/profile`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const profil = res.data.data[0];
          setHp(profil.hp);
          setName(profil.name);
          setProfile({ ...profil, email: profil.email });
          setAddress(profil.address);
          setPicture(profile.picture);
          setProfile({ ...profil, id: profil.id }); 
          console.log(res.data.data[0]);
          console.log({ ...profil, id: profil.id });
        })
        .catch((error) => {
          alert("Terjadi Kesalahan" + error);
        });
    };

  useEffect(() => {
    get();
  }, []);
  
  const [show, setShow] = useState(false);
  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.put(
        `${API_DUMMY}/user/profile`,
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

  return (
    <div className="allProfile">
      <div className="box1">
        <h4 className="textProfile">Profile User</h4>

        <div style={{ padding: "10px" }}>
          <img style={{ width: "20rem" }} src={profile.picture} alt="" />
        </div>
      </div>

      <div className="box2">
        <h6 className="mb-2">Id : {profile?.id}</h6>
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

export default UserProfile;