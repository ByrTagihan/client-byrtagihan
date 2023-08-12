import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function AddListDataSiswa() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      unique_id,
      name,
      address,
      hp,
      password,
    };
    try {
      await axios.post(`${API_DUMMY}/customer/member`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // console.log(unique_id);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(data);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card mb-3">
      {localStorage.getItem("type_token") === "Customer" ? (
        <>
          <div className="card-header bg-transparent">
            Tambah List Data Siswa
          </div>
          <div className="card-body">
            <form onSubmit={add}>
              <div className="mb-3">
                <label className="form-label">NIK : </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masukan NIK"
                  className="form-control"
                  onChange={(e) => setUnique_id(e.target.value)}
                  value={unique_id}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masukan name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nomor Hp</label>
                <input
                  id="no Hp"
                  type="number"
                  placeholder="Masukan Nomor Hp"
                  className="form-control"
                  onChange={(e) => setHp(e.target.value)}
                  value={hp}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Alamat</label>
                <textarea
                  id="Alamat"
                  type="text"
                  className="form-control"
                  placeholder="Masukan Alamat"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Passwod</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Masukan Password"
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary float-start"
                onClick={() => {
                  navigate("/customerMember");
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
      )}{" "}
    </div>
  );
}

export default AddListDataSiswa;
