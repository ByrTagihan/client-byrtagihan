import React, { useEffect, useState } from "react";
import { deleteData, getAllData } from "../../../utils/controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { CModal } from "@coreui/react";
import axios from "axios";
import { API_DUMMY } from "../../../utils/baseURL";
import Swal from "sweetalert2";

function Tagihan() {
  const [dataMenu, setDataMenu] = useState([]);
  const [visible, setVisible] = useState(false);
  const [paidId, setPaidId] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  let navigate = useNavigate();

  const bayarTagihan = async (e) => {
    e.preventDefault();
    const req = {
      paid_date: paidDate,
      paid_amount: paidAmount,
    };

    await axios
      .put(`${API_DUMMY}/customer/bill/${paidId}/paid`, req, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Membayar",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unBayarTagihan = async (paidIds) => {
    Swal.fire({
      title: "Yakin ingin membatalkan pembayaran ?",
      text: "Data tidak dapat kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cencel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
          .put(`${API_DUMMY}/customer/bill/${paidIds}/unpaid`, {}, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`,
            },
          })
          Swal.fire({
            icon: "success",
            title: "Berhasil Membatalkan Pembayaran",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
              window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllData("customer/bill", setDataMenu);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4>List Tagihan</h4>
                </div>
                <div className="col">
                  <Link to="/addtagihan">
                    <button className="btn btn-primary float-end">
                      <FontAwesomeIcon icon="fa-plus" /> Tambah Tagihan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nama Murid</th>
                    <th scope="col">Description</th>
                    <th scope="col">Period</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tgl Bayar</th>
                    <th scope="col">Nominal Bayar</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dataMenu.map((data, i) => (
                    <tr key={i}>
                      <th scope="row">{data.id}</th>
                      <td>{data.member_name}</td>
                      <td>{data.description}</td>
                      <td>{data.periode}</td>
                      <td>{data.amount}</td>
                      <td>
                        {data.paid_id != 0 ? (
                          <span>Sudah Bayar</span>
                        ) : (
                          <span>Belum Bayar</span>
                        )}
                      </td>
                      <td>{data.paid_date}</td>
                      <td>{data.paid_amount}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/edittagihan/${data.id}`)}
                        >
                          <FontAwesomeIcon icon="fa-edit" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() =>
                            deleteData(data.id, "customer/bill", setDataMenu)
                          }
                        >
                          <FontAwesomeIcon icon="fa-trash" />
                        </button>
                        {data.paid_id != 0 ? (
                          <button
                          type="button"
                          onClick={() => {
                            unBayarTagihan(data.id);
                          }}
                          className="btn btn-danger "
                        >
                          Batal Bayar
                        </button>
                        ) : (
                          <button
                          type="button"
                          onClick={() => {
                            setVisible(!visible);
                            setPaidId(data.id);
                            setPaidAmount(data.amount);
                          }}
                          className="btn btn-info " 
                        >
                          Bayar
                        </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <form onSubmit={bayarTagihan}>
              <div className="modal-header" onClose={() => setVisible(false)}>
                <h5 className="modal-title">Bayar Tagihan</h5>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tanggal Bayar</label>
                  <input
                    id="paid_date"
                    type="date"
                    className="form-control"
                    onChange={(e) => setPaidDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nominal</label>
                  <input
                    id="paid_amount"
                    type="number"
                    className="form-control"
                    value={paidAmount}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setVisible(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Bayar
                </button>
              </div>
            </form>
          </CModal>
        </div>
      </div>
    </div>
  );
}

export default Tagihan;
