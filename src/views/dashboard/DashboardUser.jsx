import {
  cilArrowBottom,
  cilArrowThickTop,
  cilDollar,
  cilMoney,
  cilOptions,
  cilPeople,
  cilSitemap,
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

function DashboardUser() {
  const [organization, setOrganization] = useState([]);
  const [organization1, setOrganization1] = useState([]);
  const [payment, setPayment] = useState([]);
  const [payment1, setPayment1] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [transaction1, setTransaction1] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customer1, setCustomer1] = useState([]);
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
  const [monthlyDataOrganization, setMonthlyDataOrganization] = useState([]);
  const [monthlyDataCustomer, setMonthlyDataCustomer] = useState([]);
  const [monthlyDataTransaction, setMonthlyDataTransaction] = useState([]);
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

  const getAllOrganization = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/organization?page=${currentPageOrganization}&limit=${limitOrganization}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPagesOrganization(res.data.pagination.total_page);
        setOrganization(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllOrganization1 = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/organization?page=${currentPageOrganization}&limit=200`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      // .then((res) => {
      //   setTotalPagesOrganization(res.data.pagination.total_page);
      //   setOrganization(res.data.data);
      //   // console.log(res.data.data);
      // })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setOrganization1(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataOrganization(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   console.log([...res.data.data]);
        }
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
        return data.name
          .toLowerCase()
          .includes(searchTermPrgOnization.toLowerCase());
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
  }, [
    currentPageOrganization,
    setSearchTermOrganization,
    sortByOrganization,
    limitOrganization,
  ]);

  const renderPageNumbersOrganization = () => {
    const pageNumbers = Array.from(
      { length: totalPagesOrganization },
      (_, i) => i + 1
    );
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
          ...pageNumbers.slice(
            currentPageOrganization - 2,
            currentPageOrganization + 1
          ),
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
          className={
            "page-item " + (currentPageOrganization === page ? "active" : "")
          }
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  const getAllPayment = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/payment?page=${currentPagePayment}&limit=${limitPayment}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
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
        return data.description
          .toLowerCase()
          .includes(searchTermPayment.toLowerCase());
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
    const pageNumbers = Array.from(
      { length: totalPagesPayment },
      (_, i) => i + 1
    );
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
          className={
            "page-item " + (currentPagePayment === page ? "active" : "")
          }
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  const getAllTransaction = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/transaction?page=${currentPageTransaction}&limit=${limitTransaction}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        // setPages(res.data.data.total_page);
        setTotalPagesTransaction(res.data.pagination.total_page);
        setTransaction(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllTransaction1 = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/transaction?page=${currentPageTransaction}&limit=200`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setTransaction1(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataTransaction(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   console.log([...res.data.data]);
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
        return data.description
          .toLowerCase()
          .includes(searchTermTransaction.toLowerCase());
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
  }, [
    currentPageTransaction,
    setSearchTermTransaction,
    sortByTransaction,
    limitTransaction,
  ]);

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
          className={
            "page-item " + (currentPageTransaction === page ? "active" : "")
          }
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
        if (Array.isArray(res.data.data)) {
          setCustomer1(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.periode).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataCustomer(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   console.log([...res.data.data]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllCustomer1 = async () => {
    await axios
      .get(`${API_DUMMY}/user/customer?limit=200`, {
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
    getAllOrganization1();
    getAllCustomer1();
    getAllTransaction1();
  }, []);
  return (
    <>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {organization1.length} <span className="fs-6 fw-normal"></span>
              </>
            }
            title="Organization"
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
                      const table = document.getElementById("organization");
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
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                    "January",
                    "February",
                    "March",
                    "April",
                  ],
                  datasets: [
                    {
                      label: "Organization",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-primary"),
                      data: monthlyDataOrganization, // Menggunakan state monthlyData yang telah diubah
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
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={<>{transaction1.length}</>}
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
                      label: "transaction of data ",
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
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={<>{customer1.length}</>}
            title="Customer"
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
                      const table = document.getElementById("customer");
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
              <CChartBar
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
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  datasets: [
                    {
                      label: "customer of data",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: monthlyDataCustomer,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CChartBar
          type="doughnut"
          data={{
            labels: ["Organization", "Customer", "Transaction"],
            datasets: [
              {
                label: "Data Keseluruhan",
                backgroundColor: ["blue", "#E46651", "#00D8FF", "#DD1B16"],
                data: [
                  organization1.length,
                  customer1.length,
                  transaction1.length,
                ],
              },
            ],
          }}
        />
        <CChart
          id="organization"
          style={{ marginTop: "5%" }}
          type="bar"
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
              "Desember",
            ],
            datasets: [
              {
                label: "Organization",
                backgroundColor: "#f87979",
                data: monthlyDataOrganization,
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
              y: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
          }}
        />
        <CChart
          style={{ marginTop: "2%" }}
          id="transaction"
          type="bar"
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
              "Desember",
            ],
            datasets: [
              {
                label: "Transaction",
                backgroundColor: "#A0D8B3",
                data: monthlyDataOrganization,
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
              y: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
          }}
        />
      </CRow>
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
