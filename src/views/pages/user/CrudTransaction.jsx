import { CFormInput } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/Transaction.css";

function CrudTransaction() {
  const [list, setList] = useState([]);
  const [total_page, setTotal_Page] = useState([]);

  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const getAll = async (page = 0) => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/user/transaction?page=${page}&limit=3&query=${search}`,
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
        axios.delete("https://api.byrtagihan.com/api/user/transaction/" + id, {
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
        window.location.reload();
      }, 1500);
    });
  };

  return (
    <div>
      {/* {localStorage.getItem("type_token") === "user" ? ( */}
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4 style={{ position: "absolute", marginBottom: "4em" }}>
                    Transaction
                  </h4>
                </div>

                <div style={{ display: "flex" }}>
                  <form>
                    <CFormInput
                      type="search"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      placeholder="Search Description"
                      style={{ width: "20em", marginLeft: "37em" }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        getAll();
                      }}
                      type="submit"
                    >
                      Search
                    </button>
                  </form>

                  {localStorage.getItem("type_token") === "member" ? (
                    <>
                      <div className="col">
                        <Link to="/tambahtransaction">
                          <button className="btn btn-primary float-end">
                            <FontAwesomeIcon icon="fa-plus" /> Tambah
                          </button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="col">
                      <Link to="/tambahtransaction">
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
            </div>

            <div className="card-body">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Organization Name</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Update Date</th>

                    <th disabled={true} scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  id="myTable"
                  className="bg-white"
                  style={{ textAlign: "center" }}
                >
                  {list
                    // .filter((item) => {
                    //   return search.toLowerCase() === ""
                    //     ? item
                    //     : item.description.toLowerCase().includes(search);
                    // })
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.organization_name}</td>
                          <td>{item.amount}</td>
                          <td>{item.created_date}</td>
                          <td>{item.updated_date}</td>

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
      {/* ) : (
        <></>
      )} */}
    </div>
  );
}

export default CrudTransaction;
