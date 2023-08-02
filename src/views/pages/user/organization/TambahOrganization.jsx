import { CButton, CCol, CForm, CFormInput } from "@coreui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TambahOrganization() {
  const [customer_id, setCustomer_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

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
  const navigate = useNavigate();

  const Post = async (e) => {
    if (localStorage.getItem("type_token") === "user") {
    e.preventDefault();
    const data = {
      name: name,
      customer_id: customer_id,
      hp: hp,
      email: email,
      address: address,
      city: city,
      provinsi: provinsi,
      balance: balance,
      bank_account_number: bank_account_number,
      bank_account_name: bank_account_name,
      bank_name: bank_name,
    };
    await axios
      .post(`${API_DUMMY}/user/organization`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/tableOrganization");
        Swal.fire({
          icon: "success",
          title: "Berhasil DiTambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
      
    } else {
      Swal.fire(
        'Peringatan',
        'Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai guru',
        'error'      
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

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
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
      setValue(` ${suggestions[suggestionIndex].name}`);
      setCustomer_id(suggestions[suggestionIndex].id);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setCustomer_id(id);
    setSuggestionsActive(false);
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
                  {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Customer Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY}/user/organization?name=${query}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
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
  return (
    <div>
      {localStorage.getItem("type_token") === "user" ? (
        <>
      <div className="card mb-3">
        <div className="card-header bg-transparent">
          <h5>Tambah Organization</h5>
        </div>
        <div className="card-body">
          <CForm onSubmit={Post} onKeyDown={onKeyDown} className="row g-3">
            <CCol xs={12}>
              <CFormInput
                id="name"
                label="Nama"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama..."
                required
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="customer_id"
                label="Customer_id"
                type="text"
                // onChange={(e) => setCustomer_id(e.target.value)}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={value}
                placeholder="Customer Id..."
                required
              />
              {suggestionsActive && <Suggestions />}
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Alamat..."
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                label="Alamat"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="No Hp..."
                id="hp"
                onChange={(e) => setHp(e.target.value)}
                label="No Hp"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Email..."
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Kota..."
                id="city"
                onChange={(e) => setCity(e.target.value)}
                label="Kota"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Provinsi..."
                id="provinsi"
                onChange={(e) => setProvinsi(e.target.value)}
                label="Provinsi"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="No Rekening..."
                id="bank_account_name"
                onChange={(e) => setBank_account_number(e.target.value)}
                label="No Rekening"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Nama Rekening..."
                id="bank_account_name"
                onChange={(e) => setBank_account_name(e.target.value)}
                label="Nama Rekening"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Nama Bank..."
                id="bank_name"
                onChange={(e) => setBank_name(e.target.value)}
                label="Nama Bank"
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Saldo..."
                id="balance"
                onChange={(e) => setBalance(e.target.value)}
                label="Saldo"
                required
              />
            </CCol>

            <CCol xs={12}>
              <CButton type="submit">Simpan</CButton>
            </CCol>
          </CForm>
        </div>
      </div>
    </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )}</div>
  );
}

export default TambahOrganization;