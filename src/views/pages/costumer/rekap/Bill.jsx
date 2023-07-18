import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_DUMMY } from '../../../../utils/baseURL';
import "../../../css/ListDataSiswa.css"

function Bill() {

    const [bill, setBill] = useState([]);
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
  )
}

export default Bill