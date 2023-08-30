
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/baseURL";
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CRow,
  CWidgetStatsA,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilArrowBottom,
  cilArrowCircleBottom,
  cilArrowThickTop,
  cilArrowTop,
  cilOptions,
  cilPencil,
  cilPlus,
  cilTrash,
} from "@coreui/icons";
import { CChart, CChartBar, CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import "../css/ListDataSiswa.css";
import "../../views/css/DashboardCusto.css";
import { Button } from "@coreui/coreui";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteData } from "../../utils/controller";
import Swal from "sweetalert2";

function DashboardCoba2() {
  const [rekapTransaction, setRekapTransaction] = useState([]);
  const [rekapBill, setRekapBill] = useState([]);
  const [rekapBill1, setRekapBill1] = useState([]);
  const [rekapTotal, setRekapTotal] = useState([]);
  const [rekapMember, setRekapMember] = useState([]);
  const [monthlyDataTransaction, setMonthlyDataTransaction] = useState([]);
  const [monthlyDataBill, setMonthlyDataBill] = useState([]);
  const [monthlyDataTotal, setMonthlyDataTotal] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [member, setMember] = useState("");
  const [bill, setBill] = useState("");
  const [transaction, setTransaction] = useState("");
  const [total, setTotal] = useState({
    member: "",
    transaction: "",
    bill: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  let navigate = useNavigate();
  const [sortDirection, setSortDirection] = useState('asc');
  const [visible, setVisible] = useState(false);
  const [paidId, setPaidId] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  // const [searchTermTransaction, setSearchTermTransaction] = useState("");
  // const [sortedListTransaction, setSortedListTransaction] = useState([]);
  // const [sortConfigTransaction, setSortConfigTransaction] = useState({
  //   key: null,
  //   direction: "ascending",
  // });

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

  const getAllTransaction = async () => {
    await axios
      .get(`${API_DUMMY}/customer/report/recap/transaction`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setRekapTransaction(res.data.data);

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

  const getAllBill = async () => {
    try {
      const response = await fetch(`${API_DUMMY}/customer/bill?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${searchTerm}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setRekapBill(data.data);
      setTotalPages(data.pagination.total_page);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const getAllBill1 = async () => {
    await axios(`${API_DUMMY}/customer/bill?limit=200`, {
      headers: {
        "auth-tgh": `jwt ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setRekapBill1(res.data.data);

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
        alert('Error fetching bills:', error);
      })
  };

  const bayarTagihan = async (e) => {
    e.preventDefault();
    const req = {
      paid_date: paidDate,
      paid_amount: paidAmount,
    };

    await axios
      .put(`${API_DUMMY}/customer/bill/${paidId}/paid`, req, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Membayar",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const unBayarTagihan = async (paidIds) => {
    Swal.fire({
      title: "Yakin ingin membatalkan pembayaran ?",
      text: "Data tidak dapat kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`${API_DUMMY}/customer/bill/${paidIds}/unpaid`, {}, {
              headers: {
                "auth-tgh": `jwt ${localStorage.getItem("token")}`,
              },
            })
          Swal.fire({
            icon: "success",
            title: "Berhasil Membatalkan Pembayaran",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortedBills = rekapBill.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
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

  // const getAllTotal = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/customer/report/total`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       const total = res.data.data;
  //       setTotal(total);
  //       setMember(total.member);
  //       setBill(total.bill);
  //       setTransaction(total.transaction);
  //       //console.log(total);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  useEffect(() => {
    getAllTransaction();
    getAllBill();
    getAllBill1();
    // getAllTotal(); 
  }, [currentPage, limit, searchTerm, sortBy, sortDirection]);

  return (
    <div>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {rekapTransaction.length} <span className="fs-6 fw-normal"></span>
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
                      data: monthlyDataTransaction, // Menggunakan state monthlyData yang telah diubah
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
                {rekapBill1.length} <span className="fs-6 fw-normal"></span>
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
                    icon={cilArrowBottom}
                    style={{ color: "white" }}
                    onClick={() => {
                      const table = document.getElementById("bill");
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
            color="danger"
            value={<>1</>}
            title="Total"
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
                      const table = document.getElementById("total");
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
                      data: monthlyDataTotal,
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
      <div>
        <div className="row ">
          <div className="col" xs={12}>
            <div className="col inputSearch1">
              <select className="form-select" value={limit} onChange={handleLimit}>
                <option value="1">Show 1 Entries</option>
                <option value="10">Show 10 Entries</option>
                <option value="100">Show 100 Entries</option>
              </select>
            </div>
            <div className="col inputSearch1">
              <input type="text" className="form-control float-end" placeholder="Filter" value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h4>List Tagihan</h4>
                  </div>
                  <div className="col">
                    <Link to="/addtagihan">
                      <button className="btn btn-primary float-end">
                        <CIcon icon={cilPlus} /> Tambah Tagihan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body table-container">
                <div className="row">
                  <div className="col inputSearch">
                    <select className="form-select" value={limit} onChange={handleLimit} style={{ width: "40%" }}>
                      <option value="1">Show 1 Entries</option>
                      <option value="10">Show 10 Entries</option>
                      <option value="100">Show 100 Entries</option>
                    </select>
                  </div>
                  <div className="col inputSearch">
                    <input type="text" className="form-control float-end" placeholder="Filter" value={searchTerm} onChange={handleSearch} style={{ width: "40%" }} />
                  </div>
                </div>
                <table className="table">
                  <thead className="text-center">
                    <tr>
                      <th scope="col" onClick={() => handleSort('id')}>Id {sortBy === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('member_name')}>Nama Murid {sortBy === 'member_name' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('description')}>Description {sortBy === 'description' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('periode')}>Period {sortBy === 'periode' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('amount')}>Nominal {sortBy === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('paid_id')}>Status {sortBy === 'paid_id' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('paid_date')}>Tgl Bayar {sortBy === 'paid_date' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" onClick={() => handleSort('paid_amount')}>Nominal Bayar {sortBy === 'paid_amount' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                      <th scope="col" style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {sortedBills.map((data) => (
                      <tr key={data.id}>
                        <th scope="row">{data.id}</th>
                        <td data-cell="Nama Murid">{data.member_name}</td>
                        <td data-cell="Description">{data.description}</td>
                        <td data-cell="Periode">{data.periode}</td>
                        <td data-cell="Nominal">{data.amount}</td>
                        <td data-cell="Status">
                          {data.paid_id != 0 ? (
                            <span>Sudah Bayar</span>
                          ) : (
                            <span>Belum Bayar</span>
                          )}
                        </td>
                        <td data-cell="Tngl Bayar">{data.paid_date}</td>
                        <td data-cell="Nominal Bayar">{data.paid_amount}</td>
                        <td className="tdd" data-cell="Action">
                          <button
                            type="button"
                            className="edit1"
                            onClick={() => navigate(`/edittagihan/${data.id}`)}
                          >
                            <CIcon icon={cilPencil} />
                          </button>
                          <button
                            type="button"
                            className="edit1"
                            style={{ background: "red", color: "white" }}
                            onClick={() =>
                              deleteData(data.id, "customer/bill", setRekapBill)
                            }
                          >
                            <CIcon icon={cilTrash} style={{ color: "white" }} />
                          </button>
                          {data.paid_id != 0 ? (
                            <button
                              type="button"
                              className="edit1"
                              onClick={() => {
                                unBayarTagihan(data.id);
                              }}
                              style={{ background: "red", color: "white" }}
                            >
                              Btl Bayar
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="edit1"
                              onClick={() => {
                                setVisible(!visible);
                                setPaidId(data.id);
                                setPaidAmount(data.amount);
                              }}
                              style={{ background: "green", color: "white" }}
                            >
                              Bayar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <ul className="pagination float-end">
                <li className={"page-item " + (currentPage === 1 ? 'disabled' : '')} disabled={currentPage === 1} >
                  <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                </li>
                {renderPageNumbers()}
                <li className={"page-item " + (currentPage === totalPages ? 'disabled' : '')} disabled={currentPage === totalPages} >
                  <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                </li>
              </ul>
            </div>
            <CModal visible={visible} onClose={() => setVisible(false)}>
              <form onSubmit={bayarTagihan}>
                <div className="modal-header" onClose={() => setVisible(false)}>
                  <h5 className="modal-title">Bayar Tagihan</h5>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tanggal Bayar</label>
                    <input
                      id="paid_date"
                      type="date"
                      className="form-control"
                      onChange={(e) => setPaidDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nominal</label>
                    <input
                      id="paid_amount"
                      type="number"
                      className="form-control"
                      value={paidAmount}
                      disabled
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Bayar
                  </button>
                </div>
              </form>
            </CModal>
          </div>
        </div>
      </div>
      {/* <div className="row" id='total'>
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
                <tr>
                <th scope="col">Member</th>
                <th scope="col">Bill</th>
                <th scope="col">Transaction</th>
                </tr>
              </thead>
              <tbody>
                    <tr>
                      <td data-cell="Member">{total.member}</td>
                      <td data-cell="Bill">{total.bill}</td>
                      <td data-cell="Transaction">{total.transaction}</td>
                    </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> */}
      <button
        className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
        onClick={scrollToTop}
      >
        <CIcon className="iconn" icon={cilArrowThickTop} />
      </button>
    </div>
  );
}

export default DashboardCoba2;