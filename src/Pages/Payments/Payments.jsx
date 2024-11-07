import React from "react";
import { useTable } from "../../Templates/useTable";


const headCells = [
  { id: "user.name", numeric: false, disablePadding: true, label: "Name" },
  { id: "user.email", numeric: false, disablePadding: false, label: "Email" },
  { id: "user.phone", numeric: false, disablePadding: false, label: "Phone" },
  {
    id: "course.title",
    numeric: false,
    disablePadding: false,
    label: "Course Name",
  },
  { id: "price", numeric: false, disablePadding: false, label: "Price" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },

  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Payment Date",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];
const title = "Payments";

const Payments = () => {
  const { tableUI } = useTable({ headCells, title });

  return <div>{tableUI}</div>;
};

export default Payments;
