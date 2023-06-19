import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CrudPayment() {
  const [list, setList] = useState([]);
  const [total_page, setTotal_Page] = useState([]);
  let navigate = useNavigate();

  const getAll = async (page = 1) => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/user/payment?page=${page}&limit=10`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotal_Page(res.data.pagination.total_page);
        setList(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
  }, []);

  const Delete = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("https://api.byrtagihan.com/api/user/payment/" + id, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menghapus",
          showConfirmButton: false,
        });
        console.log(id);
      }
      setTimeout(() => {
        // window.location.reload();
      }, 1500);
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4>Payment</h4>
                </div>
                {localStorage.getItem("type_token") === "member" ? (
                  <>
                    <div className="col">
                      <Link to="/tambahpayment">
                        <button className="btn btn-primary float-end">
                          <FontAwesomeIcon icon="fa-plus" /> Tambah
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="col">
                    <Link to="/tambahpayment">
                      <button
                        disabled={true}
                        className="btn btn-primary float-end"
                      >
                        <FontAwesomeIcon icon="fa-plus" /> Tambah
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="card-body">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Organization Name</th>
                    <th scope="col">Periode</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Update Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white" style={{ textAlign: "center" }}>
                  {list.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.description}</td>
                        <td>{data.organization_name}</td>
                        <td>{data.periode}</td>
                        <td>{data.amount}</td>
                        <td>{data.created_date}</td>
                        <td>{data.updated_date}</td>

                        <td>
                          {localStorage.getItem("type_token") === "member" ? (
                            <>
                              <button
                                onClick={() =>
                                  navigate(`/editTransaction/${data.id}`)
                                }
                                type="button"
                                className="btn btn-primary me-2"
                              >
                                <FontAwesomeIcon icon="fa-edit" />
                              </button>
                            </>
                          ) : (
                            <button
                              disabled={true}
                              onClick={() =>
                                navigate(`/editTransaction/${data.id}`)
                              }
                              type="button"
                              className="btn btn-primary me-2"
                            >
                              <FontAwesomeIcon icon="fa-edit" />
                            </button>
                          )}

                          {localStorage.getItem("type_token") === "member" ? (
                            <>
                              <button
                                onClick={() => Delete(data.id)}
                                type="button"
                                className="btn btn-danger me-2"
                              >
                                <FontAwesomeIcon
                                  style={{ color: "white" }}
                                  icon="fa-trash"
                                />
                              </button>
                            </>
                          ) : (
                            <button
                              disabled={true}
                              onClick={() => Delete(data.id)}
                              type="button"
                              className="btn btn-danger me-2"
                            >
                              <FontAwesomeIcon
                                style={{ color: "white" }}
                                icon="fa-trash"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={total_page}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={(e) => getAll(e.selected)}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrudPayment;
