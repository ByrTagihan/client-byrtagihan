import React, { useEffect, useState } from "react";
import "../../../../views/css/ListDataSiswa.css";
import { CButton, CFormInput } from "@coreui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";

function Mesage() {
  const [message, setMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [limit, setLimit] = useState(10);

  const getAll = async () => {
    await axios
      .get(`${API_DUMMY}/user/message?page=${currentPage}&limit=${limit}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        // setPages(res.data.data.total_page);
        setMessage(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...message];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTerm !== "") {
      sortedData = sortedData.filter((data) => {
        return (
          data.send_as.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
      });
    }
    setSortedList(sortedData);
  }, [sortConfig, searchTerm, message]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChangeLimit = (event) => {
    setLimit(parseInt(event.target.value));
  };

  useEffect(() => {
    getAll();
  }, [currentPage, searchTerm, sortBy, limit]);

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

    return displayedPages.map((page) =>
      page === "dot" ? (
        <span
          className="border"
          key="dot"
          style={{
            width: "40px",
            textAlign: "center",
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          ...
        </span>
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
        <div className='inputSearch1'>
              <CFormInput
                type="search"
                placeholder="search Nama"
                value={searchTerm} onChange={handleSearch} 
              />
            </div>
                <div className="inputSearch1">
                  <select className="form-select" value={limit} onChange={handleChangeLimit}>
                  <option value="1">Show 1 Entries</option>
                  <option value="10">Show 10 Entries</option>
                  <option value="100">Show 100 Entries</option>
                    {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                  </select>
                </div>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{display:"flex"}}>
                <div className="col">
                  <h4>Message</h4>
                </div>
            <div style={{display:"flex", justifyContent:"center", gap:"5px"}}>
                <div className="inputSearch">
                  <select className="form-select" value={limit} onChange={handleChangeLimit}>
                  <option value="1">Show 1 Entries</option>
                  <option value="10">Show 10 Entries</option>
                  <option value="100">Show 100 Entries</option>
                    {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                  </select>
                </div>
                <div>
                <CFormInput className="inputSearch"
                  type="search"
                  placeholder="search data"
                  value={searchTerm} onChange={handleSearch} 
                />
              </div>
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table table1 responsive-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Receiver</th>
                    <th scope="col">Send As</th>
                    <th scope="col">Message type id</th>
                    <th scope="col">message status id</th>
                    <th scope="col">message status name</th>
                    <th scope="col">Created date</th>
                    <th scope="col">Updated date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((data, i) => (
                    <tr key={i}>
                      <td data-cell="No" scope="row">
                        {i + 1}
                      </td>
                      <td data-cell="Receiver">{data.receiver}</td>
                      <td data-cell="Send As">{data.send_as}</td>
                      <td data-cell="Message type id">
                        {data.message_type_id}
                      </td>
                      <td data-cell="Message status id">{data.message_status_id}</td>
                      <td data-cell="Message status name">{data.message_status_name}</td>
                      <td data-cell="Message created date">{data.created_date}</td>
                      <td data-cell="Message update date">{data.updated_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  );
}

export default Mesage;
