import React, { useEffect, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBook } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import Chart from "./Chart";
import Areachart from "./Areachart";

import "./Dashboard.css";
import { fetchDashboard } from "../../DAL/fetch";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const getStats = async () => {
    try {
      const response = await fetchDashboard();
      console.log("DASHBARD DAT IS ", response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      
    }
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <>
      <h2 className="dashboard-text">Dashboard</h2>
      <div className="cards">
        <div className="card0">
          <HiMiniUsers className="card-icon" />

          <div className="card-lower-section">
            <h3>{data.total_user}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="card6">
          <FaBook className="card-icon" />
          <div className="card-lower-section">
            <h3>{data.total_course}</h3>
            <p>Total Courses</p>
          </div>
        </div>

        <div className="card2">
          <IoMdStats className="card-icon" />

          <div className="card-lower-section">
            <h3>{data.today_sale}</h3>
            <p>Today Sales</p>
          </div>
        </div>
        <div className="card3">
          <IoMdStats className="card-icon" />

          <div className="card-lower-section">
            <h3>{data.yesterday_sale}</h3>
            <p>Yesterday Sales</p>
          </div>
        </div>
        <div className="card4">
          <IoMdStats className="card-icon" />

          <div className="card-lower-section">
            <h3>{data.this_month_sale}</h3>
            <p>This Month Sales</p>
          </div>
        </div>
        <div className="card5">
          <IoMdStats className="card-icon" />

          <div className="card-lower-section">
            <h3>{data.last_month_sale}</h3>
            <p>Last Month Sales</p>
          </div>
        </div>
        <div className="card6">
          <IoMdStats className="card-icon" />
          <div className="card-lower-section">
            <h3>{data.total_sale}</h3>
            <p>All Time Sales</p>
          </div>
        </div>
      </div>
      <div className="charts-areas">
        <div className="left-chart">
          <Chart />
        </div>
        <div className="right-chart">
          <Areachart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
