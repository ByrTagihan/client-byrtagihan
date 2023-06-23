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
    to: "/userOrganization",
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

  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
];

export default _nav;
