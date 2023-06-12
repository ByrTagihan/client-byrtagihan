import React, { useEffect, useState } from "react";
import { deleteData, getAllData } from "../../../utils/controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { CModal } from "@coreui/react";
import axios from "axios";
import { API_DUMMY } from "../../../utils/baseURL";

function Tagihan() {
  const [dataMenu, setDataMenu] = useState([]);
  const [visible, setVisible] = useState(false);
  const [paidId, setPaidId] = useState(0);
  const [paidDate, setPaidDate] = useState();
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
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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
                <thead>
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
                <tbody>
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
                        <button
                          type="button"
                          onClick={() => {
                            setVisible(!visible);
                            setPaidId(data.id);
                          }}
                          className={
                            "btn btn-info " +
                            (data.paid_id != 0 ? "disabled" : "")
                          }
                        >
                          Bayar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <form onSubmit={bayarTagihan}>
              <div class="modal-header" onClose={() => setVisible(false)}>
                <h5 class="modal-title">Bayar Tagihan</h5>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Tanggal Bayar</label>
                  <input
                    id="paid_date"
                    type="date"
                    class="form-control"
                    onChange={(e) => setPaidDate(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Nominal</label>
                  <input
                    id="paid_amount"
                    type="number"
                    class="form-control"
                    onChange={(e) => setPaidAmount(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
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
