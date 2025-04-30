import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

function EditEvent({ adminUsername }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    EventID: "",
    EventName: "",
    Category: "",
    G_Pprice: "",
    S_Pprice: "",
    P_Pprice: "",
  });

  useEffect(() => {
    if (!adminUsername) {
      alert("Admin not logged in.");
      navigate("/admin/login");
      return;
    }
    axios
      .get(`http://localhost:2000/Event/${id}`)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the event data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2000/Event/update/${id}`, eventData)
      .then((res) => console.log(res.data));

    swal({
      title: "Done!",
      text: "Event Successfully Edited",
      icon: "success",
      button: "Okay!",
    }).then((value) => {
      // window.location = "/admin/dashboard";
      navigate('/admin/dashboard');
    })
      .catch((error) => {
        console.error("There was an error updating the event!", error);
      });
  };

  return (
      <div>
        <div class="row">
          <div class="col-6">
          <br /> <br /> <br /> <br /> <br /> <br />
            <img
              src="https://s3-eu-west-1.amazonaws.com/poptop-wp/blog/wp-content/uploads/2018/02/15113845/1st-shot-2.gif"
              width="90%"
              height="60% "
              alt="img"
            />
          </div>{" "}
          <div class="col-6">
            <div class="myformstyle2">
              <div className="card-body">
                <div className="col-md-8 mt-4 mx-auto"> </div>
                <h3 className="text-center">
                  <font face="Comic sans MS" size="6">
                    Edit Event
                  </font>{" "}
                </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event ID: </label>
          <input
            type="Number"
            required
            className="form-control"
            name="EventID"
            value={eventData.EventID}
            // onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
        <label>Event Name:</label>
          <input
            type="text"
            required
            className="form-control"
            name="EventName"
            value={eventData.EventName}
            onChange={handleChange}
          />
        </div>
        <label>Event Category:</label>
        <select
  required
  className="form-control"
  name="Category"
  value={eventData.Category}
  aria-labelledby="navbarDropdown"
  style={{ backgroundColor: 'transparent', height: '52px' }}
  onChange={handleChange}
>
  <option className="dropdown-item" value="">Select Category</option>
  <option className="dropdown-item" value="Wedding">Wedding</option>
  <option className="dropdown-item" value="Conference">Conference</option>
  <option className="dropdown-item" value="Music Concert">Music Concert</option>
  <option className="dropdown-item" value="Birthday Party">Birthday Party</option>
  <option className="dropdown-item" value="Corporate Event">Corporate Event</option>
</select>

        <div className="form-group">
          <label>Gold Package Price:</label>
          <input
            type="number"
            className="form-control"
            name="G_Pprice"
            value={eventData.G_Pprice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Silver Package Price:</label>
          <input
            type="number"
            className="form-control"
            name="S_Pprice"
            value={eventData.S_Pprice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Platinum Package Price:</label>
          <input
            type="number"
            className="form-control"
            name="P_Pprice"
            value={eventData.P_Pprice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Update" className="btn btn-primary" />
          </div>{" "}
                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <br /> <br />
      </div>
    );
  }


export default EditEvent;
