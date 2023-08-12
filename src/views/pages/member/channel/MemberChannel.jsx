import React from "react";
import { API_DUMMY } from "../../../../utils/baseURL";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { CFormInput } from "@coreui/react";
import "../../../css/ListDataSiswa.css";

function MemberChannel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const getAll = async () => {
    await axios
      .get(
        `${API_DUMMY}/member/channel?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&filter=${searchTerm}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
  }, [currentPage, limit, searchTerm, sortBy, sortDirection]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBills = list.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPages <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(totalPages - 1)
        );
      } else if (currentPage >= totalPages - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(totalPages - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          "dot",
          ...pageNumbers.slice(totalPages - 1)
        );
      }
    }

    return displayedPages.map((page, index) =>
      page === "dot" ? (
        <span key={`dot${index}`}>...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item" + (currentPage === page ? " active" : "")}
        >
          <a className="page-link">{page}</a>
        </li>
      )
    );
  };
  return (
    <div>
      {localStorage.getItem("type_token") === "Member" ? (
        <>
          <div className="row">
            <div className="col" xs={12}>
              <div className="inputSearch1 ">
                <select
                  className="form-select"
                  value={limit}
                  onChange={handleLimit}
                >
                  <option value="1">Show 1 Entries</option>
                  <option value="10">Show 10 Entries</option>
                  <option value="100">Show 100 Entries</option>
                </select>
              </div>
              <div className="col inputSearch1">
                <CFormInput
                  className="search-channel"
                  type="search"
                  placeholder="search data"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h4 className="textt">Channel</h4>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <select
                        className="inputSearch form-select"
                        value={limit}
                        onChange={handleLimit}
                      >
                        <option value="1">Show 1 Entries</option>
                        <option value="10">Show 10 Entries</option>
                        <option value="100">Show 100 Entries</option>
                      </select>
                    </div>
                    <div className="col inputSearch">
                      <CFormInput
                        className="search-channel"
                        type="search"
                        placeholder="search data"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <table className="tabel-transaction table  table1 responsive-3">
                    <thead className="text-center">
                      <tr>
                        <th onClick={() => handleSort("id")}>
                          No{" "}
                          {sortBy === "id" &&
                            (sortDirection === "asc" ? "▲" : "▼")}
                        </th>
                        <th onClick={() => handleSort("name")}>
                          Name{" "}
                          {sortBy === "name" &&
                            (sortDirection === "asc" ? "▲" : "▼")}
                        </th>
                        <th onClick={() => handleSort("active")}>
                          Active{" "}
                          {sortBy === "active" &&
                            (sortDirection === "asc" ? "▲" : "▼")}
                        </th>
                        <th onClick={() => handleSort("created_date")}>
                          Created Date{" "}
                          {sortBy === "created_date" &&
                            (sortDirection === "asc" ? "▲" : "▼")}
                        </th>
                        <th onClick={() => handleSort("updated_date")}>
                          Updated Date{" "}
                          {sortBy === "updated_date" &&
                            (sortDirection === "asc" ? "▲" : "▼")}
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      id="myTable"
                      className="bg-white"
                      style={{ textAlign: "center" }}
                    >
                      {filteredBills.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td data-cell="No">{index + 1}</td>
                            <td data-cell="Name">{item.name}</td>
                            <td data-cell="Active">
                              {item.active === true ? (
                                <span>true</span>
                              ) : (
                                <span>false</span>
                              )}
                            </td>
                            <td data-cell="Create Date">{item.created_date}</td>
                            <td data-cell="Update Date">{item.updated_date}</td>
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
                          (currentPage === totalPages ? "disabled" : "")
                        }
                        disabled={currentPage === totalPages}
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
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default MemberChannel;
