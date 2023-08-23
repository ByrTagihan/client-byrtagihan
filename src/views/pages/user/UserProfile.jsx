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
import { storage } from "../../../Firebase";
import { getDownloadURL, ref, uploadBytes} from "firebase/storage";

function UserProfile() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [origin, setHp] = useState("");
  const [domain, setAddress] = useState("");
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
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = new FormData();
    data.append("file", picture);

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
      // navigate("/lihattagihanmember")
      Swal.fire({
        icon: "success",
        title: "Foto berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // //console.log(data);
      setTimeout(() => {
        navigate("/userProfile");
        // window.location.reload();
      }, 1500);
    } catch (error) {
      //console.log(error);
    }
  };

  // function update profile
  const Put = async (e, downloadUrl) => {
    e.preventDefault();
    e.persist();

    try {
      const data = {
        name: name, // Update the name field with the new value
        hp: origin,
        address: domain,
        picture: downloadUrl, // Keep the existing picture value
      };
      await axios.put(
        `${API_DUMMY}/user/profile`,
        data,
        // //console.log(picture),
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

  // useEffect(() => {
  //   axios
  //     .get(`${API_DUMMY}`)
  // })

  const submit = (event) => {
    const storageRef = ref(storage, `Channels/${picture.name}`)

    uploadBytes(storageRef, picture)
    .then((snapshot) => {
      console.log("upload berhasil");
      console.log(snapshot);
    })
    .catch((error) => {
      console.log(error);
    })
    .finaly(() => {
      getDownloadURL(storageRef).then((downloadUrl) => {
        Put(downloadUrl);
        console.log(downloadUrl);
      })
    })
  }

  const postChannel = async (downloadUrl) => {
    try {
      const formData = {
        picture: downloadUrl,
      }
      await axios.post('add', formData, {});
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/user/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const profil = response.data.data;
        setPicture(profile.picture);
        setName(profil.name);
        setAddress(profil.address);
        setUnique_id(profil.email);
        setHp(profil.hp);
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
              onChange={(e) => setPicture(e.target.files[0])}
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
              onChange={(e) => setHp(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              value={domain}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setPicture(e.target.files[0])}
              accept="pitcure/png, pitcure/jpg, pitcure/jpeg"
              type="file"
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
