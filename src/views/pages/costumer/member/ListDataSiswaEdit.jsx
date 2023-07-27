import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import '../../../../views/css/editListDataSiswa.css'
import { API_DUMMY } from "../../../../utils/baseURL";

function ListDataSiswaEdit() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/customer/member/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const list_data = response.data.data;
        setUnique_id(list_data.unique_id);
        setHp(list_data.hp);
        setAddress(list_data.address);
        setName(list_data.name);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

    const putData = async (e) => {
        e.preventDefault();
        e.persist();

        const data = {
            unique_id: unique_id,
            hp: hp,
            address: address,
            name: name
        }
        try {
          await axios.put(
            `${API_DUMMY}/customer/member/` + param.id, data,
            {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            }
          );
          setShow(false);
          Swal.fire({
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/customerMember")
            window.location.reload();
          }, 1500);
        } catch (err) {
          console.log(err);
        }
      };
    
  return (
    <div style={{padding:"10px", borderRadius:"20px"}}>
      <form onSubmit={putData}>
        <div>
            <p style={{fontWeight:"bold", fontSize:"25px", marginBottom:"50px"}}>Edit LIst Data</p>
        </div>
        <div className="box">
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            Nisn :
          </label>
          <input
            type="text"
            className="form-control inputNisn"
            aria-describedby="emailHelp"
            value={unique_id}
            onChange={(e) => setUnique_id(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            Name :
          </label>
          <input
            type="text"
            className="form-control inputNama"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        </div>
        <div className="box1">
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            Address :
          </label>
          <textarea
            type="text"
            className="form-control inputAddress"
            aria-describedby="emailHelp"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            hp :
          </label>
          <input
            type="number"
            className="form-control inputHp"
            aria-describedby="emailHelp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        </div>

        <button type="submit" style={{marginTop:"49px", backgroundColor:"#213555", color:"white"}}>
          Save
        </button>
        <Link to ="/customerMember">
        <button style={{marginTop:"49px", backgroundColor:"#213555", color:"white", marginLeft:"30px"}}>Cancelled
        </button>
        </Link>
      </form>
    </div>
  );
}

export default ListDataSiswaEdit;
