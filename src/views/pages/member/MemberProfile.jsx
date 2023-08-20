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
import { API_DUMMY, API_URL } from "../../../utils/baseURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MemberProfile() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [picture, setPicture] = useState("");
  const [foto, setFoto] = useState("");
  const [profile, setProfile] = useState({
    id: "",
    unique_id: "",
    name: "",
    hp: "",
    address: "",
    picture: "",
  });
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = new FormData();
    data.append("file", foto);

    try {
      await axios
        .post(`${API_URL}/files`, data, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const imageUrl = response.data.data;
          setProfile((prevProfile) => ({
            ...prevProfile,
            picture: imageUrl,
          }));
          setFoto(imageUrl);
          //console.log(localStorage.getItem("profilePicture"));

          // Store the image URL in local storage
          localStorage.setItem("profilePicture", imageUrl);
        });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Foto berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/memberProfile");
      }, 1500);
    } catch (error) {
      //console.log(error);
    }
  };

  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const updatedProfile = {
      ...profile,
      name: name, // Update the name field with the new value
      hp: hp,
      address: address,
      picture: profile.picture, // Keep the existing picture value
    };

    try {
      await axios.put(
        `${API_DUMMY}/member/profile`,
        updatedProfile,
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
      //console.log(error);
    }
  };

  const get = async () => {
    await axios
      .get(`${API_DUMMY}/member/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const profil = res.data.data;
        setHp(profil.hp);
        setName(profil.name);
        setUnique_id(profil.unique_id);
        setAddress(profil.address);
        setProfile({ ...profil, id: profil.id });
        setPicture(profile.picture);
        //console.log(res.data.data);
        //console.log({ ...profil, id: profil.id });
        // If profilePicture is available in the response, update the picture state
        if (profil.profilePicture) {
          setFoto(profil.profilePicture);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="allProfile">
      <div className="box1">
        <h4 className="textProfile">Profile Member</h4>

        <div style={{ padding: "10px" }}>
          <img style={{ width: "20rem" }} src={profile.picture} alt="" />
        </div>
      </div>

      <div className="box2">
        <h6 className="mb-2">Id : {profile.id}</h6>
        <h6 className="mb-3">
          <CIcon icon={cilUser} /> unique_id : {profile.unique_id}
        </h6>
        <CForm onSubmit={add}>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setFoto(e.target.files[0])}
              type="file"
            />
            <CButton type="submit">Post</CButton>
          </CInputGroup>
        </CForm>
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

export default MemberProfile;