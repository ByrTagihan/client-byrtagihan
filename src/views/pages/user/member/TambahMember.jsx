import React, { useEffect } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
} from "@coreui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function TambahMember() {
  const [organization, setOrganization] = useState([]);
  const [member, setMember] = useState([]);
  const [organization_id, setOrganizationId] = useState();
  const [customer_id, setCustomer_id] = useState();
  const [show, setShow] = useState(false);
  const [unique_id, setUnique_id] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  const [organization_name, setOrganization_name] = useState("");
  const [picture, setPicture] = useState("");
  const [costumer, setCostumer] = useState([]);
  const [password, setPassword] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const addMember = async (e) => {
    if (localStorage.getItem("type_token") === "user") {
      e.preventDefault();
      //console.log(customer_id);
      //console.log(organization_id);

      const data = {
        organization_id: organization_id,
        unique_id: unique_id,
        name: name,
        address: address,
        hp: hp,
        password: password,
        customer_id: customer_id,
      };

      try {
        const response = await axios.post(`${API_DUMMY}/user/member`, data, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          });

        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/userMember");
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai guru",
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

  const GetOrganization = async () => {
    try {
      const { data, status } = await axios.get(
        `${API_DUMMY}/user/organization`,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
      );
      if (status === 200) {
        setOrganization(data.data);
        // //console.log(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetCostumer = async () => {
    try {
      const { data, status } = await axios.get(`${API_DUMMY}/user/customer`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          });
      if (status === 200) {
        setCostumer(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setPasswordIcon("fa-solid fa-eye-slash");
  };

  useEffect(() => {
    GetOrganization();
    GetCostumer();
    //console.log(organization_id);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "user" ? (
        <>
          <div className="card mb-3">
            <div className="card-header bg-transparent">
              <h5>Tambah member</h5>
            </div>
            <div className="card-body">
              <CForm className="row g-3" onSubmit={addMember}>
                <CCol md={6}>
                  <CFormInput
                    label="Unique_id"
                    placeholder="Unique id"
                    autoComplete="Unique id"
                    onChange={(e) => setUnique_id(e.target.value)}
                    value={unique_id}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Nama"
                    placeholder="Nama Siswa"
                    autoComplete="Nama Siswa"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Alamat"
                    placeholder="Alamat"
                    autoComplete="Alamat"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="No hp"
                    placeholder="No hp"
                    autoComplete="No hp"
                    onChange={(e) => setHp(e.target.value)}
                    value={hp}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    aria-label="Default select example"
                    value={organization_id}
                    label="Organization"
                    onChange={(e) =>
                      setOrganizationId(e.target.value.toString())
                    }
                  >
                    <select style={{ height: "100px" }}>
                      Pilih Organization
                    </select>{" "}
                    {organization.map((cos, i) => {
                      return (
                        <option value={cos.id} key={i}>
                          {cos.name}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Password</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <span onClick={togglePassword}>
                        <i className={passwordIcon}></i>
                      </span>
                    </CInputGroupText>
                    <CFormInput
                      type={passwordType}
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg md:float-right focus:ring-blue-500 focus:border-blue-500 block w-[15rem] md:p-1.5 p-1 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    onChange={(e) => setCustomer_id(e.target.value)}
                    label="Sekolah"
                    value={customer_id}
                  >
                    <option value="" selected>
                      Pilih Admin Sekolah
                    </option>
                    {costumer.map((down, idx) => {
                      return (
                        <option key={idx} value={down.id}>
                          <p>{down.name}</p>
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>
                <CCol className="d-flex justify-content-between" xs={12}>
                  <CButton className="btn-danger" onClick={handleGoBack}>
                    Kembali
                  </CButton>
                  <CButton type="submit">Simpan</CButton>
                </CCol>
              </CForm>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default TambahMember;
