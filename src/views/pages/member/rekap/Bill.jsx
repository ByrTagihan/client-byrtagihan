import React, { useEffect, useState } from 'react'
import { API_DUMMY } from '../../../../utils/baseURL';
import axios from 'axios';
import "../../../css/ListDataSiswa.css"

function Bill() {
    const [rekapBill, setRekapBill] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortedList, setSortedList] = useState([]);
    const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: "ascending",
    });

  const getAll = async () => {
    await axios
      .get(`${API_DUMMY}/member/report/recap/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setTotalPages(res.data.pagination.total_page);
        setRekapBill(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

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
    let sortedData = [...rekapBill];
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
  }, [sortConfig, searchTerm, rekapBill]);
  return (
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
                      <td data-cell="Periode">{data.periode}</td>
                      <td data-cell="Count Bill">{data.count_bill}</td>
                      <td data-cell="Total Bill">{data.total_bill}</td>
                      <td data-cell="Unpaid Bill">{data.unpaid_bill}</td>
                      <td data-cell="Paid Bill">{data.paid_bill}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bill