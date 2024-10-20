
import {
  cilArrowBottom,
  cilArrowThickTop,
  cilDollar,
  cilMoney,
  cilOptions,
  cilPencil,
  cilPeople,
  cilPlus,
  cilSitemap,
  cilTrash,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAvatar,
  CCol,
  CDropdown,
  CDropdownToggle,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from "@coreui/react";
import React from "react";
import "../../views/css/DashboardUser.css";
import "../../views/css/ListDataSiswa.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/baseURL";
import { getStyle } from "@coreui/utils";
import { CChart, CChartBar, CChartLine } from "@coreui/react-chartjs";
import { Link } from "react-router-dom";

function DashboardUser() {
  const [payment, setPayment] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [transaction1, setTransaction1] = useState([]);
  const [total, setTotal] = useState([]);
  const [bill, setBill] = useState([]);

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
  const [monthlyDataOrganization, setMonthlyDataOrganization] = useState([]);
  const [monthlyDataCustomer, setMonthlyDataCustomer] = useState([]);
  const [monthlyDataTransaction, setMonthlyDataTransaction] = useState([]);
  const [monthlyDataTotal, setMonthlyDataTotal] = useState([]);
  const [monthlyDataBill, setMonthlyDataBill] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const getAllTransaction1 = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/transaction?page=${currentPageTransaction}&limit=${limitTransaction}`,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
      )
      .then((res) => {
        setTotalPagesTransaction(res.data.pagination.total_page);
        // setPages(res.data.data.total_page);
        setTransaction1(res.data.data);
        //console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  useEffect(() => {
    getAllTransaction1();
  }, [currentPageTransaction, searchTermTransaction, sortByTransaction, limitTransaction]);


  const getAllTotal = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/report/total`,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
      )
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setTotal(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.periode).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataTotal(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   //console.log([...res.data.data]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  const getAllBill = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/report/recap/bill`,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
      )
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setBill(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.periode).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataBill(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   //console.log([...res.data.data]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllTransaction = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/report/recap/transaction`,
        {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
      )
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setTransaction(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.periode).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataTransaction(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   //console.log([...res.data.data]);
        }
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
    getAllTransaction();
    getAllTotal();
    getAllBill();
  }, []);

  useEffect(() => {
    let sortedData = [...transaction1];
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
        return data.description
          .toLowerCase()
          .includes(searchTermTransaction.toLowerCase());
      });
    }
    setSortedTransaction(sortedData);
  }, [sortConfigTransaction, searchTermTransaction, transaction1]);

  // const handlePageChangeTransaction = (page) => {
  //   setCurrentPageTransaction(page);
  // };

  const handlePageChangeTransaction = (page) => {
    setCurrentPageTransaction(page);
  };

  const handleChangeLimitTransaction = (event) => {
    setLimitTransaction(event.target.value);
  };

  const renderPageNumbersTransaction = () => {
    const pageNumbers = Array.from(
      { length: totalPagesTransaction },
      (_, i) => i + 1
    );
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
          ...pageNumbers.slice(
            currentPageTransaction - 2,
            currentPageTransaction + 1
          ),
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
          className={
            "page-item " + (currentPageTransaction === page ? "active" : "")
          }
        >
          <a className="page-link">{page}</a>
        </li>
      )
    );
  };
  return (
    <>
      {/* <CRow>
        <CCol sm={6} lg={3}> */}
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={<>{transaction.length}</>}
            title="Transaction"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  <CIcon
                    icon={cilArrowBottom}
                    style={{ color: "white" }}
                    onClick={() => {
                      const table = document.getElementById("transaction");
                      if (table) {
                        window.scrollTo({
                          top: table.offsetTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                  />
                </CDropdownToggle>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desamber",
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-info"),
                      data: monthlyDataTransaction,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        {/* </CCol> */}

        <div className="row" id="transaction">
          <div className="col" xs={12}>
            <div className="card mb-4">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h4 className="textt">Transaction</h4>
                  </div>

                  <div className="col">
                    <Link to="/tambahtransaction">
                      <button className="btn btn-primary float-end">
                        <CIcon icon={cilPlus} className="color-q" /> Tambah
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <select
                      className="choise form-select"
                      value={limitTransaction}
                      onChange={handleChangeLimitTransaction}
                    >
                      <option value="1">Show 1 Entries</option>
                      <option value="10">Show 10 Entries</option>
                      <option value="100">Show 100 Entries</option>
                    </select>
                  </div>
                  <div className="col">
                    <CFormInput
                      // style={{ width: "50%", marginLeft: "15em" }}
                      className="filter-data-t"
                      type="search"
                      placeholder="search data"
                      value={searchTermTransaction}
                      onChange={handleSearchTransaction}
                    />
                  </div>
                </div>
                <table className="tabel-transaction table  table1 responsive-3">
                  <thead>
                    <tr>
                      <th scope="col" onClick={() => handleSort("id")}>
                        No{" "}
                        {sortByTransaction === "id" && (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>
                      <th scope="col" onClick={() => handleSort("description")}>
                        Description{" "}
                        {sortByTransaction === "description" &&
                          (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("organization_name")}
                      >
                        Organization Name{" "}
                        {sortByTransaction === "organization_name" &&
                          (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>
                      <th scope="col" onClick={() => handleSort("amount")}>
                        Nominal{" "}
                        {sortByTransaction === "amount" &&
                          (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>{" "}
                      <th scope="col" onClick={() => handleSort("created_date")}>
                        Create Date{" "}
                        {sortByTransaction === "created_date" &&
                          (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>
                      <th scope="col" onClick={() => handleSort("updated_date")}>
                        Update Date{" "}
                        {sortByTransaction === "updated_date" &&
                          (sortConfigTransaction === "asc" ? "▲" : "▼")}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody


                    id="myTable"
                    className="bg-white"
                  // style={{ textAlign: "center" }}
                  >
                    {sortedTransaction.map((item, index) => {
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

                          <td data-cell="Action">
                            <div className="tdd">
                              <button
                                onClick={() =>
                                  navigate(`/editTransaction/${item.id}`)
                                }
                                className="edit1"
                                style={{ background: "blue" }}
                              >
                                {" "}
                                <CIcon icon={cilPencil} />
                              </button>
                              {" "}
                              <button
                                onClick={() => Delete(item.id)}
                                className="edit1"
                                style={{ background: "red", color: "white" }}
                              >
                                <CIcon icon={cilTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <div>
                  <ul className="pagination float-end">
                    <li
                      className={
                        "page-item " + (currentPageTransaction === 1 ? "disabled" : "")
                      }
                      disabled={currentPageTransaction === 1}
                    >
                      <a
                        className="page-link"
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
                        className="page-link"
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
        </div>
      {/* </CRow> */}
      <button
        className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
        onClick={scrollToTop}
      >
        <CIcon icon={cilArrowThickTop} />
      </button>
    </>
  );
}
export default DashboardUser;