
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/baseURL";

function AddTagihanByMember() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [periode, setPeriode] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const param = useParams();
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const add = async (e) => {
    if (role === "customer") {
      e.preventDefault();
      e.persist();

      const data = {
        description,
        amount,
        periode,
      };
      try {
        await axios.post(
          `${API_DUMMY}/customer/member/${param.id}/bill`,
          data,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
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
          navigate("/lihattagihanmember");
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai admin",
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

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  return (
    <div className="card mb-3">
      {localStorage.getItem("type_token") === "Customer" ? (
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
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default AddTagihanByMember;