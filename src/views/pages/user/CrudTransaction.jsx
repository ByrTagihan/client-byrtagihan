import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/Transaction.css";

function CrudTransaction() {
  const [total_page, setTotal_Page] = useState(1);
  const [transaction, setTransaction] = useState("");

  let navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState([]);

  const getAll = async () => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/user/transaction?page=${currentPage}&limit=10&name=${transaction}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotal_Page(res.data.pagination.total_page);
        setBills(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
  }, [currentPage, searchTerm, sortBy]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= total_page; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={"page-item " + (currentPage === i ? "active" : "")}
          aria-current="page"
          onClick={() => handlePageChange(i)}
        >
          <a class="page-link">{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

  const filteredBills = bills.filter((bill) =>
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBills = filteredBills.sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });
  return (
    <div>
      {/* {localStorage.getItem("type_token") === "user" ? ( */}
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4 className="textt">Transaction</h4>
                </div>

                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    class="form-control float-end"
                    placeholder="Search description"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "30%", marginLeft: "37em" }}
                  />

                  <div className="col">
                    <Link to="/tambahtransaction">
                      <button className="btn btn-primary float-end">
                        <FontAwesomeIcon icon="fa-plus" /> Tambah
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table  table1 responsive-3">
                <thead className="text-center">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Organization</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Update Date</th>

                    {/* <th disabled={true} scope="col">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody
                  id="myTable"
                  className="bg-white"
                  style={{ textAlign: "center" }}
                >
                  {sortedBills.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="No">{index + 1}</td>
                        <td data-cell="Description">{item.description}</td>
                        <td data-cell="Organization">
                          {item.organization_name}
                        </td>
                        <td data-cell="Nominal">{item.amount}</td>
                        <td data-cell="Create Date">{item.created_date}</td>
                        <td data-cell="Update Date">{item.updated_date}</td>

                        <td>
                          <button
                            onClick={() =>
                              navigate(`/editTransaction/${item.id}`)
                            }
                            type="button"
                            className="btn btn-primary me-2"
                          >
                            <FontAwesomeIcon icon="fa-edit" />
                          </button>

                          <button
                            onClick={() => Delete(item.id)}
                            type="button"
                            className="btn btn-danger me-2"
                          >
                            <FontAwesomeIcon
                              style={{ color: "white" }}
                              icon="fa-trash"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <div>
                <ul class="pagination float-end">
                  <li
                    className={
                      "page-item " + (currentPage === 1 ? "disabled" : "")
                    }
                    disabled={currentPage === 1}
                  >
                    <a
                      class="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </a>
                  </li>
                  {getPageNumbers()}
                  <li
                    className={
                      "page-item " +
                      (currentPage === total_page ? "disabled" : "")
                    }
                    disabled={currentPage === total_page}
                  >
                    <a
                      class="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <></>
       )}  */}
    </div>
  );
}

export default CrudTransaction;
