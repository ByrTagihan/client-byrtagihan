import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Charts from "../widgets/Charts";
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

function DashboardMember() {
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState("");
  const [memberChannel, setmemberChannel] = useState([]);
  const param = useParams();
  const [show, setShow] = useState(false);

  const getAll = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/member/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setList(res.data.data);
        setAmount(res.data.data.amount);
        console.log(res.data.amount);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  const getMemberchannel = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/member/channel`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setmemberChannel(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
    getMemberchannel(0);
  }, []);

  return (
    <div>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {list.length}{" "}
                <span className="fs-6 fw-normal">
                  (-12.4% <CIcon icon={cilArrowBottom} />)
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
                    // "January",
                    // "February",
                    // "March",
                    // "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-primary"),
                      data: [72, 59, 84],
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
                      min: 30,
                      max: 89,
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
                      tension: 0.4,
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
                ${" "}
                <span className="fs-6 fw-normal">
                  (40.9% <CIcon icon={cilArrowTop} />)
                </span>
              </>
            }
            title="Amount"
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
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-info"),
                      data: [1, 18, 9, 17, 34, 22, 11],
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
                {memberChannel.length}{" "}
                <span className="fs-6 fw-normal">
                  (84.7% <CIcon icon={cilArrowTop} />)
                </span>
              </>
            }
            title="Channel"
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
                    // "January",
                    // "February",
                    // "March",
                    // "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [78, 81, 80],
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
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
              <>
                44K{" "}
                <span className="fs-6 fw-normal">
                  (-23.6% <CIcon icon={cilArrowBottom} />)
                </span>
              </>
            }
            title="Sessions"
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
                    "January",
                    "February",
                    "March",
                    "April",
                  ],
                  datasets: [
                    {
                      label: "amount of data",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [
                        78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                        67, 82,
                      ],
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
      </CRow>

      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          marginTop: "2em",
          marginBottom: "2.5rem",
        }}
      >
        {/* <div
          style={{
            background: "white",
            width: "30%",
            height: "6.5rem",
            borderRadius: "5px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <p
            style={{
              width: "100%",
              height: "2rem",
              backgroundColor: "#213555",
              color: "white",
              textAlign: "center",
            }}
          >
            All Member
          </p>
          <i
            style={{ marginLeft: "5rem", marginTop: "5px", fontSize: "30px" }}
            className="fa-solid fa-user"
          ></i>
          <p
            style={{
              fontSize: "25px",
              marginLeft: "7.5rem",
              marginTop: "-2rem",
            }}
          >
            0
          </p>
        </div> */}
        {/* 
        <div
          style={{
            background: "white",
            width: "30%",
            height: "6.5rem",
            borderRadius: "5px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <p
            style={{
              width: "100%",
              height: "2rem",
              backgroundColor: "#213555",
              color: "white",
              textAlign: "center",
            }}
          >
            Student Bills
          </p>
          <i
            style={{ marginLeft: "5rem", marginTop: "5px", fontSize: "30px" }}
            class="fa-solid fa-money-bill-trend-up"
          ></i>

          <p
            style={{
              fontSize: "25px",
              marginLeft: "7.5rem",
              marginTop: "-2rem",
            }}
          >
            {list.length}
          </p>
        </div> */}

        {/* <div
          style={{
            background: "white",
            width: "30%",
            height: "6.5rem",
            borderRadius: "5px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <p
            style={{
              width: "100%",
              height: "2rem",
              backgroundColor: "#213555",
              color: "white",
              textAlign: "center",
            }}
          >
            Total per Bulan
          </p>
          <i
            style={{ marginLeft: "5rem", marginTop: "5px", fontSize: "30px" }}
            className="fa-solid fa-money-bill"
          ></i>
          <p
            style={{
              fontSize: "25px",
              marginLeft: "7.5rem",
              marginTop: "-2rem",
            }}
          >
           9
          </p>
        </div> */}
      </div>

      <h3 style={{ fontWeight: "bold" }}>List Tagihan</h3>

      <div style={{ marginTop: "1rem" }}>
        <table className="table border" style={{ textAlign: "center" }}>
          <thead
            className="thead-dark"
            style={{ backgroundColor: "#213555", color: "white" }}
          >
            <tr>
              <th scope="col">No</th>
              <th scope="col">Description</th>
              <th scope="col">Organization Name</th>
              <th scope="col">Periode</th>
              <th scope="col">Member Name</th>
              <th scope="col">Date</th>
              <th scope="col">Nominal</th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ textAlign: "center" }}>
            {list.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.description}</td>
                  <td>{data.organization_name}</td>
                  <td>{data.periode}</td>
                  <td>{data.member_name}</td>
                  <td>{data.paid_date}</td>
                  <td>{data.paid_amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    <br />
      <h3 style={{ fontWeight: "bold" }}>Channel</h3>

      <div style={{ marginTop: "1rem" }}>
        <table className="table border" style={{ textAlign: "center" }}>
          <thead
            className="thead-dark"
            style={{ backgroundColor: "#213555", color: "white" }}
          >
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Active</th>
              <th scope="col">Create Date</th>
              <th scope="col">Update Date</th>
            </tr>
          </thead>
          <tbody className="bg-white" style={{ textAlign: "center" }}>
            {memberChannel.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    {data.active === true ? (
                      <span>true</span>
                    ) : (
                      <span>false</span>
                    )}
                  </td>
                  <td>{data.created_date}</td>
                  <td>{data.updated_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardMember;
