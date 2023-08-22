
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function EditTagihan() {
  const [memberId, setMemberId] = useState(0);
  const [desc, setDesc] = useState("");
  const [periode, setPeriode] = useState("");
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [role, setRole] = useState("");
  let navigate = useNavigate();

  const updateTagihan = async (e) => {
    if (role === "customer") {
      e.preventDefault();
      const req = {
        member_id: memberId,
        description: desc,
        periode: periode,
        amount: amount,
      };
      //console.log(req);

      await axios
        .put(`${API_DUMMY}/customer/bill/${id}`, req, {
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
            navigate("/customerBill")
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          //console.log(error);
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
      //console.log(err);
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
          {suggestions.map((data, index) => (
            <li
              className={
                index === suggestionIndex
                  ? " list-group-item  list-group-item-action active"
                  : "list-group-item  list-group-item-action"
              }
              key={index}
              onClick={(e) => handleClick(e, data.id)}
            >
              NIK = {data.unique_id}, Nama = {data.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/customer/bill/${id}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        axios
          .get(`${API_DUMMY}/customer/member/${response.member_id}`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`,
            },
          })
          .then((ress) => {
            const users = ress.data.data;
            setValue(`NIK = ${users.unique_id}, Nama = ${users.name}`);
            setDesc(response.description);
            setPeriode(response.periode);
            setAmount(response.amount);
          });
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "Customer" ? (
        <>
          <CCard>
            <CCardHeader className="card-header bg-transparent">
              <h4>Edit Tagihan</h4>
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
                  <CButton onClick={updateTagihan}>Simpan</CButton>
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

export default EditTagihan;