import axios from "axios";
import React, { useEffect } from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import "../../../../views/css/EditUserCustomer.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CFormInput, CCard, CCardBody, CForm, CCol, CButton, } from "@coreui/react";

function EditCustomer() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("");
  const [organization_id, setOrganization_id] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault();

    const req = {
      name: name,
      address: address,
      hp: hp,
      password: password,
      active: active,
      organization_id: memberId,
    };
    console.log(req);

    await axios
      .put(`${API_DUMMY}/user/customer/` + param.id, req, {
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
          navigate("/userCustomer");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/user/customer/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        axios
          .get(`${API_DUMMY}/user/organization`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`,
            },
          })
          .then((ress) => {
            // const user_customer = ress.data.data;
            setName(response.name);
            setHp(response.hp);
            setAddress(response.address);
            setPassword(response.password);
            setActive(response.active);
            // setValue(
            //   `Id = ${user_customer.id}, Email = ${user_customer.email}, Nama = ${user_customer.name}`
            // );
            console.log(response.address);
            // console.log(res.data.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [memberId, setMemberId] = useState(0);

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY}/user/organization?name=${query}`,
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
        `Id = ${suggestions[suggestionIndex].id}, Email = ${suggestions[suggestionIndex].email}, Nama = ${suggestions[suggestionIndex].name}`
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
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, width: 200 }}
      >
        <ul className="list-group list-group-flush" style={{ width: 300 }}>
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
                  Id = {data.id}, Email = {data.email}, Nama = {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Id Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "user" ? (
        <>
      <CCard>
        <CCardBody>
          <h4>Edit Data Costumer</h4>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                placeholder="Nama"
                id="nama"
                onChange={(e) => setName(e.target.value)}
                label="Nama"
                value={name}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="address"
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
                label="Alamat"
                value={address}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                placeholder="No hp"
                id="No hp"
                onChange={(e) => setHp(e.target.value)}
                label="No hp"
                value={hp}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                autoComplete="off"
                value={organization_id}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                label="Organization_id"
                required
              />
              {suggestionsActive && <Suggestions />}
            </CCol>

            <CCol xs={12}>
              <CButton onClick={update}>Simpan</CButton>
            </CCol>
            {/* <CCol xs={12}>
              <Link to="/#/userCustomer">
                <CButton>Batal</CButton>
              </Link>
            </CCol> */}
          </CForm>
        </CCardBody>
      </CCard>
    </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )}</div>
  );
}

export default EditCustomer;
