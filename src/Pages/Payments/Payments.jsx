import React from "react";
import { useTable } from "../../Templates/useTable";

const rows = [
  { id: 1, name: 'Cupcake', email: 'cupcake@example.com', city: 'New York', phone: '1234567890', coursename: 'JavaScript Basics', price: '$50', trxid: 'TRX123456', screenshot: 'screenshot1.png', created_at: '2024-01-01' },
  { id: 2, name: 'Donut', email: 'donut@example.com', city: 'Los Angeles', phone: '0987654321', coursename: 'React for Beginners', price: '$100', trxid: 'TRX123457', screenshot: 'screenshot2.png', created_at: '2024-01-02' },
  { id: 3, name: 'Muffin', email: 'muffin@example.com', city: 'Chicago', phone: '2345678901', coursename: 'Python Fundamentals', price: '$75', trxid: 'TRX123458', screenshot: 'screenshot3.png', created_at: '2024-01-03' },
  { id: 4, name: 'Brownie', email: 'brownie@example.com', city: 'Houston', phone: '3456789012', coursename: 'Data Science Basics', price: '$120', trxid: 'TRX123459', screenshot: 'screenshot4.png', created_at: '2024-01-04' },
  { id: 5, name: 'Eclair', email: 'eclair@example.com', city: 'Phoenix', phone: '4567890123', coursename: 'Web Development 101', price: '$200', trxid: 'TRX123460', screenshot: 'screenshot5.png', created_at: '2024-01-05' },
  { id: 6, name: 'Cheesecake', email: 'cheesecake@example.com', city: 'Philadelphia', phone: '5678901234', coursename: 'Full Stack Mastery', price: '$250', trxid: 'TRX123461', screenshot: 'screenshot6.png', created_at: '2024-01-06' },
  { id: 7, name: 'Macaron', email: 'macaron@example.com', city: 'San Antonio', phone: '6789012345', coursename: 'AWS Cloud Practitioner', price: '$300', trxid: 'TRX123462', screenshot: 'screenshot7.png', created_at: '2024-01-07' },
  { id: 8, name: 'Croissant', email: 'croissant@example.com', city: 'San Diego', phone: '7890123456', coursename: 'Cybersecurity Fundamentals', price: '$180', trxid: 'TRX123463', screenshot: 'screenshot8.png', created_at: '2024-01-08' },
  { id: 9, name: 'Bagel', email: 'bagel@example.com', city: 'Dallas', phone: '8901234567', coursename: 'UI/UX Design', price: '$220', trxid: 'TRX123464', screenshot: 'screenshot9.png', created_at: '2024-01-09' },
  { id: 10, name: 'Tart', email: 'tart@example.com', city: 'Austin', phone: '9012345678', coursename: 'Machine Learning', price: '$320', trxid: 'TRX123465', screenshot: 'screenshot10.png', created_at: '2024-01-10' },
  { id: 11, name: 'Scone', email: 'scone@example.com', city: 'San Jose', phone: '1123456789', coursename: 'Blockchain Basics', price: '$350', trxid: 'TRX123466', screenshot: 'screenshot11.png', created_at: '2024-01-11' },
  { id: 12, name: 'Pudding', email: 'pudding@example.com', city: 'Jacksonville', phone: '2234567890', coursename: 'Artificial Intelligence', price: '$400', trxid: 'TRX123467', screenshot: 'screenshot12.png', created_at: '2024-01-12' },
  { id: 13, name: 'Parfait', email: 'parfait@example.com', city: 'San Francisco', phone: '3345678901', coursename: 'Big Data Analysis', price: '$150', trxid: 'TRX123468', screenshot: 'screenshot13.png', created_at: '2024-01-13' },
  { id: 14, name: 'Churro', email: 'churro@example.com', city: 'Columbus', phone: '4456789012', coursename: 'IoT for Beginners', price: '$270', trxid: 'TRX123469', screenshot: 'screenshot14.png', created_at: '2024-01-14' },
  { id: 15, name: 'Fudge', email: 'fudge@example.com', city: 'Fort Worth', phone: '5567890123', coursename: 'Digital Marketing', price: '$130', trxid: 'TRX123470', screenshot: 'screenshot15.png', created_at: '2024-01-15' },
  { id: 16, name: 'Pie', email: 'pie@example.com', city: 'Charlotte', phone: '6678901234', coursename: 'SEO Mastery', price: '$170', trxid: 'TRX123471', screenshot: 'screenshot16.png', created_at: '2024-01-16' },
  { id: 17, name: 'Tiramisu', email: 'tiramisu@example.com', city: 'Indianapolis', phone: '7789012345', coursename: 'DevOps Essentials', price: '$240', trxid: 'TRX123472', screenshot: 'screenshot17.png', created_at: '2024-01-17' },
  { id: 18, name: 'Mousse', email: 'mousse@example.com', city: 'Seattle', phone: '8890123456', coursename: 'Kubernetes Crash Course', price: '$290', trxid: 'TRX123473', screenshot: 'screenshot18.png', created_at: '2024-01-18' },
  { id: 19, name: 'Pancake', email: 'pancake@example.com', city: 'Denver', phone: '9901234567', coursename: 'Serverless Architecture', price: '$330', trxid: 'TRX123474', screenshot: 'screenshot19.png', created_at: '2024-01-19' },
  { id: 20, name: 'Waffle', email: 'waffle@example.com', city: 'Washington', phone: '1012345678', coursename: 'Agile Methodologies', price: '$190', trxid: 'TRX123475', screenshot: 'screenshot20.png', created_at: '2024-01-20' },
  // Continue in the same format for the remaining 30 entries...
];


const headCells = [

  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'coursename', numeric: false, disablePadding: false, label: 'Course Name' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'trxid', numeric: false, disablePadding: false, label: 'TRX ID' },
  { id: 'screenshot', numeric: false, disablePadding: false, label: 'Screenshot' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Payment Date' },
];
const title='Payments'


const Payments = () => {
  const { tableUI } = useTable({ rows, headCells, title });

  return (
    <div>
      {tableUI}
    </div>
  );
};

export default Payments;
