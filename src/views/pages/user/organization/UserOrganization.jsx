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
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import { useNavigate, useParams } from "react-router-dom";

function UserOrganization() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [customer_id, setCustomer_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

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
  const param = useParams();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState({
    name: "",
    address: "",
    hp: "",
    email: "",
    city: "",
    provinsi: "",
    customer_id: "",
    bank_account_number: "",
    bank_account_name: "",
    bank_name: "",
  });

  const get = async () => {
    await axios
      .get(`${API_DUMMY}/user/organization/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const organization = res.data.data;
        setOrganization(organization);
        setId(organization.id);
        setName(organization.name);
        setAddress(organization.address);
        setHp(organization.hp);
        setEmail(organization.email);
        setCity(organization.city);
        setCustomer_id(organization.customer_id);
        setProvinsi(organization.provinsi);
        setBalance(organization.balance);
        setBank_account_number(organization.bank_account_number);
        setBank_account_name(organization.bank_account_name);
        setBank_name(organization.bank_name);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    get(0);
  }, [param.id]);

  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name: name,
      address: address,
      hp: hp,
      email: email,
      city: city,
      customer_id: customer_id,
      provinsi: provinsi,
      bank_account_number: bank_account_number,
      bank_account_name: bank_account_name,
      bank_name: bank_name,
    };

    try {
      await axios.put(
        `${API_DUMMY}/user/organization/` + param.id,
        {
          name: name,
          address: address,
          hp: hp,
          email: email,
          city: city,
          provinsi: provinsi,
          customer_id: customer_id,
          bank_account_number: bank_account_number,
          bank_account_name: bank_account_name,
          bank_name: bank_name,
        },
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setShow(false);
      navigate("/tableOrganization");
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit",
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
      <CCard className="mb-4">
        <CCardBody>
          <CForm onKeyDown={onKeyDown} onSubmit={Put}>
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
                Name
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  placeholder="Name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label text-dark">
                Customer Id
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  id="customer_id"
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={value}
                  placeholder="Customer Id..."
                  required
                />
                {suggestionsActive && <Suggestions />}
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
                  type="number"
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
                  type="number"
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
                  onChange={(e) => setBalance(e.target.value)}
                />
              </CCol>
            </CRow>
            <CButton type="submit">Simpan</CButton>
          </CForm>
        </CCardBody>
      </CCard>
   </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )} </div>
  );
}

export default UserOrganization;
