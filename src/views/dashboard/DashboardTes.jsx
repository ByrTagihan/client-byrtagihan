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
  const [member, setMember] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [bill, setBill] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [monthlyDataBill, setMonthlyDataBill] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const getAll = async () => {
    await axios
      .get(`${API_DUMMY}/customer/member?limit=100`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setMember(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyData(monthlyData);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
          //   console.log([...res.data.data]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  const getAllOrganization = async () => {
    await axios
      .get(`${API_DUMMY}/customer/organization?limit=100`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setOrganization(res.data.data);

          // Combine the data
          const combinedData = [...res.data.data];
          setCombinedData((prevData) => [...prevData, ...combinedData]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllBill = async () => {
    await axios
      .get(`${API_DUMMY}/customer/bill?limit=100`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setBill(res.data.data);

          // Menghitung jumlah member setiap bulan
          const monthlyData = new Array(12).fill(0); // Inisialisasi array dengan nilai 0 untuk setiap bulan
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            monthlyData[createdMonth]++;
          });
          setMonthlyDataBill(monthlyData);
          // Combine the data
          const combinedData = [...res.data.data];
          setCombinedData((prevData) => [...prevData, ...combinedData]);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const [totalAmounts, setTotalAmounts] = useState([]);
  const getAllBillAmount = async () => {
    await axios
      .get(`${API_DUMMY}/customer/bill?limit=200`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setBill(res.data.data);

        // Menghitung jumlah member setiap bulan
        const monthlyData = new Array(12).fill(0);
        res.data.data.forEach((item) => {
          const createdMonth = new Date(item.periode).getMonth();
          monthlyData[createdMonth] += item.amount;
        });
        setTotalAmounts(monthlyData);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAllBillAmount(0);
  }, []);

  useEffect(() => {
    getAllOrganization();
    getAll();
    getAllBill();
  });

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          style={{ width: "130%" }}
          color="primary"
          value={
            <>
              {member.length}{" "}
              <span className="fs-6 fw-normal">
              </span>
            </>
          }
          title="Members"
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
          style={{ width: "130%", marginLeft: "40%" }}
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
          style={{ width: "130%", marginLeft: "80%" }}
          className="mb-4"
          color="warning"
          value={
            <>
              {bill.length}{" "}
              <span className="fs-6 fw-normal">
              </span>
            </>
          }
          title="Total Amount Bill"
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
          labels: ["Members", "Organization", "bill"],
          datasets: [
            {
                label: 'Data Keseluruhan',
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: [member.length, organization.length, bill.length],
            },
          ],
        }}
      />

      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4" style={{marginTop:"5%"}}>
            <div className="card-header">
              <div style={{ display: "flex" }}>
                <div className="col">
                  <h4>Member</h4>
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
              <table className="table table1 responsive-3">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Unique</th>
                    <th>Name</th>
                    <th>Hp</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {member.map((data, index) => {
                    return (
                      <tr key={data.index}>
                        <td data-cell="Id" scope="row">
                          {index + 1}
                        </td>
                        <td data-cell="Nisn">{data.unique_id}</td>
                        <td data-cell="Nama">{data.name}</td>
                        <td data-cell="Handphone">{data.hp}</td>
                        <td data-cell="Alamat">{data.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <div></div>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col" xs={12}>
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
        </div>
    </CRow>
  );
};

export default DashboardTes;
