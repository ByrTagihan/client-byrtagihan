import axios from "axios";
import React, { useEffect } from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import "../../../../views/css/EditUserCustomer.css";
import { useParams } from "react-router-dom";

function EditCustomer() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("");
  const [organization_id, setOrganization_id] = useState("");
  const param = useParams();

  const update = async (e) => {
    e.preventDefault();
    const req = {
      name: name,
      address: address,
      hp: hp,
      password: password,
      active: active,
      organization_id: organization_id,
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
      .get("https://api.byrtagihan.com/api/user/customer/" + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const user_customer = response.data.data;
        setName(user_customer.name);
        setHp(user_customer.hp);
        setAddress(user_customer.address);
        setPassword(user_customer.password);
        setActive(user_customer.active);
        setOrganization_id(user_customer.organization_id);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

  return (
    <div style={{ padding: "10px", borderRadius: "20px" }}>
      <form onSubmit={update}>
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
              type="number"
              className="form-control inputOrganization_id"
              value={organization_id}
              onChange={(e) => setOrganization_id(e.target.value)}
            />
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
          <a href="/#/user/customer" style={{ color: "white" }}>
            {" "}
            Cancelled
          </a>
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
