import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibCircle,
  cibMessenger,
  cibSuperuser,
  cilAccountLogout,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCreditCard,
  cilCursor,
  cilDescription,
  cilDollar,
  cilDrop,
  cilLibrary,
  cilMoney,
  cilNotes,
  cilPencil,
  cilPlaylistAdd,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilUserFemale,
  cilUserFollow,
  cilUserPlus,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard User",
    to: "/dashboardUser",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Dashboard Customer",
    to: "/dashboardd",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Dashboard Member",
    to: "/dashboardMember",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: ["member"],
  },

  {
    component: CNavTitle,
    name: "Menu",
  },
  //User Navigation
  {
    component: CNavItem,
    name: "Payment",
    to: "/payment",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Organization",
    to: "/tableOrganization",
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Transaction",
    to: "/transaction",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Customer",
    to: "/userCustomer",
    icon: <CIcon icon={cibSuperuser} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Channel",
    to: "/userChannel",
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Message",
    to: "/mesage",
    icon: <CIcon icon={cibMessenger} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Member",
    to: "/userMember",
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Template",
    to: "/UserTemplate",
    icon: <CIcon icon={cibCircle} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/userProfile",
    icon: <CIcon icon={cibSuperuser} customClassName="nav-icon" />,
    roles: ["user"],
  },
  //Customer Navigation
  {
    component: CNavItem,
    name: "Organization",
    to: "/customerOrganization",
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Member",
    to: "/customerMember",
    icon: <CIcon icon={cibSuperuser} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Bill",
    to: "/customerBill",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/customerProfile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  //Member Navigation
  {
    component: CNavItem,
    name: "Bill",
    to: "/listTagihanMember",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    roles: ["member"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/memberProfile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ["member"],
  },
];

export default _nav;
