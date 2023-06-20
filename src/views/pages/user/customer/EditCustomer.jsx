import axios from "axios";
import React, { useEffect } from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import "../../../../views/css/EditUserCustomer.css";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("");
  const [organization_id, setOrganization_id] = useState("");
  const param = useParams();
  const navigate = useNavigate()

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
          title: "Berhasil Diedit",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/#/userCustomer");
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
            const user_customer = ress.data.data;
            setName(response.name);
            setHp(response.hp);
            setAddress(response.address);                             
            setPassword(response.password);
            setActive(response.active);
            // setValue(
            //   `Id = ${user_customer.id}, Email = ${user_customer.email}, Nama = ${user_customer.name}`
            // );
            console.log(ress.data.data);
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
        `Id = ${suggestions[suggestionIndex].id}, Email =${suggestions[suggestionIndex].email}, Nama = ${suggestions[suggestionIndex].name}`
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
              Id = {data.id}, Email = {data.email}, Nama = {data.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ padding: "10px", borderRadius: "20px" }}>
      <form onSubmit={update} onKeyDown={onKeyDown}>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "25px",
              marginBottom: "50px",
            }}
          >
            Edit User/Customer
          </p>
        </div>
        <div className="box">
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Name :
            </label>
            <input
              type="text"
              className="form-control inputName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Address :
            </label>
            <input
              type="text"
              className="form-control inputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="box">
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Hp :
            </label>
            <input
              type="number"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="form-control inputHp"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Password :
            </label>
            <input
              type="password"
              className="form-control inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="box">
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Active :
            </label>
            <input
              type="text"
              className="form-control inputActive"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Organization_id :
            </label>
            <input
              type="text"
              className="form-control inputOrganization_id"
              value={value}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
            />
            {suggestionsActive && <Suggestions />}
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: "49px",
            backgroundColor: "#213555",
            color: "white",
          }}
        >
          Save
        </button>
        <button
          style={{
            marginTop: "49px",
            backgroundColor: "#213555",
            color: "white",
            marginLeft: "30px",
          }}
        >
          <a href="/#/userCustomer" style={{ color: "white" }}>
            {" "}
            Cancelled
          </a>
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
