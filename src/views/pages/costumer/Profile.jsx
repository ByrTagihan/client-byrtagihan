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

function Profile() {
  const [show, setShow] = useState(false);
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
    picture: picture,
  });
  const navigate = useNavigate();

  // const Put = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   const data = new FormData();
  //   data.append("file", picture);

  //   try {
  //     await axios.put(
  //       ${API_DUMMY}/customer/profile,
  //       {
  //         name: name,
  //         hp: hp,
  //         address: address,
  //         picture: picture,
  //       },
  //       {
  //         headers: { "auth-tgh": jwt ${localStorage.getItem("token")} },
  //       }
  //     ),
  //       await axios
  //         .post(${API_DUMMY}/files, data, {
  //           headers: { "auth-tgh": jwt ${localStorage.getItem("token")} },
  //         })
  //         .then((response) => {
  //           const imageUrl = response.data.data;
  //           setProfile((prevProfile) => ({
  //             ...prevProfile,
  //             picture: imageUrl,
  //           }));
  //           setPicture(imageUrl);

  //           localStorage.setItem("profilePicture", imageUrl);
  //         });
  //     setShow(false);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Tersimpan",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1500);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          headers: { "auth-tgh": jwt `${localStorage.getItem("token")}`},
        }
      ),
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

  const Post = async (e) => {
    e.preventDefault();
    e.persist();

    const data = new FormData();
    data.append("file", picture);

    try {
      await axios
        .post(`${API_DUMMY}/files`, data, {
          headers: { "auth-tgh": jwt `${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const imageUrl = response.data.data;
          setProfile((prevProfile) => ({
            ...prevProfile,
            picture: imageUrl,
          }));
          setPicture(imageUrl);

          localStorage.setItem("profilePicture", imageUrl);
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

const get = async () => {
    await axios
      .get(`${API_DUMMY}/customer/profile`, {
        headers: { "auth-tgh": jwt `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const profil = res.data.data;
        setHp(profil.hp);
        setName(profil.name);
        setEmail(profil.email);
        setAddress(profil.address);
        setProfile({ ...profil, id: profil.id });
        // console.log(res.data.data);
        // console.log(res.data.data[0]);
        console.log({ ...profil, id: profil.id });
        const imageUrl = localStorage.getItem("profilePicture");
        setPicture(imageUrl);
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
        <h4 className="textProfile">Profile Customer</h4>

        <div className="prof">
          <img className="profilee" src={picture} alt="picture" />
        </div>
      </div>

      <div className="box2">
        <h6 className="mb-2">Id : {profile.id}</h6>
        <h6 className="mb-3">
          <CIcon icon={cilUser} /> Email : {profile.email}
        </h6>
        <CForm onSubmit={Post}>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setPicture(e.target.files[0])}
              type="file"
            />
            <CButton type="submit" color="primary">
              Post
            </CButton>
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

export default Profile;