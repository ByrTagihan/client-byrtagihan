import React from 'react'

function LihatTagihanByMember() {
  return (
    <div>
              <table class="table border" style={{ textAlign: "center" }}>
        <thead
          class="thead-dark"
          style={{ backgroundColor: "#213555", color: "white" }}
        >
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nisn</th>
            <th scope="col">Name</th>
            <th scope="col">hp</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white" style={{ textAlign: "center" }}>
          {list.map((data, index) => {
            return (
              <tr key={data.index}>
                <td>{index + 1}</td>
                <td>{data.unique_id}</td>
                <td>{data.name}</td>
                <td>{data.hp}</td>
                <td>{data.address}</td>
                <td style={{ display: "flex", gap: "5px", width: "100%" }}>
                  <button
                    type="button"
                    style={{ background: "none", marginLeft: "20%" }}
                    // onClick={() => {
                    //   setShow2(true);
                    //   getById(data.id);
                    // }}
                  >
                    <a href={"/#/Editlistdatasiswa/" + data.id}>
                      {" "}
                      <i class="fas fa-edit"></i>
                    </a>{" "}
                  </button>
                  <button
                    // onClick={() => deleteData(data.id)}
                    style={{ background: "none" }}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    // onClick={() => {
                    //   setShow1(true);
                    //   getById(data.id);
                    // }}
                    style={{ background: "none" }}
                  >
                    <i class="fas fa-unlock-alt"></i>
                  </button>
                  <button>
                   <a href=""> <i class="fas fa-money-bill"></i></a>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  )
}

export default LihatTagihanByMember