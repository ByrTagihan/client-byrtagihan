import { CButton, CCol, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function EditTransaction() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [periode, setPeriode] = useState("");
  const param = useParams();
  let navigate = useNavigate();

  const Update = async (e) => {
    e.preventDefault();
    const data = {
      description: description,
      periode: periode,
      amount: amount,
    };

    await axios
      .put(`${API_DUMMY}/user/transaction/` + param.id, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/transaction");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("type_token") === "user") {
      axios
        .get(`${API_DUMMY}/user/transaction/` + param.id, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const payment = response.data.data;
          //console.log(response.data.data);
          setDescription(payment.description);
          setPeriode(payment.periode);
          setAmount(payment.amount);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
        });
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
  }, [param.id]);

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "user" ? (
        <div className="card mb-3">
          <div className="card-header bg-transparent">
            <h5>Edit Transaction</h5>
          </div>
          <div className="card-body">
            <CForm onSubmit={Update} className="row g-3">
              <CCol xs={12}>
                <CFormTextarea
                  id="description"
                  // placeholder="Leave a comment here"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  required
                ></CFormTextarea>
                {/* <CFormInput
                  id="description"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  required
                /> */}
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  label="Amount"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="date"
                  id="periode"
                  onChange={(e) => setPeriode(e.target.value)}
                  value={periode}
                  label="Periode"
                  required
                />
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditTransaction;
