import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../../css/Payment.css";
import { API_DUMMY } from "../../../../utils/baseURL";
import { CFormInput } from "@coreui/react";

function CrudPayment() {
  const [total_page, setTotal_Page] = useState([]);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  const [payment, setPayment] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState([]);
  const [limit, setLimit] = useState("10");
  const [sortDirection, setSortDirection] = useState("asc");

  const getAll = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/payment?page=${currentPage}&limit=${limit}&name=${payment}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${search}`,
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
  }, [currentPage, limit, search, sortBy, sortDirection]);

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
        axios.delete(`${API_DUMMY}/user/payment/` + id, {
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

  

  const filteredBills = bills.filter((bill) =>
    bill.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBills = bills.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  // untuk limit

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: total_page }, (_, i) => i + 1);
    const displayedPages = [];

    if (total_page <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(total_page - 1)
        );
      } else if (currentPage >= total_page - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(total_page - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          "dot",
          ...pageNumbers.slice(total_page - 1)
        );
      }
    }

    return displayedPages.map((page) =>
      page === "dot" ? (
        <span key="dot">...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item " + (currentPage === page ? "active" : "")}
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };
  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{ height: "2.4em" }} className="row">
                <div className="col">
                  <div style={{ display: "flex" }}>
                    <div className="col">
                      <h4 className="textt">Payment</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
            <div className="two row">
                <div className="col">
                  <select
                    className="pilih form-select"
                    value={limit}
                    onChange={handleLimit}
                   
                  >
                    <option className="option-select" value="1">Show 1 Entries</option>
                    <option className="option-select" value="10">Show 10 Entries</option>
                    <option className="option-select" value="100">Show 100 Entries</option>
                  </select>
                </div>
                <div className="col">
                  <CFormInput
                    className="filter-data"
                    type="search"
                    placeholder="search data"
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <table  className="tabel-payment table table1 responsive-3">
                <thead className="text-center">
                <tr>
                    <th scope="col" onClick={() => handleSort("id")}>
                      No{" "}
                      {sortBy === "id" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("description")}>
                      Description{" "}
                      {sortBy === "description" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("organization_name")}
                    >
                      Organization Name{" "}
                      {sortBy === "organization_name" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("periode")}>
                      Periode{" "}
                      {sortBy === "periode" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("amount")}>
                      Nominal{" "}
                      {sortBy === "amount" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("created_date")}>
                      Create Date{" "}
                      {sortBy === "created_date" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("updated_date")}>
                      Update Date{" "}
                      {sortBy === "updated_date" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white" style={{ textAlign: "center" }}>
                  {filteredBills.map((data, index) => {
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
                  {renderPageNumbers()}
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