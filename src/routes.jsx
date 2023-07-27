
import React from "react";
// import Login from './pages/Login'
// import Register from './pages/Register'
import ResetPassword from "./views/pages/reset/ForgotPasswor";

//================================================
//User Role
const DashboardUser = React.lazy(() =>
  import("./views/dashboard/DashboardUser")
);
const UserProfile = React.lazy(() => import("./views/pages/user/UserProfile"));

//Organization Section
const Organization = React.lazy(() =>
  import("./views/pages/user/organization/Organization")
);
const UserOrganization = React.lazy(() =>
  import("./views/pages/user/organization/UserOrganization")
);

//Payment Section
const CrudPayment = React.lazy(() =>
  import("./views/pages/user/payment/CrudPayment")
);

//Transaction Section
const CrudTransaction = React.lazy(() =>
  import("./views/pages/user/transaction/CrudTransaction")
);
const TambahTransaction = React.lazy(() =>
  import("./views/pages/user/transaction/TambahTransaction")
);
const EditTransaction = React.lazy(() =>
  import("./views/pages/user/transaction/EditTransaction")
);

//Customer Section
const UserCustomer = React.lazy(() =>
  import("./views/pages/user/customer/Customer")
);
const EditUserCustomer = React.lazy(() =>
  import("./views/pages/user/customer/EditCustomer")
);

//Channel Section
const userChannel = React.lazy(() =>
  import("./views/pages/user/channel/Channel")
);

//Message Section
const UserMessage = React.lazy(() =>
  import("./views/pages/user/message/Mesage")
);

//Member Section
const userMember = React.lazy(() => import("./views/pages/user/member/Member"));
const EditUserMember = React.lazy(() => import("./views/pages/user/member/EditMember"));

//Template Section
const UserTemplate = React.lazy(() =>
  import("./views/pages/user/template/Template")
);

//================================================
//Customer Role
const Dashboard = React.lazy(() => import("./views/dashboard/DashboardTes"));
const DashboardCustomer = React.lazy(() => import("./views/dashboard/DashboardCoba2"));
const DashboardTes = React.lazy(() => import("./views/dashboard/DashboardTes"));
const Profile = React.lazy(() => import("./views/pages/costumer/Profile"));
const GantiPasswordCustomer = React.lazy(() =>
  import("./views/pages/costumer/GantiPasswordCustomer")
);
//Organization Section
const CustomerOrganization = React.lazy(() =>
  import("./views/pages/costumer/organization/CustomerOrganization")
);

//Member Section
const LIstDataSIswa = React.lazy(() =>
  import("./views/pages/costumer/member/LIstDataSIswa")
);
const EditListSiswa = React.lazy(() =>
  import("./views/pages/costumer/member/ListDataSiswaEdit")
);
const TambahOrganization = React.lazy(() =>
  import("./views/pages/user/organization/TambahOrganization")
);

//Member Bill Section
const LihatTagihanMember = React.lazy(() =>
  import("./views/pages/costumer/member/bill/LihatTagihanByMember")
);
const TambahTagihanMember = React.lazy(() =>
  import("./views/pages/costumer/member/bill/TambahTagihanMember")
);
const EditTagihanMember = React.lazy(() =>
  import("./views/pages/costumer/member/bill/EditTagihanMember")
);

//Bill Section
const ListTagihan = React.lazy(() =>
  import("./views/pages/costumer/bill/Tagihan")
);
const AddTagihan = React.lazy(() =>
  import("./views/pages/costumer/bill/AddTagihan")
);
const EditTagihan = React.lazy(() =>
  import("./views/pages/costumer/bill/EditTagihan")
);

//================================================
//Member Role
const DashboardMember = React.lazy(() =>
  import("./views/dashboard/DashboardMember")
);
const MemberProfile = React.lazy(() =>
  import("./views/pages/member/MemberProfile")
);
const GantiPassMember = React.lazy(() =>
  import("./views/pages/member/GantiPass")
);

