import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
      .get("https://api.byrtagihan.com/api/customer/member/" + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const list_data = response.data.data;
        setUnique_id(list_data.unique_id);
        setHp(list_data.hp);
        setAddress(list_data.address);
        setName(list_data.name);
        // console.log(response.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

    const putData = async (e) => {
        e.preventDefault();
        e.persist();

        // const data = new FormData();
        // data.append("unique_id", unique_id);
        // data.append("hp", hp);
        // data.append("address", address);
        // data.append("name", name);
    

        const data = {
            unique_id: unique_id,
            hp: hp,
            address: address,
            name: name
        }
        // console.log(data);
        try {
          await axios.put(
            `https://api.byrtagihan.com/api/customer/member/` + param.id, data,
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
        // alert("success")
          setTimeout(() => {
            navigate("/listdatasiswa")
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
        <div style={{display:"flex", gap:"37%"}}>
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            Nisn :
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            style={{width:"190%"}}
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
            className="form-control"
            aria-describedby="emailHelp"
            style={{width:"190%"}}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        </div>
        <div style={{display:"flex", gap:"38.8%", marginTop:"20px"}}>
        <div>
          <label className="form-label" style={{fontWeight:"bold"}}>
            Address :
          </label>
          <textarea
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            style={{width:"208%"}}
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
            className="form-control"
            aria-describedby="emailHelp"
            style={{width:"190%"}}
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        </div>

        <button type="submit" style={{marginTop:"49px", backgroundColor:"#213555", color:"white"}}>
          Save
        </button>
        <button style={{marginTop:"49px", backgroundColor:"#213555", color:"white", marginLeft:"30px"}}>
       <a href="/#/listdatasiswa" style={{color: "white"}}> Cancelled</a>
        </button>
      </form>
    </div>
  );
}

export default ListDataSiswaEdit;
