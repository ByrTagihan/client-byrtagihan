import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/baseURL";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";

function AddTagihanByMember() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [periode, setPeriode] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const param = useParams();
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const add = async (e) => {
    if (role === "customer") {
      e.preventDefault();
      e.persist();

      const data = {
        description,
        amount,
        periode,
      };
      try {
        await axios.post(
          `${API_DUMMY}/customer/member/${param.id}/bill`,
          data,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        setShowAdd(false);
        // navigate("/lihattagihanmember")
        Swal.fire({
          icon: "success",
          title: "Berhasil DiTambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        //console.log(data);
        setTimeout(() => {
          navigate("/lihattagihanmember:{/id}");
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
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

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <CCard className="card mb-3">
      {localStorage.getItem("type_token") === "customer" ? (
        <>
          <CCardHeader className="card-header bg-transparent">
            <h4>Tambah Tagihan</h4>
          </CCardHeader>
          <CCardBody className="card-body">
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormTextarea
                  label="Description"
                  placeholder="Description"
                  autoComplete="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </CCol>
              <CCol md={6}>
                <label className="form-label">Periode</label>
                <input
                  id="periode"
                  type="date"
                  className="form-control"
                  onChange={(e) => setPeriode(e.target.value)}
                  value={periode}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Amount"
                  placeholder="Amount"
                  autoComplete="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </CCol>

              <CCol className="d-flex justify-content-between" xs={12}>
                <CButton className="btn-danger" onClick={handleGoBack}>
                  Kembali
                </CButton>
                <CButton onClick={add}>Simpan</CButton>
              </CCol>
              {/* <button
                type="button"
                className="btn btn-secondary float-start"
                onClick={() => {
                  navigate("/lihattagihanmember");
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary float-end">
                Submit
              </button> */}
            </CForm>
          </CCardBody>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </CCard>
  );
}

export default AddTagihanByMember;
