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
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [domain, setDomain] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [picture, setPicture] = useState("");
  const [foto, setFoto] = useState("");
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: "",
    unique_id: "",
    name: "",
    origin: "",
    domain: "",
    picture: "",
  });

  // function add picture
  // const add = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   const data = new FormData();
  //   data.append("file", foto);

  //   try {
  //     await axios
  //       .post(`${API_DUMMY}/files`, data, {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       })
  //       .then((response) => {
  //         const imageUrl = response.data.data;
  //         setProfile((prevProfile) => ({
  //           ...prevProfile,
  //           picture: imageUrl,
  //         }));
  //         setFoto(imageUrl);
  //         console.log(localStorage.getItem("profilePicture"));

  //         // Store the image URL in local storage
  //         localStorage.setItem("profilePicture", imageUrl);
  //       });
  //     setShow(false);
  //     // navigate("/lihattagihanmember")
  //     Swal.fire({
  //       icon: "success",
  //       title: "Foto berhasil ditambahkan",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     // console.log(data);
  //     setTimeout(() => {
  //       navigate("/userProfile");
  //       // window.location.reload();
  //     }, 1500);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // function update profile
  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      const data = {
        name: name, // Update the name field with the new value
        hp: origin,
        address: domain,
        picture: picture, // Keep the existing picture value
      };
      await axios.put(
        `${API_DUMMY}/user/profile`,
        data,
        // console.log(picture),
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

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/user/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const profil = response.data.data;
        setPicture(profile.picture);
        setName(profil.name);
        setDomain(profil.domain);
        setUnique_id(profil.email);
        setOrigin(profil.origin);
        setProfile({ ...profil, id: profil.id });
        // setPassword(profil.password);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, []);

  return (
    <div className="allProfile">
      <div className="box1">
        <h4 className="textProfile">Profile User</h4>
        <div style={{ padding: "10px" }}>
          <img style={{ width: "20rem", borderRadius:"3%" }} src={profile.picture} alt="" />
        </div>
      </div>

      <div className="box2">
        <h6 className="mb-2">Id : {profile.id}</h6>
        <h6 className="mb-3">
          <CIcon icon={cilUser} /> email: {profile.email}
        </h6>
        {/* <CForm onSubmit={add}>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setFoto(e.target.files[0])}
              type="file"
            />
            <CButton type="submit">Post</CButton>
          </CInputGroup>
        </CForm> */}
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
              placeholder="No origin"
              autoComplete="origin"
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilAddressBook} />
            </CInputGroupText>
            <CFormInput
              placeholder="domain"
              autoComplete="domain"
              onChange={(e) => setDomain(e.target.value)}
              value={domain}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setPicture(e.target.value)}
              // accept="image/png, image/jpg, image/jpeg"
              // type="file"
              value={picture}
            />
            {/* <CButton type="submit">Post</CButton> */}
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

export default UserProfile;
