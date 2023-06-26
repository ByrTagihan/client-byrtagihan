import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
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
    to: "/dashboard",
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
    name: "Organization",
    to: "/tableOrganization",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Payment",
    to: "/payment",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Transaction",
    to: "/transaction",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Customer",
    to: "/userCustomer",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Channel",
    to: "/userChannel",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Message",
    to: "/mesage",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Member",
    to: "/userMember",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Template",
    to: "/UserTemplate",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/userProfile",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["user"],
  },
  //Customer Navigation
  {
    component: CNavItem,
    name: "Organization",
    to: "/customerOrganization",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Member",
    to: "/customerMember",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Bill",
    to: "/customerBill",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/customerProfile",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["customer"],
  },
  //Member Navigation
  {
    component: CNavItem,
    name: "Bill",
    to: "/listTagihanMember",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["member"],
  },
  {
    component: CNavItem,
    name: "Channel",
    to: "/memberChannel",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["member"],
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/memberProfile",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    roles: ["member"],
  },
  {
    component: CNavTitle,
    name: "Menu User",
    roles: ["user", "customer"],
  },
  {
    component: CNavGroup,
    name: "User",
    to: "/User",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    roles: ["user", "customer"],
    items: [
      {
        component: CNavItem,
        name: "Customer",
        to: "/userCustomer",
      },
      {
        component: CNavItem,
        name: "Member",
        to: "/userMember",
      },
      {
        component: CNavItem,
        name: "Channel",
        to: "/userChannel",
      },
      {
        component: CNavItem,
        name: "Message",
        to: "/mesage",
      },
      {
        component: CNavItem,
        name: "Template",
        to: "/UserTemplate",
      },
      {
        component: CNavItem,
        name: "Transaction",
        to: "/transaction",
      },
      {
        component: CNavItem,
        name: "Payment",
        to: "/payment",
      },
    ],
  },
];

export default _nav;
