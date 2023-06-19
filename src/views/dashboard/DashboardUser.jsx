import { cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../views/css/DashboardUser.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function DashboardUser() {
    const [organization, setOrganization] = useState([]);
    const [payment, setPayment] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [channel, setChannel] = useState([]);
    
  const getAllOrganization = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/user/organization`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setOrganization(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllPayment = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/user/payment`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setPayment(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllTransaction = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/user/transaction`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setTransaction(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllCustomer = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/user/customer`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setCustomer(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllChannel = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/user/customer`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setChannel(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAllOrganization(0);
    getAllPayment(0);
    getAllTransaction(0);
    getAllCustomer(0);
    getAllChannel(0);
  }, []);
  return (
    <>
      <div className="bok">
        <div className="bok1"
        >
          <div className="bok3"
          >
            <p>
              Organization
            </p>
            <FontAwesomeIcon
              icon="fa-solid fa-sitemap"
            />
          </div>
          <div className="jumlah"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
            />
            <p>{organization.length}</p>
          </div>
        </div>
        <div className="bok1"
        >
          <div className="bok3"
          >
            <p>Payment</p>
            <FontAwesomeIcon
              icon="fa-solid fa-dollar-sign"
            />
          </div>
          <div className="jumlah"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
            />
            <p>{payment.length}</p>
          </div>
        </div>
        <div className="bok1"
        >
          <div className="bok3"
          >
            <p>Transaction</p>
            <i
              className="fas fa-money-check-alt"
            ></i>
          </div>
          <div className="jumlah"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
            />
            <p>{transaction.length}</p>
          </div>
        </div>
      </div>
      <div className="bok2"
      >
        <div className="bok1"
        >
          <div className="bok3"
          >
            <p>Customer</p>
            <i
              className="far fa-user"
            ></i>
          </div>
          <div className="jumlah"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
            />
            <p>{customer.length}</p>
          </div>
        </div>
        <div className="bok1"
        >
          <div className="bok3"
          >
            <p>Channel</p>
            <i
              className="fas fa-money-check"
            ></i>
          </div>
          <div className="jumlah"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
            />
            <p>{channel.length}</p>
          </div>
        </div>
      </div>

      <div
        style={{
            marginTop:"20px",
          border: "1px solid gray",
          color: "white",
          background: "#213555",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#213555",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px"
          }}
        >
          <p className="listTagihan">Organization</p>
          <table className="table table1 border responsive-3">
            <thead className="thead-dark" style={{ color: "black" }}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Email</th>
                <th scope="col">Provinsi</th>
                <th scope="col">Balance</th>
                <th scope="col">Bank Account Number</th>
                <th scope="col">Bank Account Name</th>
                <th scope="col">Nama Bank</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
                {organization.map((data, index) => {
                    return (
              <tr key={index}>
                <td data-cell="Id">{index + 1}</td>
                <td data-cell="Name">{data.name}</td>
                <td data-cell="Email">{data.email}</td>
                <td data-cell="Provinsi">{data.provinsi}</td>
                <td data-cell="Provinsi">{data.balance}</td>
                <td data-cell="Create Date">{data.bank_account_number}</td>
                <td data-cell="Update Date">{data.bank_account_name}</td>
                <td data-cell="Update Date">{data.bank_name}</td>
              </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
            marginTop:"20px",
          border: "1px solid gray",
          color: "white",
          background: "#213555",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#213555",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px"
          }}
        >
          <p className="listTagihan">Payment</p>
          <table className="table table1 border responsive-3">
            <thead className="thead-dark" style={{ color: "black" }}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Name</th>
                <th scope="col">Periode</th>
                <th scope="col">Amount</th>
                {/* <th scope="col">Create date</th>
                <th scope="col">Update date</th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
                {payment.map((data, index) => {
                    return (
              <tr key={index}>
                <td data-cell="Id">{index + 1}</td>
                <td data-cell="Deskripsi">{data.description}</td>
                <td data-cell="Nama">{data.organization_name}</td>
                <td data-cell="Periode">{data.periode}</td>
                <td data-cell="Amount">{data.amount}</td>
                {/* <td data-cell="Create Date">{data.created_date}</td>
                <td data-cell="Update date">{data.updated_date}</td> */}
              </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
            marginTop:"20px",
          border: "1px solid gray",
          color: "white",
          background: "#213555",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#213555",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px"
          }}
        >
          <p className="listTagihan">Transaction</p>
          <table className="table table1 border responsive-3">
            <thead className="thead-dark" style={{ color: "black" }}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                {/* <th scope="col">Create date</th>
                <th scope="col">Update date</th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
                {transaction.map((data, index) => {
                    return (
              <tr key={index}>
                <td data-cell="Id">{index + 1}</td>
                <td data-cell="Deskripsi">{data.description}</td>
                <td data-cell="Nama">{data.organization_name}</td>
                <td data-cell="Amount">{data.amount}</td>
                {/* <td data-cell="Create date">{data.created_date}</td>
                <td data-cell="Update date">{data.updated_date}</td> */}
              </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>

      
      <div
        style={{
            marginTop:"20px",
          border: "1px solid gray",
          color: "white",
          background: "#213555",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#213555",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px"
          }}
        >
          <p className="listTagihan">Customer</p>
          <table className="table table1 border responsive-3">
            <thead className="thead-dark" style={{ color: "black" }}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Email</th>
                <th scope="col">Last login</th>
                <th scope="col">No Hp</th>
                {/* <th scope="col">Create date</th>
                <th scope="col">Update date</th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
                {customer.map((data, index) => {
                    return (
              <tr key={index}>
                <td data-cell="Id">{index + 1}</td>
                <td data-cell="Nama">{data.name}</td>
                <td data-cell="Nama">{data.email}</td>
                <td data-cell="Last Login">{data.last_login}</td>
                <td data-cell="Last Login">{data.hp}</td>
                {/* <td data-cell="Created date">{data.created_date}</td>
                <td data-cell="Update date">{data.updated_date}</td> */}
              </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
;
export default DashboardUser;
