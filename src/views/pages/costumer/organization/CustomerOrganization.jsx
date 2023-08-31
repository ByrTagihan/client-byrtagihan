import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCard,
  CCardBody,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import { AppSidebar } from "../../../../components";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import { useNavigate } from "react-router-dom";

function CustomerOrganization() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [balance, setBalance] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [bank_account_name, setBank_account_name] = useState("");
  const [bank_name, setBank_name] = useState("");
  let navigate = useNavigate();
  //
  const [organization, setOrganization] = useState({
    // id: "",
    name: "",
    address: "",
    hp: "",
    email: "",
    city: "",
    provinsi: "",
    bank_account_number: "",
    bank_account_name: "",
    bank_name: "",
  });

  const get = async () => {
    if (localStorage.getItem("type_token") === "Customer") {
      await axios
        .get(`${API_DUMMY}/customer/organization`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const organization = res.data.data;
          // //console.log(res.data.data);
          setOrganization(organization);
          setId(organization.id);
          setName(organization.name);
          setAddress(organization.address);
          setHp(organization.hp);
          setEmail(organization.email);
          setCity(organization.city);
          setProvinsi(organization.provinsi);
          setBalance(organization.balance);
          setBank_account_number(organization.bank_account_number);
          setBank_account_name(organization.bank_account_name);
          setBank_name(organization.bank_name);
          // //console.log(res.data.data);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan" + error);
        });
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai admin",
        "error"
      ).then((result) => {
        //Untuk munuju page selanjutnya
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
    }
  };

  useEffect(() => {
    get(0);
  }, []);

  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name: name,
      address: address,
      hp: hp,
      email: email,
      city: city,
      provinsi: provinsi,
      bank_account_number: bank_account_number,
      bank_account_name: bank_account_name,
      bank_name: bank_name,
    };

    try {
      await axios.put(`${API_DUMMY}/customer/organization`, data, {
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

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      {localStorage.getItem("type_token") === "Customer" ? (
        <>
          <AppSidebar />
          <CCard className="mb-4">
            <CCardBody>
              <CForm onSubmit={Put}>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Id
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="Id"
                      autoComplete="Id"
                      value={id}
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Nama
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="nama"
                      autoComplete="nama"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Address
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="address"
                      autoComplete="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Hp
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="hp"
                      autoComplete="hp"
                      onChange={(e) => setHp(e.target.value)}
                      value={hp}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Email
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Kota
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="kota"
                      autoComplete="kota"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Provinsi
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="provinsi"
                      autoComplete="provinsi"
                      onChange={(e) => setProvinsi(e.target.value)}
                      value={provinsi}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    No Rekening
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="nomor rekening"
                      autoComplete="nomor rekening"
                      onChange={(e) => setBank_account_number(e.target.value)}
                      value={bank_account_number}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Nama Rekening
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="nama rekening"
                      autoComplete="nama rekening"
                      onChange={(e) => setBank_account_name(e.target.value)}
                      value={bank_account_name}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Nama Bank
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="nama bank"
                      autoComplete="nama bank"
                      onChange={(e) => setBank_name(e.target.value)}
                      value={bank_name}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label text-dark">
                    Saldo
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      placeholder="saldo"
                      autoComplete="saldo"
                      value={balance}
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CButton type="submit">Simpan</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}{" "}
    </div>
  );
}

export default CustomerOrganization;
