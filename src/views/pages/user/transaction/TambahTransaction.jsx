import React, { useEffect } from "react";
import { CButton, CCol, CForm, CFormInput, CFormSelect } from "@coreui/react";
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

  const [organization, setOrganization] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionIndex1, setSuggestionIndex1] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [suggestionsActive1, setSuggestionsActive1] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  let navigate = useNavigate();

  const Post = async (e) => {
    if (localStorage.getItem("type_token") === "user") {
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
            title: "Berhasil Menambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error);
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
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(`${API_DUMMY}/user/member?name=${query}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

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

  // organization

  const GetOrganization = async () => {
    try {
      const { data, status } = await axios.get(
        `${API_DUMMY}/user/transaction?limit=100`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      if (status === 200) {
        setOrganization(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetOrganization();
  }, []);

  const onKeyDown1 = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleKeyDown1 = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex1 === 0) {
        return;
      }
      setSuggestionIndex1(suggestionIndex1 - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex1 - 1 === suggestions1.length) {
        return;
      }
      setSuggestionIndex1(suggestionIndex1 + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue1(` ${suggestions1[suggestionIndex1].name}`);
      setOrganizationId(suggestions1[suggestionIndex1].id);
      setSuggestionIndex1(0);
      setSuggestionsActive1(false);
    }
  };

  const handleChange1 = async (e) => {
    const name = e.target.value;
    setValue1(name);

    try {
      const response = await fetch(
        `${API_DUMMY}/user/organization?name=${name}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );

      if (name.length > 0 && response.ok) {
        const res = await response.json();
        setSuggestions1(res.data);
        setSuggestionsActive1(true);
      } else {
        setSuggestionsActive1(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick1 = (e, id) => {
    setSuggestions1([]);
    setValue1(e.target.innerText);
    setOrganizationId(id);
    setSuggestionsActive1(false);
  };

  const Suggestions1 = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <ul className="list-group list-group-flush">
          {suggestions1.length != 0 ? (
            <>
              {suggestions1.map((data, index) => (
                <li
                  className={
                    index === suggestionIndex1
                      ? "list-group-item  list-group-item-action active"
                      : "list-group-item  list-group-item-action"
                  }
                  key={index}
                  onClick={(e) => handleClick1(e, data.id)}
                >
                  {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Organization Tidak Ditemukan</li>
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
          <CForm
            onSubmit={Post}
            onKeyDown={onKeyDown}
            onKeyDown1={onKeyDown1}
            className="row g-3"
          >
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
            {/* <CCol md={6}>
              <CFormSelect
                aria-label="Default select example"
                value={organization_id}
                label="Organization"
                onChange={(e) => setOrganizationId(e.target.value.toString())}
              >
                <select style={{height: "100px"}}>Pilih Organization</select>{" "}
                {organization.map((cos, i) => {
                  return (
                    <option  value={cos.id} key={i}>
                      {cos.organization_name}
                    </option>
                  );
                })}
              </CFormSelect>
            </CCol> */}
            <CCol md={6}>
              <CFormInput
                id="number_id"
                type="text"
                placeholder="Organization..."
                className="form-control"
                value={value1}
                label="Organization"
                autoComplete="off"
                onKeyDown={handleKeyDown1}
                onChange={handleChange1}
                required
              />
              {suggestionsActive1 && <Suggestions1 />}
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
