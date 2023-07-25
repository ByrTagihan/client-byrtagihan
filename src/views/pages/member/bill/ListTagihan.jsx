import React, { useEffect, useState } from 'react';
import {
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
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { API_DUMMY } from '../../../../utils/baseURL';
import Swal from 'sweetalert2';

function ListTagihan() {
    const [bill, setBill] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedBills, setSelectedBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total_page, setTotal_Page] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState("10");
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortBy, setSortBy] = useState('id');
    const navigate = useNavigate();

    // Function get
    const get = async () => {
        await axios
            .get(
                `${API_DUMMY}/member/bill?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${searchTerm}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            )
            .then((res) => {
                setTotal_Page(res.data.pagination.total_page);
                setBill(res.data.data);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan" + error);
            });
    };

    const handleAlreadyPaid = () => {
        Swal.fire({
            title: 'Informasi',
            text: 'Tagihan sudah dibayar',
            icon: 'info',
        });
    };

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredBills = bill.filter((bill) =>
        bill.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBills = bill.sort((a, b) => {
        if (sortDirection === "asc") {
            return a[sortBy] - b[sortBy];
        } else {
            return b[sortBy] - a[sortBy];
        }
    });

    const handleLimit = (event) => {
        setLimit(event.target.value);
    };

    const handleSort = (column) => {
        if (column === sortBy) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = Array.from({ length: total_page }, (_, i) => i + 1);

        const getPageRange = (current, total, maxPageToShow) => {
            if (total <= maxPageToShow) {
                return pageNumbers;
            } else {
                const halfMaxPageToShow = Math.floor(maxPageToShow / 2);
                const minPage = Math.max(1, current - halfMaxPageToShow);
                const maxPage = Math.min(total, minPage + maxPageToShow - 1);
                const pages = [];

                if (minPage > 1) {
                    pages.push("dot");
                }

                for (let i = minPage; i <= maxPage; i++) {
                    pages.push(i);
                }

                if (maxPage < total) {
                    pages.push("dot");
                }

                return pages;
            }
        };

        const displayedPages = getPageRange(currentPage, total_page, 5);

        return (
            <ul className="pagination float-end">
                <li
                    className={"page-item " + (currentPage === 1 ? "disabled" : "")}
                    disabled={currentPage === 1}
                >
                    <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </a>
                </li>
                {displayedPages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "dot" ? (
                            <span key={index}>...</span>
                        ) : (
                            <li
                                onClick={() => handlePageChange(page)}
                                className={"page-item " + (currentPage === page ? "active" : "")}
                            >
                                <a className="page-link">{page}</a>
                            </li>
                        )}
                    </React.Fragment>
                ))}
                <li
                    className={
                        "page-item " + (currentPage === total_page ? "disabled" : "")
                    }
                    disabled={currentPage === total_page}
                >
                    <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </a>
                </li>
            </ul>
        );
    };


    useEffect(() => {
        get(0);
    }, [currentPage, limit, searchTerm, sortBy, sortDirection]);

    return (
        <div>
            {bill.length === 0 ? (
                <div className='text-center'>
                    <img src="https://www.pawoon.com/wp-content/uploads/2022/06/checklist-1.png" style={{ width: '6.75rem', height: '6.125rem' }} />
                    <p>Tidak ada tagihan untuk saat ini</p>
                    <CButton to="/home">silahkan kembali ke beranda</CButton>
                </div>
            ) : (
                <div>
                    <CCard className='mb-5'>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">
                                            <CFormCheck id="flexCheckDefault" onChange={handleSelectAll} checked={selectAll} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Periode</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Tanggal dibayar</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Nominal dibayar</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredBills.map((bil, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">
                                                </CTableHeaderCell>
                                                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{bil.description}</CTableDataCell>
                                                <CTableDataCell>{bil.periode}</CTableDataCell>
                                                <CTableDataCell>{bil.amount}</CTableDataCell>
                                                <CTableDataCell>{bil.payment_id}</CTableDataCell>
                                                <CTableDataCell>{bil.paid_date}</CTableDataCell>
                                                <CTableDataCell>{bil.paid_amount}</CTableDataCell>
                                                <CTableDataCell>
                                                    {bil.paid_date ? (
                                                        <CButton color='danger' onClick={handleAlreadyPaid}>Dibayar</CButton>
                                                    ) : (
                                                        <CButton onClick={() => navigate(`/bayarTagihan/${bil.id}`)}>Bayar</CButton>
                                                    )}
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                            {/* Pagination */}
                            {renderPageNumbers()}
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardBody className='d-flex justify-content-between'>
                            <CFormCheck id="flexCheckDefault" onChange={handleSelectAll} checked={selectAll} label="Pilih semua" />
                            <p>Total Pembayaran: Rp.{selectedBills.reduce((total, bil) => total + bil.amount, 0)}</p>
                            <CButton disabled={selectedBills.length === 0} onClick={() => navigate(`/bayarSemuaTagihan`)}>Bayar Semua</CButton>
                        </CCardBody>
                    </CCard>
                </div>
            )}
        </div>
    )
}

export default ListTagihan;