//Bill Section
const ListTagihanMember = React.lazy(() =>
  import("./views/pages/member/bill/ListTagihan")
);
const BayarTagihan = React.lazy(() =>
  import("./views/pages/member/bill/BayarTagihan")
);
const BayarSemuaTagihan = React.lazy(() => import("./views/pages/member/BayarSemuaTagihan"));

//Member Role
const MemberChannel = React.lazy(() =>
  import("./views/pages/member/channel/MemberChannel")
);

const routes = [
  { path: "/home", exact: true, name: "Home" },
  { path: "/reset", name: "Reset", element: ResetPassword },
  { path: "/gantiPassMember", name: "GantiPasswordMember", element: GantiPassMember },
  //================================================================
  //User
  { path: "/dashboardUser", name: "Dashboard User", element: DashboardUser },
  //User
  { path: "/userProfile", name: "Dashboard User", element: UserProfile },
  {
    path: "/tableOrganization",
    name: "User Organization",
    element: Organization,
  },
  {
    path: "/tambahOrganization",
    name: "Tambah Organization",
    element: TambahOrganization,
  },
  {
    path: "/editOrganization/:id",
    name: "Edit Organization",
    element: UserOrganization,
  },
  { path: "/payment", name: "Payment", element: CrudPayment },
  { path: "/transaction", name: "Transaction", element: CrudTransaction },
  {
    path: "/tambahTransaction",
    name: "Tambah Tagihan",
    element: TambahTransaction,
  },
  {
    path: "/editTransaction/:id",
    name: "Edit Transaction",
    element: EditTransaction,
  },
  { path: "/userCustomer", name: "UserCustomer", element: UserCustomer },
  {
    path: "/editUserCustomer/:id",
    name: "Edit User Customer",
    element: EditUserCustomer,
  },
  { path: "/userChannel", name: "UserChannel", element: userChannel },
  { path: "/mesage", name: "UserMessage", element: UserMessage },
  { path: "/userMember", name: "UserMember", element: userMember },
  { path: "/editUserMember/:id", name: "Edit User Member", element: EditUserMember },
  { path: "/UserTemplate", name: "UserTemplate", element: UserTemplate },
  //================================================================
  //Customer
  { path: "/dashboardCustomer", name: "Dashboard", element: Dashboard },
  { path: "/dashboardd", name: "Dashboard Customer", element: DashboardCustomer },
  { path: "/customerProfile", name: "Profile", element: Profile },
  { path: "/dashboardTes", name: "Dashboard Tes", element: DashboardTes },
  {
    path: "/gantiPasswordCustomer",
    name: "Ganti Password Customer",
    element: GantiPasswordCustomer,
  },
  {
    path: "/customerOrganization",
    name: "Customer Organization",
    element: CustomerOrganization,
  },
  { path: "/customerMember", name: "ListDataSiswa", element: LIstDataSIswa },
  {
    path: "/Editlistdatasiswa/:id",
    name: "EditListDataSiswa",
    element: EditListSiswa,
  },
  {
    path: "/lihattagihanmember/:id",
    name: "dataTagihan",
    element: LihatTagihanMember,
  },
  {
    path: "/tambahTagihanMember",
    name: "TambahTagihanMember",
    element: TambahTagihanMember,
  },
  {
    path: "/editTagihanMember",
    name: "EditTagihanMember",
    element: EditTagihanMember,
  },
  { path: "/customerBill", name: "Tagihan", element: ListTagihan },
  { path: "/addtagihan", name: "Tambah Tagihan", element: AddTagihan },
  { path: "/edittagihan/:id", name: "Edit Tagihan", element: EditTagihan },
  //================================================================
  //Member
  {
    path: "/dashboardMember",
    name: "Dashboard Member",
    element: DashboardMember,
  },
  { path: "/memberProfile", name: "Channel", element: MemberProfile },
  {
    path: "/listTagihanMember",
    name: "List Tagihan",
    element: ListTagihanMember,
  },
  { path: "/bayarTagihan/:id", name: "Bayar Tagihan", element: BayarTagihan },
  { path: "/bayarSemuaTagihan", name: "Bayar Tagihan", element: BayarSemuaTagihan },
  { path: "/memberChannel", name: "Channel", element: MemberChannel }
];

export default routes;
