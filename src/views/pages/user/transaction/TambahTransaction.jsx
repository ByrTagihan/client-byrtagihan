import React, { useEffect } from "react";
import { CButton, CCol, CForm, CFormInput } from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function TambahTransaction() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [organization_id, setOrganizationId] = useState("");
  const [member_id, setMemberId] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionIndex2, setSuggestionIndex2] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [suggestionsActive2, setSuggestionsActive2] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  let navigate = useNavigate();

  const Post = async (e) => {
    e.preventDefault();
    const data = {
      organization_id: organization_id,
      member_id: member_id,
      description: description,
      amount: amount,
    };
    await axios
      .post(`${API_DUMMY}/user/transaction`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/transaction");
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
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY}/customer/member?name=${query}`,
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
      setMemberId(suggestions[suggestionIndex].id);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setMemberId(id);
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
              <li className="list-group-item ">Member Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

  const handleChange2 = async (e) => {
    const query2 = e.target.value;
    setValue2(query2);

    try {
      const response = await fetch(
        `${API_DUMMY}/customer/member?organization_name=${query2}&page=2`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );

      if (query2.length > 0 && response.ok) {
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

  const onKeyDown2 = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleKeyDown2 = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex2 === 0) {
        return;
      }
      setSuggestionIndex2(suggestionIndex2 - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex2 - 1 === suggestions2.length) {
        return;
      }
      setSuggestionIndex2(suggestionIndex2 + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue2(`${suggestions2[suggestionIndex2].organization_name}`);
      setOrganizationId(suggestions2[suggestionIndex2].id);
      setSuggestionIndex2(0);
      setSuggestionsActive2(false);
    }
  };

  const handleClick2 = (e, id) => {
    setSuggestions2([]);
    setValue2(e.target.innerText);
    setOrganizationId(id);
    setSuggestionsActive2(false);
  };
  const Suggestions2 = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <ul className="list-group list-group-flush">
          {suggestions2.length != 0 ? (
            <>
              {suggestions2.map((data, index) => (
                <li
                  className={
                    index === suggestionIndex2
                      ? "list-group-item  list-group-item-action active"
                      : "list-group-item  list-group-item-action"
                  }
                  key={index}
                  onClick={(e) => handleClick2(e, data.id)}
                >
                  Organization = {data.organization_name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Organisasi Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };
  return (
    <div>
      {/* {localStorage.getItem("type_token") === "user" ? ( */}
      <div className="card mb-3">
        <div className="card-header bg-transparent">
          <h5>Tambah transaction</h5>
        </div>
        <div className="card-body">
          <CForm onSubmit={Post} onKeyDown={onKeyDown} onKeyDown2={onKeyDown2} className="row g-3">
            <CCol xs={12}>
              <CFormInput
                id="description"
                label="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                placeholder="Amount..."
                id="amount"
                onChange={(e) => setAmount(e.target.value)}
                label="Amount"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="organizationId"
                onChange={(e) => setOrganizationId(e.target.value)}
                placeholder="Organization..."
                label="Organization"
                required
              />

              {/* <CFormInput
                id="organization_id"
                type="text"
                placeholder="Organization..."
                className="form-control"
                value={value2}
                label="Organization"
                autoComplete="off"
                onKeyDown={handleKeyDown2}
                onChange={handleChange2}
                required
              /> */}
              {suggestionsActive2 && <Suggestions2 />}
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="number_id"
                type="text"
                placeholder="Member..."
                className="form-control"
                value={value}
                label="Member"
                autoComplete="off"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                required
              />
              {suggestionsActive && <Suggestions />}
            </CCol>

            <CCol xs={12}>
              <CButton type="submit">Simpan</CButton>
            </CCol>
          </CForm>
        </div>
      </div>
      {/* ) : (
         <></>
       )} */}
    </div>
  );
}

export default TambahTransaction;
