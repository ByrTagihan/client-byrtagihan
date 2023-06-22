import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DashboardMember() {
  const [list, setList] = useState([]);
  // const [paid_amount, setPaidAmount] = useState([]);
  // const [memberList, setMemberList] = useState([]);
  const param = useParams();
  const [show, setShow] = useState(false);

  const getAll = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/member/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setList(res.data.data);
        // setPaidAmount(res.data.data.paid_amount)
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  // const getMemberAll = async () => {
  //   await axios
  //     .get(`https://api.byrtagihan.com/api/customer/member`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setMemberList(res.data.data);
  //       console.log(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  useEffect(() => {
    getAll(0);
    // getMemberAll(0);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          marginTop: "2em",
          marginBottom: "2.5rem",
        }}
      >
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
            {/* {memberList.length} */} 0
          </p>
        </div>

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
        </div>

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
            {/* {paid_amount.paid_amount} */}
          </p>
        </div>
      </div>

      <h3 style={{ fontWeight: "bold" }}>List Tagihan</h3>

      <div style={{ marginTop: "2rem" }}>
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
    </div>
  );
}

export default DashboardMember;
