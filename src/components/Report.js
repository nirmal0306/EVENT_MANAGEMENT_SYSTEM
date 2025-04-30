import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Event = ({ Event }) => (
  <tr>
    <td>{Event.EventID}</td>
    <td>{Event.EventName}</td>
    <td>{Event.Category}</td>
    <td>{Event.G_Pprice}</td>
    <td>{Event.S_Pprice}</td>
    <td>{Event.P_Pprice}</td>
  </tr>
);

const EventList = ({ adminUsername }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin login if adminUsername is not present
    if (!adminUsername) {
      navigate('/admin/login');
    }
    fetchEvents();
  }, [adminUsername, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:2000/Event/");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openPrintWindow = () => {
    const printContent = `
      <html>
        <head>
          <title>Event Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h4>Event Report</h4>
          <table>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Event Category</th>
                <th>G P Price</th>
                <th>S P Price</th>
                <th>P P Price</th>
              </tr>
            </thead>
            <tbody>
              ${events.map(event => `
                <tr key=${event.EventID}>
                  <td>${event.EventID}</td>
                  <td>${event.EventName}</td>
                  <td>${event.Category}</td>
                  <td>${event.G_Pprice}</td>
                  <td>${event.S_Pprice}</td>
                  <td>${event.P_Pprice}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h2>Event Report</h2>
        </div>
        <div className="col-lg-1 mt-1 mb-1">
          <button
            onClick={openPrintWindow}
            className="btn btn-danger"
          >
            Print
          </button>
        </div>
      </div>
      
      <table className="table table-bordered table-white">
        <thead className="thead-light">
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Available Packages</th>
            <th>G P Price</th>
            <th>S P Price</th>
            <th>P P Price</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <Event
              Event={event}
              key={event._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
