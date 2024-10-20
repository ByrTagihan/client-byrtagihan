import React from "react";
import DashboardNew from "./DashboardNew";
import DashboardCoba2 from "./DashboardCoba2";
import Merchant from "../pages/merchant/Merchant";
import DashMerchant from "../pages/merchant/DashMerchant";
import DashboardUser from "./DashboardUser";

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
        <DashMerchant />
      ) : localStorage.getItem("type_token") === "user" ? (
        <DashboardUser />
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexDash;
