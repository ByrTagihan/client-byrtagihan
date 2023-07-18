import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_DUMMY } from '../../../../utils/baseURL';

function Total() {
  const [rekapTotal, setRekapTotal] = useState([]);
  const [member, setMember] = useState("");
  const [bill, setBill] = useState("");
  const [transaction, setTransaction] = useState("");
  const [total, setTotal] = useState({
    member:"",
    transaction:"",
    bill:"",
  })

  const get = async () => {
    await axios
    .get(`${API_DUMMY}/customer/report/total`, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      const total = res.data.data;
      setTotal(total)
      setMember(total.member);
      setBill(total.bill);
      setTransaction(total.transaction);
      console.log(total);
    })
    .catch((error) => {
      alert("Terjadi Kesalahan" + error);
    });
  }

  useEffect(() => {
    get(0);
  }, []);

  return (
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
                      <td data-cell="Member">{total.member}</td>
                      <td data-cell="Bill">{total.bill}</td>
                      <td data-cell="Transaction">{total.transaction}</td>
                    </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Total