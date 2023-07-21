import React from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { API_DUMMY } from "../../utils/baseURL";
import axios from "axios";

const DashboardTes = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [sortedList, setSortedList] = useState([]);
    const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: "ascending",
    });
  const [member, setMember] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [bill, setBill] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [monthlyDataBill, setMonthlyDataBill] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  // const getAll = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/customer/member?limit=100`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       if (Array.isArray(res.data.data)) {
  //         setMember(res.data.data);

  //         // Menghitung jumlah member setiap bulan
  //         const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
  //         res.data.data.forEach((item) => {
  //           const createdMonth = new Date(item.created_date).getMonth();
  //           monthlyData[createdMonth]++;
  //         });
  //         setMonthlyData(monthlyData);
  //         const combinedData = [...res.data.data];
  //         setCombinedData(combinedData);
  //         //   console.log([...res.data.data]);
  //       }
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };
  const getAllTransaction = async () => {
    await axios
      .get(`${API_DUMMY}/customer/report/recap/transaction`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      // .then((res) => {
      //   if (Array.isArray(res.data.data)) {
      //     setTransaction(res.data.data);

      //     // Menghitung jumlah member setiap bulan
      //     const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
      //     res.data.data.forEach((item) => {
      //       const createdMonth = new Date(item.periode).getMonth();
      //       monthlyData[createdMonth]++;
      //     });
      //     setMonthlyData(monthlyData);
      //     const combinedData = [...res.data.data];
      //     setCombinedData(combinedData);
      //     //   console.log([...res.data.data]);
      //   }
      // })
      .then((res) => {
        setTransaction(res.data.data)
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
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
    let sortedData = [...transaction];
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
        return data.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    setSortedList(sortedData);
  }, [sortConfig, searchTerm, transaction]);
  // const getAllOrganization = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/customer/organization?limit=100`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       if (Array.isArray(res.data.data)) {
  //         setOrganization(res.data.data);

  //         // Combine the data
  //         const combinedData = [...res.data.data];
  //         setCombinedData((prevData) => [...prevData, ...combinedData]);
  //       }
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  const getAllBill = async () => {
    await axios
      .get(`${API_DUMMY}/customer/report/recap/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      // .then((res) => {
      //   if (Array.isArray(res.data.data)) {
      //     setBill(res.data.data);

      //     // Menghitung jumlah member setiap bulan
      //     const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
      //     res.data.data.forEach((item) => {
      //       const createdMonth = new Date(item.periode).getMonth();
      //       monthlyData[createdMonth]++;
      //     });
      //     setMonthlyDataBill(monthlyData);
      //     // Combine the data
      //     const combinedData = [...res.data.data];
      //     setCombinedData((prevData) => [...prevData, ...combinedData]);
      //   }
      // })
      .then((res) => {
        setBill(res.data.data)
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const [total, setTotal] = useState([])
  const [totalAmounts, setTotalAmounts] = useState([]);
  const [member1, setMember1] = useState("");
  const [bill1, setBill1] = useState("");
  const [transaction1, setTransaction1] = useState("");
  const [total1, setTotal1] = useState({
    member:"",
    transaction:"",
    bill:"",
  })
  const getAllTotal = async () => {
    await axios
      .get(`${API_DUMMY}/customer/report/total`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const total = res.data.data;
        setTotal1(total)
        setMember1(total.member);
        setBill1(total.bill);
        setTransaction1(total.transaction);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAllTotal();
    // getAllOrganization();
    getAllTransaction();
    getAllBill();
  });
    const [searchTermBill, setSearchTermBill] = useState("");
    const [sortedListBill, setSortedListBill] = useState([]);
    const [sortConfigBill, setSortConfigBill] = useState({
      key: null,
      direction: "ascending",
    });

  const getAll = async () => {
    await axios
      .get(`${API_DUMMY}/customer/report/recap/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setTotalPages(res.data.pagination.total_page);
        setBill(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleSortBill = (key) => {
    let direction = "ascending";
    if (
      sortConfigBill &&
      sortConfigBill.key === key &&
      sortConfigBill.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigBill({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...bill];
    if (sortConfigBill !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfigBill.key] < b[sortConfigBill.key]) {
          return sortConfigBill.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfigBill.key] > b[sortConfigBill.key]) {
          return sortConfigBill.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTermBill !== "") {
      sortedData = sortedData.filter((data) => {
        return data.name.toLowerCase().includes(searchTermBill.toLowerCase());
      });
    }
    setSortedListBill(sortedData);
  }, [sortConfigBill, searchTermBill, bill]);

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {transaction.length}{" "}
              <span className="fs-6 fw-normal">
              </span>
            </>
          }
          title="Transaction"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
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
                    label: "Member",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: monthlyData, // Menggunakan state monthlyData yang telah diubah
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
          value={
            <>
              {bill.length}{" "}
              <span className="fs-6 fw-normal">
              </span>
            </>
          }
          title="Bill"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
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
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: monthlyDataBill,
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
          color="warning"
          value={
            <>
              1{" "}
              <span className="fs-6 fw-normal">
              </span>
            </>
          }
          title="Total"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
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
                    label: "Total Amount",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: totalAmounts,
                    fill: true,
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
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
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
          labels: ["Transaction", "total", "bill"],
          datasets: [
            {
                label: 'Data Keseluruhan',
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: [transaction.length, total.length, bill.length],
            },
          ],
        }}
      />
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{ display: "flex" }}>
                <div className="col">
                  <h4>Rekap Transaction</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                      <th scope="col" onClick={() => handleSort("no")}>
                        No{" "}
                        {sortConfig && sortConfig.key === "no" && (
                           (sortConfig.direction === 'ascending' ? '▲' : '▼')
                        )}
                      </th>
                    <th scope="col" onClick={() => handleSort("periode")}>
                      periode{" "}
                      {sortConfig && sortConfig.key === "periode" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                      <th scope="col" onClick={() => handleSort("count_bill")}>
                        Count Bill{" "}
                        {sortConfig && sortConfig.key === "count_bill" && (
                           (sortConfig.direction === 'ascending' ? '▲' : '▼')
                        )}
                      </th>
                    <th scope="col" onClick={() => handleSort("total_bill")}>
                      Total Bill{" "}
                      {sortConfig && sortConfig.key === "total_bill" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((data, index) => {
                    return (
                      <tr>
                        <td data-cell="Id" scope="row">
                          {" "}
                          {index + 1}
                        </td>
                        <td data-cell="Name">{data.periode}</td>
                        <td data-cell="Create Date">{data.count_bill}</td>
                        <td data-cell="Update Date">{data.total_bill}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <div className="row">
      <div className="col" xs={12}>
        <div className="card mb-4">
          <div className="card-header">
            <div style={{ display: "flex" }}>
              <div className="col">
                <h4>Rekap Bill</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
              </div>
            </div>
          </div>
          <div className="card-body table-container">
            <table className="table responsive-3 table1">
              <thead>
                <tr>
                    <th scope="col" onClick={() => handleSortBill("no")}>
                      No{" "}
                      {sortConfigBill && sortConfigBill.key === "no" && (
                         (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortBill("periode")}>
                    periode{" "}
                    {sortConfigBill && sortConfigBill.key === "periode" && (
                       (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                    <th scope="col" onClick={() => handleSortBill("count_bill")}>
                      Count Bill{" "}
                      {sortConfigBill && sortConfigBill.key === "count_bill" && (
                         (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortBill("total_bill")}>
                    Total Bill{" "}
                    {sortConfigBill && sortConfigBill.key === "total_bill" && (
                       (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSortBill("unpaid_bill")}>
                    Unpaid Bill{" "}
                    {sortConfigBill && sortConfigBill.key === "unpaid_bill" && (
                       (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSortBill("paid_bill")}>
                    Paid Bill{" "}
                    {sortConfigBill && sortConfigBill.key === "paid_bill" && (
                       (sortConfigBill.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedListBill.map((data, index) => {
                  return (
                    <tr>
                      <td data-cell="Id" scope="row">
                        {" "}
                        {index + 1}
                      </td>
                      <td data-cell="Name">{data.periode}</td>
                      <td data-cell="Create Date">{data.count_bill}</td>
                      <td data-cell="Update Date">{data.total_bill}</td>
                      <td data-cell="Update Date">{data.unpaid_bill}</td>
                      <td data-cell="Update Date">{data.paid_bill}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col" xs={12}>
        <div className="card mb-4">
          <div className="card-header">
            <div style={{ display: "flex" }}>
              <div className="col">
                <h4>Rekap Total</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
              </div>
            </div>
          </div>
          <div className="card-body table-container">
            <table className="table responsive-3 table1">
              <thead>
                {/* <tr>
                    <th scope="col" onClick={() => handleSort("no")}>
                      No{" "}
                      {sortConfig && sortConfig.key === "no" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSort("periode")}>
                    periode{" "}
                    {sortConfig && sortConfig.key === "periode" && (
                       (sortConfig.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                    <th scope="col" onClick={() => handleSort("count_bill")}>
                      Count Bill{" "}
                      {sortConfig && sortConfig.key === "count_bill" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSort("total_bill")}>
                    Total Bill{" "}
                    {sortConfig && sortConfig.key === "total_bill" && (
                       (sortConfig.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("unpaid_bill")}>
                    Unpaid Bill{" "}
                    {sortConfig && sortConfig.key === "unpaid_bill" && (
                       (sortConfig.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("paid_bill")}>
                    Paid Bill{" "}
                    {sortConfig && sortConfig.key === "paid_bill" && (
                       (sortConfig.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                </tr> */}
                <tr>
                <th scope="col">Member</th>
                <th scope="col">Bill</th>
                <th scope="col">Transaction</th>
                </tr>
              </thead>
              <tbody>
                    <tr>
                      <td data-cell="Member">{total1.member}</td>
                      <td data-cell="Bill">{total1.bill}</td>
                      <td data-cell="Transaction">{total1.transaction}</td>
                    </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      {/* <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4>Bill</h4>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Member name</th>
                    <th>Deskiripsi</th>
                    <th>Periode</th>
                    <th>Amount</th>
                    <th>Paid Id</th>
                    <th>Paid Amount</th>
                    <th>Paid date</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {bill.map((data, id) => (
                    <tr key={data.id}>
                      <th scope="row">{id + 1}</th>
                      <td>{data.member_name}</td>
                      <td>{data.description}</td>
                      <td>{data.periode}</td>
                      <td>{data.amount}</td>
                      <td>
                        {data.paid_id != 0 ? (
                          <span>Sudah Bayar</span>
                        ) : (
                          <span>Belum Bayar</span>
                        )}
                      </td>
                      <td>{data.paid_date}</td>
                      <td>{data.paid_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
          </div>
        </div> */}
    </CRow>
  );
};

export default DashboardTes;
