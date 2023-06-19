import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DashboardMember() {
  const [list, setList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const param = useParams();
  const [show, setShow] = useState(false);

  const getAll = async () => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/member/bill`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setList(res.data.data);
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
      {/* <h3>Dashboard Member</h3> */}

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
            Jumlah Member All
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
            {memberList.length}
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
            Tagihan Siswa
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
            Jumlah Member
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
            15
          </p>
        </div>
      </div>

      <h3 style={{fontWeight: "bold"}}>Tagihan</h3>

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
              <th scope="col">Paid Id</th>
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
                  <td>{data.paid_id}</td>
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
