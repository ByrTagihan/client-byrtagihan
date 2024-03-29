import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
} from "@coreui/react";

function AddTagihan() {
  const [memberId, setMemberId] = useState(0);
  const [desc, setDesc] = useState("");
  const [periode, setPeriode] = useState("");
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [role, setRole] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);
  const addTagihan = async (e) => {
    if (role === "customer") {
      e.preventDefault();
      const req = {
        member_id: memberId,
        description: desc,
        periode: periode,
        amount: amount,
      };
      await axios
        .post(`${API_DUMMY}/customer/bill`, req, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil DiTambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/customerBill");
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
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

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY}/customer/member?name=${query}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        }
      );

      if (query.length > 0 && response.ok) {
        const res = await response.json();
        setSuggestions(res.data);
        setSuggestionsActive(true);
      } else {
        setSuggestionsActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setMemberId(id);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(
        `NIK = ${suggestions[suggestionIndex].unique_id}, Nama = ${suggestions[suggestionIndex].name}`
      );
      setMemberId(suggestions[suggestionIndex].id);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <ul className="list-group list-group-flush">
          {suggestions.length != 0 ? (
            <>
              {suggestions.map((data, index) => (
                <li
                  className={
                    index === suggestionIndex
                      ? "list-group-item  list-group-item-action active"
                      : "list-group-item  list-group-item-action"
                  }
                  key={index}
                  onClick={(e) => handleClick(e, data.id)}
                >
                  NIK = {data.unique_id}, Nama = {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Member Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "customer" ? (
        <>
          <CCard>
            <CCardHeader className="card-header bg-transparent">
              <h4>Tambah Tagihan</h4>
            </CCardHeader>
            <CCardBody className="card-body">
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormInput
                    label="member_id"
                    placeholder="Member id"
                    autoComplete="Member id"
                    onChange={handleChange}
                    value={value}
                    required
                  />
                  {suggestionsActive && <Suggestions />}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Keterangan"
                    placeholder="Keterangan"
                    autoComplete="Keterangan"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Nominal"
                    placeholder="Nominal"
                    autoComplete="Nominal"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <label className="form-label">Periode</label>
                  <input
                    id="periode"
                    type="date"
                    className="form-control"
                    onChange={(e) => setPeriode(e.target.value)}
                    required
                  />
                </CCol>

                <CCol className="d-flex justify-content-between" xs={12}>
                  <CButton className="btn-danger" onClick={handleGoBack}>
                    Kembali
                  </CButton>
                  <CButton onClick={addTagihan}>Simpan</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default AddTagihan;
