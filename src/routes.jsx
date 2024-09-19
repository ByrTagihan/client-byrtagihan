import React from "react";
// import Login from './pages/Login'
// import Register from './pages/Register'
import ResetPassword from "./views/pages/reset/ForgotPasswor";
// import DashboardNew from "./views/dashboard/DashboardNew";

//================================================
//User Role
const DashboardUser = React.lazy(() =>
  import("./views/dashboard/DashboardUser")
);
const KotakMasuk = React.lazy(() => import("./views/pages/user/KotakMasuk"));
const DashboardNew = React.lazy(() => import("./views/dashboard/DashboardNew"));
const UserProfile = React.lazy(() => import("./views/pages/user/UserProfile"));
const DigitalCard = React.lazy(() =>
  import("./views/pages/user/newfeature/DigitalCard")
);

//Organization Section
const Organization = React.lazy(() =>
  import("./views/pages/user/organization/Organization")
);
const EditOrganization = React.lazy(() =>
  import("./views/pages/user/organization/EditOrganization")
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
const TambahCustomer = React.lazy(() =>
  import("./views/pages/user/customer/TambahCostumer")
);
const TambahUserMember = React.lazy(() =>
  import("./views/pages/user/member/TambahMember")
);
const EditCustomer = React.lazy(() =>
  import("./views/pages/user/customer/EditCustomer")
);
const EditTransaction = React.lazy(() =>
  import("./views/pages/user/transaction/EditTransaction")
);

//Customer Section
const UserCustomer = React.lazy(() =>
  import("./views/pages/user/customer/Customer")
);
const TambahCostumer = React.lazy(() =>
  import("./views/pages/user/customer/TambahCostumer")
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
const TambahMember = React.lazy(() =>
  import("./views/pages/user/member/TambahMember")
);
const EditUserMember = React.lazy(() =>
  import("./views/pages/user/member/EditMember")
);

//Template Section
const UserTemplate = React.lazy(() =>
  import("./views/pages/user/template/Template")
);
const TambahTemplate = React.lazy(() =>
  import("./views/pages/user/template/TambahTemplate")
);
const EditTemplate = React.lazy(() =>
  import("./views/pages/user/template/EditTemplate")
);

//================================================
//Customer Role
const DashboardCustomer = React.lazy(() =>
  import("./views/dashboard/DashboardCoba2")
);
const Profile = React.lazy(() => import("./views/pages/costumer/Profile"));
const GantiPasswordCustomer = React.lazy(() =>
  import("./views/pages/costumer/GantiPasswordCustomer")
);
const AddListDataSiswa = React.lazy(() =>
  import("./views/pages/costumer/member/AddListDataSiswa")
);
const AddListTagihanByMember = React.lazy(() =>
  import("./views/pages/costumer/member/bill/AddTagihanByMember")
);
const EditTagihanByMember = React.lazy(() =>
  import("./views/pages/costumer/member/bill/EditTaagihanByMember")
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
  import("./views/pages/costumer/member/EditListDataSiswa")
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
const MemberVerification = React.lazy(() =>
  import("./views/pages/member/VerificationCode")
);

//Bill Section
const ListTagihanMember = React.lazy(() =>
  import("./views/pages/member/bill/ListTagihan")
);
const BayarTagihan = React.lazy(() =>
  import("./views/pages/member/bill/BayarTagihan")
);
const BayarSemuaTagihan = React.lazy(() =>
  import("./views/pages/member/BayarSemuaTagihan")
);

//Member Role
const MemberChannel = React.lazy(() =>
  import("./views/pages/member/channel/MemberChannel")
);

const routes = [
  { path: "/home", exact: true, name: "Home" },
  { path: "/reset", name: "Reset", element: ResetPassword },
  {
    path: "/gantiPassMember",
    name: "GantiPasswordMember",
    element: GantiPassMember,
  },
  //================================================================
  //User
  { path: "/dashboardUser", name: "Dashboard User", element: DashboardUser },
  //User
  { path: "/userProfile", name: "Profile", element: UserProfile },
  { path: "/dashboardNew", name: "Dashboard New", element: DashboardNew },
  {
    path: "/tableOrganization",
    name: "Organization",
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
    element: EditOrganization,
  },
  { path: "/payment", name: "Payment", element: CrudPayment },
  { path: "/transaction", name: "Transaction", element: CrudTransaction },
  {
    path: "/tambahTransaction",
    name: "Tambah Tagihan",
    element: TambahTransaction,
  },
  {
    path: "/tambahCustomer",
    name: "Tambah Customer",
    element: TambahCustomer,
  },
  {
    path: "/tambahMember",
    name: "Tambah Member",
    element: TambahUserMember,
  },
  {
    path: "/editCustomer/:id",
    name: "Edit Customer",
    element: EditCustomer,
  },
  {
    path: "/tambahTemplate",
    name: "Tambah Template",
    element: TambahTemplate,
  },
  {
    path: "/editTransaction/:id",
    name: "Edit Transaction",
    element: EditTransaction,
  },
  {
    path: "/editTemplate/:id",
    name: "Edit Template",
    element: EditTemplate,
  },
  { path: "/userCustomer", name: "Customer", element: UserCustomer },
  {
    path: "/editUserCustomer/:id",
    name: "Edit Data Customer",
    element: EditUserCustomer,
  },
  { path: "/userChannel", name: "Channel", element: userChannel },
  { path: "/mesage", name: "Message", element: UserMessage },
  { path: "/userMember", name: "Data Siswa", element: userMember },
  {
    path: "/editUserMember/:id",
    name: "Edit Data Siswa",
    element: EditUserMember,
  },
  { path: "/UserTemplate", name: "Template", element: UserTemplate },
  //================================================================
  //Customer
  {
    path: "/addListDataSiswa",
    name: "Tambah Data Siswa",
    element: AddListDataSiswa,
  },
  {
    path: "/addListTagihanByMember/:id",
    name: "Tambah Tagihan Siswa",
    element: AddListTagihanByMember,
  },
  {
    path: "/editTagihanByMember/:id",
    name: "Edit Tagihan Siswa",
    element: EditTagihanByMember,
  },
  {
    path: "/dashboardd",
    name: "Dashboard Customer",
    element: DashboardCustomer,
  },
  { path: "/customerProfile", name: "Profile", element: Profile },
  {
    path: "/gantiPasswordCustomer",
    name: "Ganti Password Customer",
    element: GantiPasswordCustomer,
  },
  {
    path: "/customerOrganization",
    name: "Organization",
    element: CustomerOrganization,
  },
  { path: "/customerMember", name: "Data Siswa", element: LIstDataSIswa },
  {
    path: "/Editlistdatasiswa/:id",
    name: "Edit Data Siswa",
    element: EditListSiswa,
  },
  {
    path: "/lihattagihanmember/:id",
    name: "Data Tagihan Siswa",
    element: LihatTagihanMember,
  },
  {
    path: "/tambahTagihanMember",
    name: "Tambah Tagihan Member",
    element: TambahTagihanMember,
  },
  { path: "/customerBill", name: "Tagihan", element: ListTagihan },
  { path: "/addtagihan", name: "Tambah Tagihan", element: AddTagihan },
  { path: "/edittagihan/:id", name: "Edit Tagihan", element: EditTagihan },
  //================================================================
  //Member
  { path: "/notifikasi", name: "Kotak Masuk", element: KotakMasuk },
  {
    path: "/dashboardMember",
    name: "Dashboard Member",
    element: DashboardMember,
  },
  { path: "/memberProfile", name: "Profile", element: MemberProfile },
  {
    path: "/listTagihanMember",
    name: "List Tagihan",
    element: ListTagihanMember,
  },
  { path: "/bayarTagihan/:id", name: "Bayar Tagihan", element: BayarTagihan },
  {
    path: "/bayarSemuaTagihan",
    name: "Bayar Tagihan",
    element: BayarSemuaTagihan,
  },
  { path: "/memberChannel", name: "Channel", element: MemberChannel },
  { path: "/digitalCard", name: "Digital card", element: DigitalCard },
  {
    path: "/memberVerification",
    name: "Verification Code",
    element: MemberVerification,
  },

];

export default routes;
