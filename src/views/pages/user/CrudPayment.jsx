import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/Payment.css";

function CrudPayment() {
  const [total_page, setTotal_Page] = useState([]);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  const [payment, setPayment] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState([]);

  const getAll = async () => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/user/payment?page=${currentPage}&limit=10&name=${payment}`,
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
  }, [currentPage, search, sortBy]);

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
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
  bill.description.toLowerCase().includes(search.toLowerCase())
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
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <div style={{ display: "flex" }}>
                    <div className="col">
                      <h4 className="textt">Payment</h4>
                    </div>

                    <input
                      type="text"
                      class="form-control float-end"
                      placeholder="Search description"
                      value={search}
                      onChange={handleSearch}
                      style={{ width: "30%", marginLeft: "40em" }}
                    />
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
                    <th scope="col">Periode</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Update Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white" style={{ textAlign: "center" }}>
                  {sortedBills.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="No">{index + 1}</td>
                        <td data-cell="Description">{data.description}</td>
                        <td data-cell="Organization">
                          {data.organization_name}
                        </td>
                        <td data-cell="Periode">{data.periode}</td>
                        <td data-cell="Nominal">{data.amount}</td>
                        <td data-cell="Create Date">{data.created_date}</td>
                        <td data-cell="Update Date">{data.updated_date}</td>
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
    </div>
  );
}

export default CrudPayment;