import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../../../utils/baseURL';

function EditTaagihanByMember() {
  const param = useParams();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [periode, setPeriode] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/customer/bill/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDescription(response.data.data.description);
        setAmount(response.data.data.amount);
        setDescription(response.data.data.description);
        // console.log(response.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      amount: amount,
      periode: periode,
      description: description,
    };
    console.log(data);

    try {
      await axios.put(
        `${API_DUMMY}/customer/bill/` + param.id,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      // alert("Success")
      setShowEdit(false);
      //   navigate("/lihattagihanmember/" + param.id)
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    };
  }
};

return (
  <div className="card mb-3">
    {localStorage.getItem("type_token") === "customer" ? (
      <>
        <div className="card-header bg-transparent">Edit Tagihan</div>
        <div className="card-body">
          <form onSubmit={put}>
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
    ) : (
      <><p>Page Tidak Tersedia</p></>
    )}</div>
)

export default EditTaagihanByMember;