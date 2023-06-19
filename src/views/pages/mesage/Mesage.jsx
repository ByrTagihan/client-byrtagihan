import React, { useEffect, useState } from 'react'
import "../../../views/css/ListDataSiswa.css"
import { CButton } from '@coreui/react'
import axios from 'axios';
import Swal from 'sweetalert2';

function Mesage() {
    const[message, setMessage] = useState([]);

    const getAll = async () => {
        await axios
          .get(`https://api.byrtagihan.com/api/user/message`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            // setPages(res.data.data.total_page);
            setMessage(res.data.data);
            // console.log(res.data.data);
          })
          .catch((error) => {
            alert("Terjadi Kesalahan" + error);
          });
      };
    
    useEffect(() => {
        getAll(0);
      }, []);
    
  return (
    <div
    style={{
      border: "1px solid gray",
      color: "white",
      background: "#526D82",
      borderRadius: "10px",
      marginBottom:"30px"
    }}>
    {/* <button
      type="button"
      style={{
        backgroundColor: "#213555",
        color: "white",
        float: "right",
        marginBottom: "20px",
      }}
      onClick={() => setShow(true)}
    >
      Add
    </button> */}
    <div
      style={{
        background: "#526D82",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
      }}>
      <p className="listTagihan">
        Message
      </p>
    </div>
<div className="table-container">
    <table className="table table1 border responsive-3">
      <thead
        className="thead-dark"
        style={{color: "black" }}>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Receiver</th>
          <th scope="col">Send As</th>
          <th scope="col">Message type id</th>
          <th scope="col">message status id</th>
          <th scope="col">message status name</th>
          <th scope="col">Created date</th>
          <th scope="col">Updated date</th>
        </tr>
      </thead>
      <tbody className="bg-white ">
        {message.map((data, index) => {
            return (
            <tr key={index}>
              <td data-cell="No">{index + 1}</td>
              <td data-cell="Receiver">{data.receiver}</td>
              <td data-cell="Send As">{data.send_as}</td>
              <td data-cell="Message type id">{data.message_type_id}</td>
              <td data-cell="Alamat">{data.message_status_id}</td>
              <td data-cell="Id">{data.message_status_name}</td>
              <td data-cell="Id">{data.created_date}</td>
              <td data-cell="Id">{data.updated_date}</td>
            </tr>
            )
        })}
      </tbody>
    </table>
    </div>
  </div>
  )
}

export default Mesage