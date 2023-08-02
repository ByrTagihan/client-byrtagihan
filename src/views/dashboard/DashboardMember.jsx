import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/DashboardMember.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CButton,
  CFormCheck,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilOptions } from "@coreui/icons";
import { API_DUMMY } from "../../utils/baseURL";
`import Swal from "sweetalert2";

function DashboardMember() {
  const [list, setList] = useState([]);
  const [recapBill, setRecapBill] = useState([]);
  const [recapTransaction, setRecapTransaction] = useState([]);
  const [memberChannel, setmemberChannel] = useState([]);
  const [role, setRole] = useState("");
  const param = useParams();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");

  const [dataBulanan, setdataBulanan] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [dataChannel, setdataChannel] = useState([]);
  const [totalChannel, setTotalChannel] = useState([]);
  const [dataRecapBill, setDataRecapBill] = useState([]);
  const [totalRecapBill, setTotalRecapBill] = useState([]);
  const [dataRecapTransaction, setDataRecapTransaction] = useState([]);
  const [totalRecapTransaction, setTotalRecapTransaction] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState("100");
  // const [limitChannel, setLimitChannel] = useState("100");
  // const [limitRecapBill, setLimitRecapBill] = useState("100");
  // const [limitRecapTransaction, setLimitRecapTransaction] = useState("100");

  const getAll = async () => {
    if (role === "member") {
    await axios
      .get(`${API_DUMMY}/member/bill?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setList(res.data.data);
          setAmount(res.data.data.amount);

          // Menghitung jumlah data bulanan
          const dataBulanan = new Array(12).fill(0);
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            dataBulanan[createdMonth]++;
          });
          setdataBulanan(dataBulanan);
          const combinedData = [...res.data.data];
          setCombinedData(combinedData);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
    } else {
      Swal.fire(
        'Peringatan',
        'Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai siswa',
        'error'      
      ).then((result) => {
          //Untuk munuju page selanjutnya
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          localStorage.clear();
      });
    }
  };

  const getRecapBill = async () => {
    await axios
      .get(`${API_DUMMY}/member/report/recap/bill?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setRecapBill(res.data.data);

          // Menghitung jumlah data bulanan
          const dataRecapBill = new Array(12).fill(0);
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            dataRecapBill[createdMonth]++;
          });
          setDataRecapBill(dataRecapBill);
          const totalRecapBill = [...res.data.data];
          setTotalRecapBill(totalRecapBill);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getRecapTransaction = async () => {
    await axios
      .get(`${API_DUMMY}/member/report/recap/transaction?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setRecapTransaction(res.data.data);

          // Menghitung jumlah data bulanan
          const dataRecapTransaction = new Array(12).fill(0);
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            dataRecapTransaction[createdMonth]++;
          });
          setDataRecapTransaction(dataRecapTransaction);
          const totalRecapTransaction = [...res.data.data];
          setTotalRecapTransaction(totalRecapTransaction);
        }
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getMemberchannel = async () => {
    await axios
      .get(`${API_DUMMY}/member/channel?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setmemberChannel(res.data.data);

          // Menghitung jumlah data bulanan
          const dataChannel = new Array(12).fill(0);
          res.data.data.forEach((item) => {
            const createdMonth = new Date(item.created_date).getMonth();
            dataChannel[createdMonth]++;
          });
          setdataChannel(dataChannel);
          const totalChannel = [...res.data.data];
          setTotalChannel(totalChannel);
        }
      })
      .catch((error) => {
        // alert("Terjadi Kesalahan" + error);
      });
  };

  const handleLimitChannel = (event) => {
    setLimitChannel(event.target.value);
  };

  useEffect(() => {
    getAll(0);
    getMemberchannel(0);
    getRecapBill(0);
    getRecapTransaction(0);
    const userRoleFromServer = "member"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  const [bill, setBill] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [limit, setLimit] = useState("10");
  const navigate = useNavigate();

  // Function get
  const get = async () => {
    await axios
      .get(
        `${API_DUMMY}/member/bill?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&search=${searchTerm}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        setBill(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    get(0);
  }, [currentPage, limit, searchTerm]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBills([]);
    } else {
      setSelectedBills(bill);
    }
    setSelectAll(!selectAll);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBills = bill.filter((bill) =>
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBills = filteredBills.sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedPages = [];
  
    if (totalPages <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        displayedPages.push(...pageNumbers.slice(0, 5), 'dot', ...pageNumbers.slice(totalPages - 1));
      } else if (currentPage >= totalPages - 2) {
        displayedPages.push(...pageNumbers.slice(0, 1), 'dot', ...pageNumbers.slice(totalPages - 5));
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          'dot',
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          'dot',
          ...pageNumbers.slice(totalPages - 1)
        );
      }
    }
  
    return displayedPages.map((page, index) =>
      page === 'dot' ? (
        <span key={`dot${index}`}>...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item" + (currentPage === page ? ' active' : '')}
        >
          <a className="page-link">{page}</a>
        </li>
      )
    );
  };

  return (
    <div>
      {localStorage.getItem("type_token") === "member" ? (
        <>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {list.length} <span className="fs-6 fw-normal"></span>
              </>
            }
            title="Member"
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
                  ],
                  datasets: [
                    {
                      label: "Member",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-primary"),
                      data: dataBulanan, // Menggunakan state monthlyData yang telah diubah
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
            value={<> {memberChannel.length} </>}
            title="Channel"
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
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-info"),
                      data: dataChannel,
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
            value={<>{recapBill.length} </>}
            title="Recap Bill"
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
                  />
                </CDropdownToggle>
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
                  ],
                  datasets: [
                    {
                      label: "amount of data ",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: dataRecapBill,
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
            value={<>{recapTransaction.length}</>}
            title="Rekap Transaction"
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
                      label: "amount of data",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: dataRecapTransaction,
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
          marginTop: "1em",
          marginBottom: "1rem",
        }}
      ></div>

      {bill.length === 0 ? (
        <div className="text-center">
          <img
            src="https://www.pawoon.com/wp-content/uploads/2022/06/checklist-1.png"
            style={{ width: "6.75rem", height: "6.125rem" }}
          />
          <p>Tidak ada tagihan untuk saat ini</p>
          <CButton to="/home">silahkan kembali ke beranda</CButton>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            <h3 style={{ fontWeight: "bold" }}>Bill</h3>
          </div>
          <CCard className="mb-5">
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      {/* <CFormCheck
                        id="flexCheckDefault"
                        onChange={handleSelectAll}
                        checked={selectAll}
                      /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Periode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Tanggal dibayar
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Nominal dibayar
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bill.map((bil, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"></CTableHeaderCell>
                        <CTableHeaderCell data-cell="No">
                          {index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell data-cell="Keterangan">
                          {bil.description}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Periode">
                          {bil.periode}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Nominal">
                          {bil.amount}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Status">
                          {bil.paid_id === 0 ? (
                            <span>belum terbayar</span>
                          ) : bil.paid_id === 1 ? (
                            <span>terbayar manual</span>
                          ) : (
                            <span>terbayar oleh sistem</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Tanggal Dibayar">
                          {bil.paid_date}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Nominal Dibayar">
                          {bil.paid_amount}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Action">
                          <CButton
                            onClick={() => navigate(`/bayarTagihan/${bil.id}`)}
                          >
                            Bayar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
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
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody className="d-flex justify-content-between">
              <CFormCheck
                id="flexCheckDefault"
                onChange={handleSelectAll}
                checked={selectAll}
                label="Pilih semua"
              />
              <p>
                Total Pembayaran: Rp.
                {selectedBills.reduce((total, bil) => total + bil.amount, 0)}
              </p>
              <CButton onClick={() => navigate(`/bayarSemuaTagihan`)}>
                Bayar Semua
              </CButton>
            </CCardBody>
          </CCard>
        </div>
      )}
    </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )}</div>
  );
}

export default DashboardMember;