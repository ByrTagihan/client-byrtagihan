import { cilAddressBook, cilTablet, cilUser, cilEnvelopeClosed } from "@coreui/icons";
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
import { API_DUMMY} from "../../../utils/baseURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(""); // Kolom email
  const [picture, setPicture] = useState("");
  const [foto, setFoto] = useState("");
  const imageUrl = localStorage.getItem("profilePicture");
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    name: "",
    hp: "",
    address: "",
    picture: "",
  });
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    if (foto) {
      const image = new Image();
      image.src = URL.createObjectURL(foto);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        if (width === height) {
          const data = new FormData();
          data.append("file", foto);

          axios
            .post(`${API_DUMMY}/files`, data, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((response) => {
              const imageUrl = response.data.data;
              setProfile((prevProfile) => ({
                ...prevProfile,
                picture: imageUrl,
              }));
              setFoto(imageUrl);

              localStorage.setItem("profilePicture", imageUrl);
            })
            .catch((error) => {
              // Handle error
            });

          setShow(false);
          Swal.fire({
            icon: "success",
            title: "Foto berhasil ditambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ukuran foto harus 1:1 (persegi)",
            text: "Harap unggah gambar dengan rasio aspek 1:1.",
          });
        }
      };
    }
  };

  const Put = async (e) => {
    const data = {
      name: name,
      hp: hp,
      address: address,
      email: email, // Update email field
      picture: profile.picture,
    };

    e.preventDefault();
    e.persist();

    try {
      await axios.put(
        `${API_DUMMY}/customer/profile`, data,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
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

  const get = async () => {
    const imageUrl = localStorage.getItem("profilePicture");

    setFoto(imageUrl);

    await axios
      .get(`${API_DUMMY}/customer/profile`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          })
      .then((res) => {
        const profil = res.data.data;
        setHp(profil.hp);
        setName(profil.name);
        setEmail(profil.email);
        setAddress(profil.address);
        setProfile({ ...profil, id: profil.id });
        setPicture(profile.picture)
        const imageUrl = localStorage.getItem("profilePicture");
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
        <h4 className="textProfile">Profile Customer</h4>

        <div style={{ padding: "10px" }}>
            {profile.picture ? (
              <img
                className="images2"
                style={{ width: "20rem", borderRadius: "3%" }}
                src={profile.picture}
                alt=""
              />
            ) : (
              <img
                className="images2"
                style={{ width: "20rem", borderRadius: "3%" }}
                src="https://freesvg.org/img/abstract-user-flat-4.png"
                alt=""
              />
            )}
          </div>
      </div>

      <div className="box2">
        <h6 className="mb-2">Id : {profile.id}</h6>
        <h6 className="mb-3">
          <CIcon icon={cilUser} /> email : {profile.email}
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

          {/* Kolom Email */}
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilEnvelopeClosed} />
            </CInputGroupText>
            <CFormInput
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
