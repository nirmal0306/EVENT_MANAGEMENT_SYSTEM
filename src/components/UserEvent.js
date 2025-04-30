import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import { Link,useNavigate } from "react-router-dom";
// Component for rendering each event row
const Event = (props) => (
  <tr>
    <td>{props.Event.EventID}</td>
    <td>{props.Event.EventName}</td>
    <td>{props.Event.Category}</td>
    <td>{props.Event.G_Pprice}</td>
    <td>{props.Event.S_Pprice}</td>
    <td>{props.Event.P_Pprice}</td>
    <td>
      {/* <Button
        variant="warning btn-sm"
        onClick={() => props.onBookEvent(props.Event._id, props.Event.EventName, props.username)}
      >
        Book
      </Button> */}
      <Link to={"/book/" + props.Event._id}>
      <Button variant="danger btn-sm">
                    Book
                    </Button>{" "}
      </Link>
            
    </td>
  </tr>
);

// Main UserEvent component
const UserEvent = ({ username }) => {
  const [events, setEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    if (!username) {
      console.log("User not logged in.");
      alert('user not logged in.');
      navigate('/login');
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

  const navigate = useNavigate();  
  // Handle booking event
  const handleBookEvent = (eventId,eventName, username) => {
    axios
      .post("http://localhost:2000/Event/book", { eventId, eventName, username })
      .then((response) => {
        swal({
          title: 'Done!',
          text: 'Event Booked Successfully',
          icon: 'success',
          button: 'Okay!',
        }).then(() => {
          navigate('/user/booked');
          
        });
      })
      .catch((error) => {
        console.error("Error booking event:", error);
          swal({
            title: 'Error!',
            text: 'You have already booked this event',
            icon: 'error',
            button: 'Okay!',
          })
        // alert("Failed to book event.");
      });
  };
  


  // Handle search functionality
  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:2000/Event/").then((response) => {
      const result = response.data.filter((event) =>
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
          <h4>All Events</h4>{" "}
        </div>{" "}
        <div className="col-lg-3 mt-2 mb-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search by Event Name"
            name="searchQuery"
            onChange={handleSearchArea}
          />
        </div>{" "}
      </div>
      <table className="table table-bordered table-white">
        <thead className="thead-light">
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Event Category</th>
            <th>G P Price</th>
            <th>S P Price</th>
            <th>P P Price</th>
            <th>Action</th>
          </tr>
        </thead>{" "}
        <tbody>
          {events.map((event) => (
            <Event
              key={event.EventID}
              Event={event}
              username={username}
              onBookEvent={handleBookEvent}
            />
          ))}
        </tbody>{" "}
      </table>
    </div>
  );
};

export default UserEvent;
