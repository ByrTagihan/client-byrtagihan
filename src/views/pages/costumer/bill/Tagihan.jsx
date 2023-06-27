import React, { useEffect, useState } from "react";
import { deleteData, getAllData } from "../../../../utils/controller";
import { Link, useNavigate } from "react-router-dom";
import { CModal } from "@coreui/react";
import axios from "axios";
import { API_DUMMY, API_URL } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function Tagihan() {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const [visible, setVisible] = useState(false);
  const [paidId, setPaidId] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, [currentPage, limit, searchTerm, sortBy, sortDirection]);

  const fetchBills = async () => {
    try {
      const response = await fetch(`${API_DUMMY}/customer/bill?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${searchTerm}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setBills(data.data);
      setTotalPages(data.pagination.total_page);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const fetchBills2 = async () => {
    try {
      const response = await fetch(
        `${API_URL}/customer/bill/?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${searchTerm}`, {
            headers: {
              "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwidHlwZV90b2tlbiI6IkN1c3RvbWVyIiwiYXVkIjoiQ3VzdG9tZXIiLCJzdWIiOiJpYm51bGplZnJ5OTlAZ21haWwuY29tIiwiZXhwIjoxNjg4MDIxNzIwfQ.ESKhjQdNzNhdC6aSMqrcQluOWikeHeG5zl7CJ1FysvPN1MMv_e8sdD4FaRT-LWb_4q3vt6g5g_UywjXAOk9ojA`,
            },
          }
      );
      const data = await response.json();
      setBills(data.data);
      setTotalPages(data.pagination.total_page);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
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

  const sortedBills = bills.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });


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
        console.log(error);
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
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={"page-item " + (currentPage === i  ? 'active' : '')}  aria-current="page" onClick={() => handlePageChange(i)}>
          <a class="page-link">{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

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

    return displayedPages.map((page) =>
      page === 'dot' ? (
        <span key="dot">...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item " + (currentPage === page  ? 'active' : '')}
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
            <div className="card-body">
            <div className="row">
                <div className="col">
                <select className="form-select" value={limit} onChange={handleLimit} style={{width: "40%"}}>
                  <option value="1">Show 1 Entries</option>
                  <option value="10">Show 10 Entries</option>
                  <option value="100">Show 100 Entries</option>
                </select>
                </div>
                <div className="col">
                <input type="text" class="form-control float-end" placeholder="Filter" value={searchTerm} onChange={handleSearch} style={{width: "40%"}}/>
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
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {sortedBills.map((data) => (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
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
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/edittagihan/${data.id}`)}
                        >
                          <CIcon icon={cilPencil} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() =>
                            deleteData(data.id, "customer/bill", setBills)
                          }
                        >
                          <CIcon icon={cilTrash} style={{color: "white"}}/>
                        </button>
                        {data.paid_id != 0 ? (
                          <button
                          type="button"
                          onClick={() => {
                            unBayarTagihan(data.id);
                          }}
                          className="btn btn-danger "
                        >
                          Batal Bayar
                        </button>
                        ) : (
                          <button
                          type="button"
                          onClick={() => {
                            setVisible(!visible);
                            setPaidId(data.id);
                            setPaidAmount(data.amount);
                          }}
                          className="btn btn-info " 
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
          <ul class="pagination float-end">
            <li className={"page-item " + (currentPage === 1 ? 'disabled' : '')} disabled={currentPage === 1} >
              <a class="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
            </li>
            {renderPageNumbers()}
            <li className={"page-item " + (currentPage === totalPages ? 'disabled' : '')} disabled={currentPage === totalPages} >
              <a class="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
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
  );
}

export default Tagihan;
