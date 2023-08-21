import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/baseURL";
import { CButton, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormTextarea } from "@coreui/react";
function EditTaagihanByMember() {
  const param = useParams();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [periode, setPeriode] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/customer/bill/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDescription(response.data.data.description);
        setAmount(response.data.data.amount);
        setDescription(response.data.data.description);
        // //console.log(response.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);
  const put = async (e) => {
    e.preventDefault();
    e.persist();
    const data = {
      amount: amount,
      periode: periode,
      description: description,
    };
    //console.log(data);
    try {
      await axios.put(`${API_DUMMY}/customer/bill/` + param.id, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // alert("Success")
      setShowEdit(false);
      //   navigate("/lihattagihanmember/" + param.id)
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        showConfirmButton: false,
      });
      setTimeout(() => {
        // navigate(`/lihattagihanmember/${id}`);
        window.location.reload();
      }, 1500);
    } catch (err) {
      //console.log(err);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div className="card mb-3">
      {localStorage.getItem("type_token") === "Customer" ? (
        <>
          <CCardHeader>
            <h4>Edit Tagihan</h4>
          </CCardHeader>
          <CCardBody>
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
                <CButton onClick={put}>Simpan</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}
export default EditTaagihanByMember;
