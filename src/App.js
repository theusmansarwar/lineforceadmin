import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Payments from "./Pages/Payments/Payments";
import Courses from "./Pages/Courses/Courses";
import Users from "./Pages/Users/Users";
import CourseForm from "./Pages/Courses/CourseForm";
import CreateCourse from "./Pages/Courses/CreateCourse";
import Syllabus from "./Pages/Data/Syllabus";
import CreateSyllabus from "./Pages/Data/CreateSyllabus";
import EditSyllabus from "./Pages/Data/EditSyllabus";
import { BsPostcardHeartFill } from "react-icons/bs";
import Banners from "./Pages/Banner/Banners";
import AddBanners from "./Pages/Banner/AddBanners";
import EditBanners from "./Pages/Banner/EditBanners";
import PaymentDetail from "./Pages/Payments/PaymentDetail";
import EnrollUser from "./Pages/Enroll/EnrollUser";
import { FaBookReader } from "react-icons/fa";
function App({ onLogout, message }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const toggleDivs = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleItemClick = (item, navigateTo) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
    navigate(navigateTo);
  };

  return (
    <div className="App">
      <div className="Content-section">
        <div className={`left ${isExpanded ? "collapsed" : ""}`}>
          <ul>
            <div>
              <li
                className={activeItem === "Dashboard" ? "active" : ""}
                onClick={() => handleItemClick("Dashboard", "/dashboard")}
              >
                <RiDashboardFill />
                <span className="list-text">Dashboard</span>
              </li>
              <li
                className={activeItem === "Payments" ? "active" : ""}
                onClick={() => handleItemClick("Payments", "/payments")}
              >
                <MdPayments />
                <span className="list-text">Payments</span>
              </li>
              <li
                className={activeItem === "Courses" ? "active" : ""}
                onClick={() => handleItemClick("Courses", "/courses")}
              >
                <FaBook />
                <span className="list-text">Courses</span>
              </li>
              <li
                className={activeItem === "Users" ? "active" : ""}
                onClick={() => handleItemClick("Users", "/users")}
              >
                <FaUser />
                <span className="list-text">Users</span>
              </li>
              <li
                className={activeItem === "Banners" ? "active" : ""}
                onClick={() => handleItemClick("Banners", "/banners")}
              >
                <BsPostcardHeartFill />
                <span className="list-text">Banners</span>
              </li>
              <li
                className={activeItem === "Enroll" ? "active" : ""}
                onClick={() => handleItemClick("Enroll", "/enroll")}
              >
                <FaBookReader />
                <span className="list-text">Enroll Users</span>
              </li>
            </div>
            <div>
              <li onClick={onLogout}>
                <IoLogOut />
                <span className="list-text">Logout</span>
              </li>
            </div>
          </ul>
        </div>

        <FaCircleChevronLeft
          className={`close-icon ${isExpanded ? "rotated" : ""}`}
          onClick={toggleDivs}
        />

        <div className={`right ${isExpanded ? "expanded" : ""}`}>
          {message.text && (
            <div className={`alert ${message.type}`}>{message.text}</div>
          )}
          <Routes>
          <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/users" element={<Users />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/add-banner" element={<AddBanners />} />
            <Route path="/banner-edit" element={<EditBanners />} />
            <Route path="/add-course" element={<CreateCourse />} />
            <Route path="/course-edit" element={<CourseForm />} />
            <Route path="/syllabus/:id" element={<Syllabus />} />
            <Route path="/add-syllabus/:id" element={<CreateSyllabus />} />
            <Route path="/syllabus-edit" element={<EditSyllabus />} />
            <Route path="/payment/:id" element={<PaymentDetail />} />
            <Route path="/enroll" element={<EnrollUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
