import React from "react";
import DashboardNew from "./DashboardNew";
import DashboardCoba2 from "./DashboardCoba2";
import Merchant from "../pages/merchant/Merchant";

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
      ) : localStorage.getItem("type_token") == "merchant" ? (
        <Merchant />
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexDash;
