import { cilDollar, cilMoney, cilPeople, cilSitemap, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAvatar,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import "../../views/css/DashboardUser.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/baseURL";

function DashboardUser() {
  const [organization, setOrganization] = useState([]);
  const [payment, setPayment] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [channel, setChannel] = useState([]);

  // start useState organization
  const [currentPageOrganization, setCurrentPageOrganization] = useState(1);
  const [totalPagesOrganization, setTotalPagesOrganization] = useState(1);
  const [sortByOrganization, setSortByOrganization] = useState("id");
  const [limitOrganization, setLimitOrganization] = useState(10);
  const [sortedOrganization, setSortedOrganization] = useState([]);
  const [sortConfigOrganization, setSortConfigOrganization] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTermPrgOnization, setSearchTermOrganization] = useState("");
  // useState end organization

   // start useState Payment
   const [currentPagePayment, setCurrentPagePayment] = useState(1);
   const [totalPagesPayment, setTotalPagesPayment] = useState(1);
   const [sortByPayment, setSortByPayment] = useState("id");
   const [limitPayment, setLimitPayment] = useState(10);
   const [sortedPayment, setSortedPayment] = useState([]);
   const [sortConfigPayment, setSortConfigPayment] = useState({
     key: null,
     direction: "ascending",
   });
   const [searchTermPayment, setSearchTermPayment] = useState("");
   // useState end Payment

      // start useState Payment
      const [currentPageTransaction, setCurrentPageTransaction] = useState(1);
      const [totalPagesTransaction, setTotalPagesTransaction] = useState(1);
      const [sortByTransaction, setSortByTransaction] = useState("id");
      const [limitTransaction, setLimitTransaction] = useState(10);
      const [sortedTransaction, setSortedTransaction] = useState([]);
      const [sortConfigTransaction, setSortConfigTransaction] = useState({
        key: null,
        direction: "ascending",
      });
      const [searchTermTransaction, setSearchTermTransaction] = useState("");
      // useState end Payment

  const getAllOrganization = async () => {
    await axios
      .get(`${API_DUMMY}/user/organization?page=${currentPageOrganization}&limit=${limitOrganization}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalPagesOrganization(res.data.pagination.total_page);
        setOrganization(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const handleSearchOrganization = (event) => {
    setSearchTermOrganization(event.target.value);
  };

  const handleSortOrganization = (key) => {
    let direction = "ascending";
    if (
      sortConfigOrganization &&
      sortConfigOrganization.key === key &&
      sortConfigOrganization.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigOrganization({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...organization];
    if (sortConfigOrganization !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfigOrganization.key] < b[sortConfigOrganization.key]) {
          return sortConfigOrganization.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfigOrganization.key] > b[sortConfigOrganization.key]) {
          return sortConfigOrganization.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTermPrgOnization !== "") {
      sortedData = sortedData.filter((data) => {
        return data.name.toLowerCase().includes(searchTermPrgOnization.toLowerCase());
      });
    }
    setSortedOrganization(sortedData);
  }, [sortConfigOrganization, searchTermPrgOnization, organization]);

  const handlePageChangeOrganization = (page) => {
    setCurrentPageOrganization(page);
  };

  const handleChangeLimitOrganization = (event) => {
    setLimitOrganization(event.target.value);
  };

  useEffect(() => {
    getAllOrganization();
  }, [currentPageOrganization, setSearchTermOrganization, sortByOrganization, limitOrganization]);

  const renderPageNumbersOrganization = () => {
    const pageNumbers = Array.from({ length: totalPagesOrganization }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPagesOrganization <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPageOrganization <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(totalPagesOrganization - 1)
        );
      } else if (currentPageOrganization >= totalPagesOrganization - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(totalPagesOrganization - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPageOrganization - 2, currentPageOrganization + 1),
          "dot",
          ...pageNumbers.slice(totalPagesOrganization - 1)
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
          onClick={() => handlePageChangeOrganization(page)}
          className={"page-item " + (currentPageOrganization === page ? "active" : "")}
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  const getAllPayment = async () => {
    await axios
      .get(`${API_DUMMY}/user/payment?page=${currentPagePayment}&limit=${limitPayment}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalPagesPayment(res.data.pagination.total_page);
        // setPages(res.data.data.total_page);
        setPayment(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const handleSearchPayment = (event) => {
    setSearchTermPayment(event.target.value);
  };

  const handleSortPayment = (key) => {
    let direction = "ascending";
    if (
      sortConfigPayment &&
      sortConfigPayment.key === key &&
      sortConfigPayment.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigPayment({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...payment];
    if (sortConfigPayment !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfigPayment.key] < b[sortConfigPayment.key]) {
          return sortConfigPayment.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfigPayment.key] > b[sortConfigPayment.key]) {
          return sortConfigPayment.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTermPayment !== "") {
      sortedData = sortedData.filter((data) => {
        return data.description.toLowerCase().includes(searchTermPayment.toLowerCase());
      });
    }
    setSortedPayment(sortedData);
  }, [sortConfigPayment, searchTermPayment, payment]);

  const handlePageChangePayment = (page) => {
    setCurrentPagePayment(page);
  };

  const handleChangeLimitPayment = (event) => {
    setLimitPayment(event.target.value);
  };

  useEffect(() => {
    getAllPayment();
  }, [currentPagePayment, setSearchTermPayment, sortByPayment, limitPayment]);

  const renderPageNumbersPayment = () => {
    const pageNumbers = Array.from({ length: totalPagesPayment }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPagesPayment <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPagePayment <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(totalPagesPayment - 1)
        );
      } else if (currentPagePayment >= totalPagesPayment - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(totalPagesPayment - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPagePayment - 2, currentPagePayment + 1),
          "dot",
          ...pageNumbers.slice(totalPagesPayment - 1)
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
          onClick={() => handlePageChangePayment(page)}
          className={"page-item " + (currentPagePayment === page ? "active" : "")}
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  const getAllTransaction = async () => {
    await axios
      .get(`${API_DUMMY}/user/transaction?page=${currentPageTransaction}&limit=${limitTransaction}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setTotalPagesTransaction(res.data.pagination.total_page)
        setTransaction(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  const handleSearchTransaction = (event) => {
    setSearchTermTransaction(event.target.value);
  };

  const handleSortTransaction = (key) => {
    let direction = "ascending";
    if (
      sortConfigTransaction &&
      sortConfigTransaction.key === key &&
      sortConfigTransaction.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigTransaction({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...transaction];
    if (sortConfigTransaction !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfigTransaction.key] < b[sortConfigTransaction.key]) {
          return sortConfigTransaction.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfigTransaction.key] > b[sortConfigTransaction.key]) {
          return sortConfigTransaction.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTermTransaction !== "") {
      sortedData = sortedData.filter((data) => {
        return data.description.toLowerCase().includes(searchTermTransaction.toLowerCase());
      });
    }
    setSortedTransaction(sortedData);
  }, [sortConfigTransaction, searchTermTransaction, transaction]);

  const handlePageChangeTransaction = (page) => {
    setCurrentPageTransaction(page);
  };

  const handleChangeLimitTransaction = (event) => {
    setLimitTransaction(event.target.value);
  };

  useEffect(() => {
    getAllTransaction();
  }, [currentPageTransaction, setSearchTermTransaction, sortByTransaction, limitTransaction]);

  const renderPageNumbersTransaction = () => {
    const pageNumbers = Array.from({ length: totalPagesTransaction }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPagesTransaction <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPageTransaction <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(totalPagesTransaction - 1)
        );
      } else if (currentPageTransaction >= totalPagesTransaction - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(totalPagesTransaction - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPageTransaction - 2, currentPageTransaction + 1),
          "dot",
          ...pageNumbers.slice(totalPagesTransaction - 1)
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
          onClick={() => handlePageChangeTransaction(page)}
          className={"page-item " + (currentPageTransaction === page ? "active" : "")}
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  const getAllCustomer = async () => {
    await axios
      .get(`${API_DUMMY}/user/customer`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setCustomer(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllChannel = async () => {
    await axios
      .get(`${API_DUMMY}/user/channel`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setChannel(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    // getAllOrganization(0);
    // getAllPayment(0);
    // getAllTransaction(0);
    getAllCustomer(0);
    getAllChannel(0);
  }, []);
  return (
    <>
      <div className="bok">
        <div className="bok1">
          <div className="bok3">
            <p>Organization</p>
            <CIcon icon={cilSitemap}/>
          </div>
          <div className="jumlah">
            <CIcon icon={cilUser}/>
            <p>{organization.length}</p>
          </div>
        </div>
        <div className="bok1">
          <div className="bok3">
            <p>Payment</p>
            <CIcon icon={cilDollar}/>
          </div>
          <div className="jumlah">
            <CIcon icon={cilUser}/>
            <p>{payment.length}</p>
          </div>
        </div>
        <div className="bok1">
          <div className="bok3">
            <p>Transaction</p>
            <CIcon icon={cilMoney}/>
          </div>
          <div className="jumlah">
            <CIcon icon={cilUser}/>
            <p>{transaction.length}</p>
          </div>
        </div>
      </div>
      <div className="bok2">
        <div className="bok1">
          <div className="bok3">
            <p>Customer</p>
            <i className="far fa-user"></i>
          </div>
          <div className="jumlah">
            <CIcon icon={cilUser}/>
            <p>{customer.length}</p>
          </div>
        </div>
        <div className="bok1">
          <div className="bok3">
            <p>Channel</p>
            <i className="fas fa-money-check"></i>
          </div>
          <div className="jumlah">
            <CIcon icon={cilUser}/>
            <p>{channel.length}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{display:"flex"}}>
                <div className="col">
                  <h4>Organization</h4>
                </div>
                <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <div className="inputSearch">
                  <select
                    className="form-select"
                    value={limitOrganization}
                    onChange={handleChangeLimitOrganization}
                  >
                    <option value="1">Show 1 Entries</option>
                    <option value="10">Show 10 Entries</option>
                    <option value="100">Show 100 Entries</option>
                    {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                  </select>
                </div>
                <div className="inputSearch">
                  <CFormInput
                    type="search"
                    style={{
                      marginBottom: "2px",
                      width: "20em",
                      marginRight: "14px",
                      marginTop: "1px",
                    }}
                    placeholder="search data"
                    value={searchTermPrgOnization}
                    onChange={handleSearchOrganization}
                  />
                </div>
                </div>
            </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                  <th scope="col" onClick={() => handleSortOrganization("no")}>
                      No{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "no" && (
                       (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("nama")}>
                      Nama{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "nama" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("email")}>
                      Email{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "email" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("provinsi")}>
                      Provinsi{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "provinsi" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("balance")}>
                      Balance{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "balance" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("bank_acount_number")}>
                      Bank Acount Number{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "bank_acount_number" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("bank_acount_name")}>
                      Bank Acount Name{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "bank_acount_name" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortOrganization("nama_bank")}>
                      Nama Bank{" "}
                      {sortConfigOrganization && sortConfigOrganization.key === "nama_bank" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrganization.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="Id">{index + 1}</td>
                        <td data-cell="Name">{data.name}</td>
                        <td data-cell="Email">{data.email}</td>
                        <td data-cell="Provinsi">{data.provinsi}</td>
                        <td data-cell="Provinsi">{data.balance}</td>
                        <td data-cell="Create Date">
                          {data.bank_account_number}
                        </td>
                        <td data-cell="Update Date">
                          {data.bank_account_name}
                        </td>
                        <td data-cell="Update Date">{data.bank_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul class="pagination float-end">
                <li
                  className={
                    "page-item " + (currentPageOrganization === 1 ? "disabled" : "")
                  }
                  disabled={currentPageOrganization === 1}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChangeOrganization(currentPageOrganization - 1)}
                  >
                    Previous
                  </a>
                </li>
                {renderPageNumbersOrganization()}
                <li
                  className={
                    "page-item " +
                    (currentPageOrganization === totalPagesOrganization ? "disabled" : "")
                  }
                  disabled={currentPageOrganization === totalPagesOrganization}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChange(currentPageOrganization + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
             
            <div style={{display:"flex"}}>
                <div className="col">
                  <h4>Payment</h4>
                </div>
                <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <div className="inputSearch">
                  <select
                    className="form-select"
                    value={limitPayment}
                    onChange={handleChangeLimitPayment}
                  >
                    <option value="1">Show 1 Entries</option>
                    <option value="10">Show 10 Entries</option>
                    <option value="100">Show 100 Entries</option>
                    {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                  </select>
                </div>
                <div className="inputSearch">
                  <CFormInput
                    type="search"
                    style={{
                      marginBottom: "2px",
                      width: "20em",
                      marginRight: "14px",
                      marginTop: "1px",
                    }}
                    placeholder="search data"
                    value={searchTermPayment}
                    onChange={handleSearchPayment}
                  />
                </div>
                </div>
            </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                  <th scope="col" onClick={() => handleSortPayment("no")}>
                      No{" "}
                      {sortConfigPayment && sortConfigPayment.key === "no" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortPayment("deskripsi")}>
                      Deskripsi{" "}
                      {sortConfigPayment && sortConfigPayment.key === "deskripsi" && (
                         (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortPayment("name")}>
                      Name{" "}
                      {sortConfigPayment && sortConfigPayment.key === "name" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortPayment("periode")}>
                      Periode{" "}
                      {sortConfigPayment && sortConfigPayment.key === "periode" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortPayment("amount")}>
                      Amount{" "}
                      {sortConfigPayment && sortConfigPayment.key === "amount" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPayment.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="Id">{index + 1}</td>
                        <td data-cell="Deskripsi">{data.description}</td>
                        <td data-cell="Nama">{data.organization_name}</td>
                        <td data-cell="Periode">{data.periode}</td>
                        <td data-cell="Amount">{data.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul class="pagination float-end">
                <li
                  className={
                    "page-item " + (currentPagePayment === 1 ? "disabled" : "")
                  }
                  disabled={currentPagePayment === 1}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChangePayment(currentPagePayment - 1)}
                  >
                    Previous
                  </a>
                </li>
                {renderPageNumbersPayment()}
                <li
                  className={
                    "page-item " +
                    (currentPagePayment === totalPagesPayment ? "disabled" : "")
                  }
                  disabled={currentPagePayment === totalPagesPayment}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChangePayment(currentPagePayment + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{display:"flex"}}>
                <div className="col">
                  <h4>Transaction</h4>
                </div>
                <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <div className="inputSearch">
                  <select
                    className="form-select"
                    value={limitTransaction}
                    onChange={handleChangeLimitTransaction}
                  >
                    <option value="1">Show 1 Entries</option>
                    <option value="10">Show 10 Entries</option>
                    <option value="100">Show 100 Entries</option>
                    {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                  </select>
                </div>
                <div className="inputSearch">
                  <CFormInput
                    type="search"
                    style={{
                      marginBottom: "2px",
                      width: "20em",
                      marginRight: "14px",
                      marginTop: "1px",
                    }}
                    placeholder="search data"
                    value={searchTermTransaction}
                    onChange={handleSearchTransaction}
                  />
                </div>
                </div>
            </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                  <th scope="col" onClick={() => handleSortTransaction("no")}>
                      No{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "no" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortTransaction("deskripsi")}>
                      Deskripsi{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "deskripsi" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortTransaction("name")}>
                      Name{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "name" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortTransaction("amount")}>
                      Amount{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "amount" && (
                        (sortDirection.direction === "ascending" ? "▲" : "▼")
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransaction.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="Id">{index + 1}</td>
                        <td data-cell="Deskripsi">{data.description}</td>
                        <td data-cell="Nama">{data.organization_name}</td>
                        <td data-cell="Amount">{data.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul class="pagination float-end">
                <li
                  className={
                    "page-item " + (currentPageTransaction === 1 ? "disabled" : "")
                  }
                  disabled={currentPageTransaction === 1}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChangeTransaction(currentPageTransaction - 1)}
                  >
                    Previous
                  </a>
                </li>
                {renderPageNumbersTransaction()}
                <li
                  className={
                    "page-item " +
                    (currentPageTransaction === totalPagesTransaction ? "disabled" : "")
                  }
                  disabled={currentPageTransaction === totalPagesTransaction}
                >
                  <a
                    class="page-link"
                    onClick={() => handlePageChangeTransaction(currentPageTransaction + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4>Customer </h4>
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Last login</th>
                    <th scope="col">No Hp</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td data-cell="Id">{index + 1}</td>
                        <td data-cell="Nama">{data.name}</td>
                        <td data-cell="Nama">{data.email}</td>
                        <td data-cell="Last Login">{data.last_login}</td>
                        <td data-cell="Last Login">{data.hp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashboardUser;
