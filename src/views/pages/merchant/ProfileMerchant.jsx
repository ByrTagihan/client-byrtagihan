import {
  cilAddressBook,
  cilCreditCard,
  cilTablet,
  cilUser,
} from "@coreui/icons";
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
import { storage } from "../../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function ProfileMerchant() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [origin, setHp] = useState("");
  const [domain, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [picture, setPicture] = useState(null);
  const [foto, setFoto] = useState("");
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: "",
    unique_id: "",
    name: "",
    origin: "",
    domain: "",
    picture: "",
    balance: "",
  });

  // function add picture
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
              headers: {
                "auth-tgh": `jwt ${localStorage.getItem("token")}`,
                AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`,
              },
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

  // function update profile
  const Put = async (downloadUrl) => {
    try {
      const data = {
        name: name,
        hp: origin,
        address: domain,
        picture: downloadUrl, // Keep the existing picture value
      };
      await axios.put(
        `${API_DUMMY}/merchant/profile`,
        data,
        // //console.log(picture),
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
            AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
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

  // useEffect(() => {
  //   axios
  //     .get(`${API_DUMMY}`)
  // })

  const submit = (event) => {
    // untuk storage
    const storageRef = ref(storage, `images/${picture.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, picture)
      .then((snapshot) => {
        console.log("Upload berhasil");
        console.log(snapshot);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getDownloadURL(storageRef).then((downloadUrl) => {
          // url nya ini nanti untuk dikirim ke server API yang dimasukkan ke database
          Put(downloadUrl);
          console.log(downloadUrl);
        });
      });
  };

  const save = (e) => {
    submit();
  };
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/merchant/profile`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
          AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
        },
      })
      .then((response) => {
        const profil = response.data.data;
        setPicture(profile.picture);
        setName(profil.name);
        setAddress(profil.address);
        setUnique_id(profil.unique_id);
        setHp(profil.hp);
        setBalance(profil.balance);
        setProfile({ ...profil, id: profil.id });
        // setPassword(profil.password);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="allProfile">
      <div className="box1">
        <h4 className="textProfile">Profile Merchant</h4>
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
          <CIcon icon={cilUser} /> User: {profile.unique_id}
        </h6>
        <CForm onSubmit={add}>
          <CInputGroup className="mb-3">
            <CFormInput
              autoComplete="picture"
              onChange={(e) => setPicture(e.target.files[0])}
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

          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilCreditCard} />
            </CInputGroupText>
            <CFormInput
              placeholder="Saldo"
              autoComplete="Saldo"
              onChange={(e) => setBalance(e.target.value)}
              value={formatRupiah(balance)}
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

export default ProfileMerchant;