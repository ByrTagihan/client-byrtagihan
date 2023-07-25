import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { API_DUMMY } from '../../utils/baseURL';
import { useEffect } from 'react';
import { CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow, CWidgetStatsA } from '@coreui/react';
import { cilOptions } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

function DashboardCustomer() {
    const [rekapTransaction, setRekapTransaction] = useState([]);
    const [rekapTotal, setRekapTotal] = useState([]);
    const [rekapBill, setRekapBill] = useState([]);
    const [searchTermTransaction, setSearchTermTransaction] = useState("");
    const [sortedLisTransaction, setSortedListTransaction] = useState([]);
    const [sortConfigTransaction, setSortConfigTransaction] = useState({
      key: null,
      direction: "ascending",
    });
    const [searchTermBill, setSearchTermBill] = useState("");
    const [sortedLisBill, setSortedListBill] = useState([]);
    const [sortConfigBill, setSortConfigBill] = useState({
      key: null,
      direction: "ascending",
    });

    const getAllTransaction = async () => {
        await axios .get(`${API_DUMMY}/customer/report/recap/transaction`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },    
        })
        .then((res) => {
            setRekapTransaction(res.data.data)
        })
        .catch((error) => {
            alert("Terjadi Kesalahan" + error)
        })
    }

    const getAllBill = async () => {
        await axios .get(`${API_DUMMY}/customer/report/recap/bill`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },    
        })
        .then((res) => {
            setRekapBill(res.data.data)
        })
        .catch((error) => {
            alert("Terjadi Kesalahan" + error)
        })
    }

    const getAllTotal = async () => {
        await axios .get(`${API_DUMMY}/customer/report/total`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
            setRekapTotal(res.data.data)
        })
        .catch((error) => {
            alert("Terjadi Kesalahan" + error)
        })
    }

    useEffect(() => {
        getAllBill();
        getAllTransaction();
        getAllTotal();
    })

    const handleSortTrasnsaction = (key) => {
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
        let sortedData = [...rekapTransaction];
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
            return data.name.toLowerCase().includes(searchTermTransaction.toLowerCase());
          });
        }
        setSortedListTransaction(sortedData);
      }, [sortConfigTransaction, searchTermTransaction, rekapTransaction]);

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
        let sortedData = [...rekapBill];
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
      }, [sortConfigBill, searchTermBill, rekapBill]);

  return (
    <>
    <CRow>
    <CCol sm={6} lg={3}>
      <CWidgetStatsA
        className="mb-4"
        style={{ width: "130%", paddingBottom:"5%" }}
        color="primary"
        value={
          <>
            {rekapTransaction.length}{" "}
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
        // chart={
        //   <CChartLine
        //     className="mt-3 mx-3"
        //     style={{ height: "70px" }}
        //     data={{
        //       labels: [
        //         "January",
        //         "February",
        //         "March",
        //         "April",
        //         "May",
        //         "June",
        //         "July",
        //         "August",
        //         "September",
        //         "October",
        //         "November",
        //         "December",
        //         "January",
        //         "February",
        //         "March",
        //         "April",
        //       ],
        //       datasets: [
        //         {
        //           label: "Member",
        //           backgroundColor: "transparent",
        //           borderColor: "rgba(255,255,255,.55)",
        //           pointBackgroundColor: getStyle("--cui-primary"),
        //           data: monthlyData, // Menggunakan state monthlyData yang telah diubah
        //         },
        //       ],
        //     }}
        //     options={{
        //       plugins: {
        //         legend: {
        //           display: false,
        //         },
        //       },
        //       maintainAspectRatio: false,
        //       scales: {
        //         x: {
        //           grid: {
        //             display: false,
        //             drawBorder: false,
        //           },
        //           ticks: {
        //             display: false,
        //           },
        //         },
        //         y: {
        //           min: -9,
        //           max: 39,
        //           display: false,
        //           grid: {
        //             display: false,
        //           },
        //           ticks: {
        //             display: false,
        //           },
        //         },
        //       },
        //       elements: {
        //         line: {
        //           borderWidth: 1,
        //         },
        //         point: {
        //           radius: 4,
        //           hitRadius: 10,
        //           hoverRadius: 4,
        //         },
        //       },
        //     }}
        //   />
        // }
      />
    </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          style={{ width: "130%", marginLeft: "40%", paddingBottom:"5%" }}
          className="mb-4"
          color="info"
          value={
            <>
              {rekapBill.length}{" "}
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
        //   chart={
        //     <CChartLine
        //       className="mt-3 mx-3"
        //       style={{ height: "70px" }}
        //       data={{
        //         labels: [
        //           "January",
        //           "February",
        //           "March",
        //           "April",
        //           "May",
        //           "June",
        //           "July",
        //           "August",
        //           "September",
        //           "October",
        //           "November",
        //           "December",
        //           "January",
        //           "February",
        //           "March",
        //           "April",
        //         ],
        //         datasets: [
        //           {
        //             label: "My First dataset",
        //             backgroundColor: "transparent",
        //             borderColor: "rgba(255,255,255,.55)",
        //             pointBackgroundColor: getStyle("--cui-info"),
        //             data: monthlyDataBill,
        //           },
        //         ],
        //       }}
        //       options={{
        //         plugins: {
        //           legend: {
        //             display: false,
        //           },
        //         },
        //         maintainAspectRatio: false,
        //         scales: {
        //           x: {
        //             grid: {
        //               display: false,
        //               drawBorder: false,
        //             },
        //             ticks: {
        //               display: false,
        //             },
        //           },
        //           y: {
        //             min: -9,
        //             max: 39,
        //             display: false,
        //             grid: {
        //               display: false,
        //             },
        //             ticks: {
        //               display: false,
        //             },
        //           },
        //         },
        //         elements: {
        //           line: {
        //             borderWidth: 1,
        //           },
        //           point: {
        //             radius: 4,
        //             hitRadius: 10,
        //             hoverRadius: 4,
        //           },
        //         },
        //       }}
        //     />
        //   }
        />
      </CCol>
      </CRow>
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
                    <th scope="col" onClick={() => handleSortTrasnsaction("no")}>
                      No{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "no" && (
                         (sortConfigTransaction.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortTrasnsaction("periode")}>
                    periode{" "}
                    {sortConfigTransaction && sortConfigTransaction.key === "periode" && (
                       (sortConfigTransaction.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                    <th scope="col" onClick={() => handleSortTrasnsaction("count_bill")}>
                      Count Bill{" "}
                      {sortConfigTransaction && sortConfigTransaction.key === "count_bill" && (
                         (sortConfigTransaction.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                  <th scope="col" onClick={() => handleSortTrasnsaction("total_bill")}>
                    Total Bill{" "}
                    {sortConfigTransaction && sortConfigTransaction.key === "total_bill" && (
                       (sortConfigTransaction.direction === 'ascending' ? '▲' : '▼')
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLisTransaction.map((data, index) => {
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
    </>
  )
}

export default DashboardCustomer