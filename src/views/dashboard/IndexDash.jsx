import React from "react";
import DashboardNew from "./DashboardNew";
import DashboardCoba2 from "./DashboardCoba2";

function IndexDash() {
  return (
    <div>
      {localStorage.getItem("type_token") == "member" ? (
        <>
          <DashboardNew />
        </>
      ) : localStorage.getItem("type_token") == "customer" ? (
        <>
          <DashboardCoba2 />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexDash;
