import React from "react";
// import Login from './pages/Login'
// import Register from './pages/Register'
import ResetPassword from "./views/pages/reset/ForgotPasswor";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const DashboardMember = React.lazy(() =>
  import("./views/dashboard/DashboardMember")
);
const LIstDataSIswa = React.lazy(() => import("./pages/LIstDataSIswa"));
const EditListSiswa = React.lazy(() => import("./edit/ListDataSiswaEdit"));
const GantiPasswordCustomer = React.lazy(() =>
  import("./views/pages/profile/GantiPasswordCustomer")
);
const TambahTagihanMember = React.lazy(() =>
  import("./views/pages/member/TambahTagihanMember")
);
const EditTagihanMember = React.lazy(() =>
  import("./views/pages/member/EditTagihanMember")
);
const CustomerOrganization = React.lazy(() =>
  import("./views/pages/costumer/CustomerOrganization")
);
const Sekolah = React.lazy(() => import("./views/pages/sekolah/Sekolah"));
const ListTagihan = React.lazy(() => import("./views/pages/tagihan/Tagihan"));
const AddTagihan = React.lazy(() => import("./views/pages/tagihan/AddTagihan"));

const EditTagihan = React.lazy(() =>
  import("./views/pages/tagihan/EditTagihan")
);
const TambahPayment = React.lazy(() =>
  import("./views/pages/user/TambahPayment")
);
const EditPayment = React.lazy(() => import("./views/pages/user/EditPayment"));
const CrudPayment = React.lazy(() => import("./views/pages/user/CrudPayment"));
const CrudTransaction = React.lazy(() => import("./views/pages/user/CrudTransaction"));
const TambahTransaction = React.lazy(() => import("./views/pages/user/TambahTransaction"));
const EditTransaction = React.lazy(() => import("./views/pages/user/EditTransaction"));
const Profile = React.lazy(() => import("./views/pages/profile/Profile"));

const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Tagihan = React.lazy(() => import("./pages/Tagihan"));
const LihatTagihanMember = React.lazy(() =>
  import("./pages/LihatTagihanByMember")
);

const routes = [
  { path: "/home", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/dashboardMember",
    name: "Dashboard Member",
    element: DashboardMember,
  },
  {
    path: "/gantiPasswordCustomer",
    name: "Ganti Password Customer",
    element: GantiPasswordCustomer,
  },
  { path: "/profile", name: "Profile", element: Profile },
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
  {
    path: "/gantiPasswordCustomer",
    name: "Ganti Password Customer",
    element: GantiPasswordCustomer,
  },
  {
    path: "/tambahTagihanMember",
    name: "Tambah Tagihan Member",
    element: TambahTagihanMember,
  },
  {
    path: "/editTagihanMember",
    name: "Edit Tagihan Member",
    element: EditTagihanMember,
  },
  {
    path: "/customerOrganization",
    name: "Customer Organization",
    element: CustomerOrganization,
  },
  { path: "/sekolah", name: "Sekolah", element: Sekolah },
  { path: "/tagihan", name: "Tagihan", element: ListTagihan },
  { path: "/addtagihan", name: "Tambah Tagihan", element: AddTagihan },
  { path: "/edittagihan/:id", name: "Edit Tagihan", element: EditTagihan },

  { path: "/payment", name: "Payment", element: CrudPayment },
  { path: "/tambahPayment", name: "Tambah Payment", element: TambahPayment },
  { path: "/editPayment/:id", name: "Edit Payment", element: EditPayment },
  { path: "/transaction", name: "Transaction", element: CrudTransaction },
  { path: "/tambahTransaction", name: "Tambah Tagihan", element: TambahTransaction },
  { path: "/editTransaction/:id", name: "Edit Transaction", element: EditTransaction },

  { path: "/forms/range", name: "Range", element: Range },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  { path: "/reset", name: "Reset", element: ResetPassword },
  { path: "/listdatasiswa", name: "ListDataSiswa", element: LIstDataSIswa },
  {
    path: "/Editlistdatasiswa/:id",
    name: "EditListDataSiswa",
    element: EditListSiswa,
  },
  { path: "/datatagihan/:id", name: "dataTagihan", element: Tagihan },
  {
    path: "/lihattagihanmember/:id",
    name: "dataTagihan",
    element: LihatTagihanMember,
  },
];

export default routes;
