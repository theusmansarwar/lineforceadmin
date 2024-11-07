import React from "react";
import { useTable } from "../../Templates/useTable";

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "city", numeric: false, disablePadding: false, label: "City" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Account Created",
  },
];
const title = "Users";

const Users = () => {
  const { tableUI } = useTable({ headCells, title });

  return <div>{tableUI}</div>;
};

export default Users;
