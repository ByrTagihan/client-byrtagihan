import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddTagihanByMember() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [periode, setPeriode] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const param = useParams();
    let navigate = useNavigate();
    
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      description,
      amount,
      periode,
    };
    try {
      await axios.post(
        `https://api.byrtagihan.com/api/customer/member/${param.id}/bill`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
        // data,
        // {
        //   headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        // }
      );
      setShowAdd(false);
      // navigate("/lihattagihanmember")
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
      setTimeout(() => {
        navigate("/lihattagihanmember")
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card mb-3">
      {localStorage.getItem("type_token") === "customer" ? (
        <>
      <div className="card-header bg-transparent">Tambah Tagihan</div>
      <div className="card-body">
        <form onSubmit={add}>
          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <input
              id="description"
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Periode</label>
            <input
              id="periode"
              type="date"
              className="form-control"
              onChange={(e) => setPeriode(e.target.value)}
              value={periode}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              id="amount"
              type="number"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary float-start"
            onClick={() => {
              navigate("/lihattagihanmember");
            }}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary float-end">
            Submit
          </button>
        </form>
      </div>
    </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )}</div>
  )
}

export default AddTagihanByMember