import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../../views/css/editListDataSiswa.css";
import { API_DUMMY } from "../../../../utils/baseURL";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormTextarea } from "@coreui/react";

function EditListDataSiswa() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  // const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("type_token") === "customer") {
      axios
        .get(`${API_DUMMY}/customer/member/` + param.id, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const list_data = response.data.data;
          setUnique_id(list_data.unique_id);
          setHp(list_data.hp);
          setAddress(list_data.address);
          setName(list_data.name);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
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
  }, [param.id]);

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  const putData = async (e) => {
    if (localStorage.getItem("type_token") === "customer") {
      e.preventDefault();
      e.persist();

      const data = {
        unique_id: unique_id,
        hp: hp,
        address: address,
        name: name,
      };
      try {
        await axios.put(`${API_DUMMY}/customer/member/` + param.id, data, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/customerMember");
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.log(err);
      }
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

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div style={{ padding: "10px", borderRadius: "20px" }}>
      {localStorage.getItem("type_token") === "customer" ? (
        <CCard>
          <CCardHeader>
            <h4>Edit Data Siswa</h4>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormInput
                  label="Unique_id"
                  placeholder="Unique id"
                  autoComplete="Unique id"
                  onChange={(e) => setUnique_id(e.target.value)}
                  value={unique_id}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Name"
                  placeholder="Name"
                  autoComplete="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </CCol>
              <CCol md={6}>
                <CFormTextarea
                  label="Address"
                  placeholder="Address"
                  autoComplete="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="No Hp"
                  placeholder="No hp"
                  autoComplete="No hp"
                  onChange={(e) => setHp(e.target.value)}
                  value={hp}
                />
              </CCol>

              <CCol className="d-flex justify-content-between" xs={12}>
                <CButton className="btn-danger" onClick={handleGoBack}>
                  Kembali
                </CButton>
                <CButton onClick={putData}>Simpan</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default EditListDataSiswa;
