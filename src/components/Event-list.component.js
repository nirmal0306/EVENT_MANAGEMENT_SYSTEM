import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const Event = ({ event, deleteEvent }) => (
  <tr>
    <td>{event.EventID}</td>
    <td>{event.EventName}</td>
    <td>{event.Category}</td>
    <td>{event.G_Pprice}</td>
    <td>{event.S_Pprice}</td>
    <td>{event.P_Pprice}</td>
    <td>
      <Link to={"/edit/" + event._id}>
      <Button variant="danger btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill"  viewBox="0 0 576 512">
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                    </svg>
                    </Button>{" "}
      </Link>
      <Button
        variant="danger btn-sm"
        onClick={() => deleteEvent(event._id)}
        style={{ marginTop: '6px' }}
      >
                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg> 
      </Button>
    </td>
  </tr>
);

const EventList = ({ adminUsername}) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUsername) {
      console.log("Admin not logged in.");
      alert('Admin not logged in.');
      navigate('/admin/login');
      return;
  }
    axios
      .get("http://localhost:2000/Event/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:2000/Event/" + id)
        .then((response) => {
          console.log(response.data);
          setEvents(events.filter((event) => event._id !== id));
        })
        .then(() => {
          navigate("/admin/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:2000/Event/").then((response) => {
      const resultt = response.data;
      const result = resultt.filter((event) =>
        event.EventName.includes(searchKey)
      );
      setEvents(result);
    });
  };

  return (
    <div className="container">
      <div style={{ float: "none" }}></div> <br />
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4>All Events</h4>
        </div>
        <div className="col-lg-3 mt-2 mb-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search by Event Name"
            name="searchQuery"
            onChange={handleSearchArea}
          />
        </div>
      </div>
      <table className="table table-bordered table-white">
        <thead className="thead-light
        ">
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Event Category</th>
            <th>G P Price</th>
            <th>S P Price</th>
            <th>P P Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <Event event={event} deleteEvent={deleteEvent} key={event._id} />
          ))}
        </tbody>
      </table>
      <div style={{ float: "right" }}>
        <Link to="/create">
          <button type="button" className="btn btn-success" variant="primary">
            New Event
          </button>
        </Link>
        <br /><br /><br />
      </div>
    </div>
  );
};

export default EventList;
