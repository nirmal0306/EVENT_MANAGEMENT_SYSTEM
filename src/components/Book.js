//session working 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import swal from "@sweetalert/with-react";

function Book({ username }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentMethod, upiApp } = location.state || {}; // New payment details
  const [en, setEName] = useState("");
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [p1, setP1] = useState("");
  const [l, setL] = useState("");
  const [d, setD] = useState("");
  const [t, setT] = useState("");

  const [eventData, setEventData] = useState({
    EventID: "",
    EventName: "",
    Category: "",
    G_Pprice: "",
    S_Pprice: "",
    P_Pprice: "",
    Location: "",
    Date: "",
    Time: "",
    Package: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(
    () => {
      const storedData = sessionStorage.getItem("bookingData1");
      if (storedData) {
        const bookingData1 = JSON.parse(storedData);
        setEName(bookingData1.en); // Retrieve event name
        setC(bookingData1.c);
        setP(bookingData1.p);
        setP1(bookingData1.p1);
        setL(bookingData1.l);
        setD(bookingData1.d);
        setT(bookingData1.t);
      }

      if (!username) {
        alert("User not logged in.");
        navigate("/login");
        return;
      }

      // Fetch event data based on the event ID
      const fetchEventData = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/Event/${id}`);
          setEventData(response.data);

          const storedData = JSON.parse(sessionStorage.getItem("bookingData"));
          if (storedData) {
            setEventData((prevData) => ({
              ...prevData,
              ...storedData,
            }));
          }
        } catch (error) {
          console.error("There was an error fetching the event data!", error);
        }
      };

      fetchEventData();

      // Check if payment was successful
      const paymentStatus = sessionStorage.getItem("paymentSuccess");

      if (paymentStatus === "true") {
        setPaymentSuccess(true);
        sessionStorage.removeItem("paymentSuccess"); // Clear the payment success flag
      }

      // Handle the payment method received from PaymentPage
      if (paymentMethod) {
        console.log(`Payment Method: ${paymentMethod}`);
        if (upiApp) {
          console.log(`UPI App: ${upiApp}`);
        }
        setPaymentSuccess(true);
      }
    },
    [],
    [id, username, navigate, paymentMethod, upiApp]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const updatedData = {
      ...eventData,
      [name]: value,
    };
    sessionStorage.setItem("bookingData", JSON.stringify(updatedData));
  };

  const handlePaymentRedirect = () => {
    const price =
      eventData.Package === "Gold"
        ? eventData.G_Pprice
        : eventData.Package === "Silver"
        ? eventData.S_Pprice
        : eventData.Package === "Platinum"
        ? eventData.P_Pprice
        : "";

    const bookingData = {
      username,
      eventId: id,
      eventName: eventData.EventName,
      category: eventData.Category,
      package: eventData.Package,
      price,
      location: eventData.Location,
      date: eventData.Date,
      time: eventData.Time,
    };

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate(`/paymentPage/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentSuccess) {
      swal({
        title: "Payment Required",
        text: "Please complete the payment before booking.",
        icon: "warning",
        button: "Okay",
      });
      return;
    }

    const bookingData = {
      username: username,
      eventId: id,
      eventName: eventData.EventName,
      category: c,
      package: p,
      price: p1,
      location: l,
      date: d,
      time: t,
      paymentMethod: paymentMethod, // Include payment method
      upiApp: upiApp || null, // Include UPI App if applicable
    };

    axios
      .post("http://localhost:2000/Event/book", bookingData)
      .then((response) => {
        swal({
          title: "Done!",
          text: "Event Booked Successfully",
          icon: "success",
          button: "Okay!",
        }).then(() => {
          navigate("/user/booked");
          sessionStorage.removeItem("bookingData");
          sessionStorage.removeItem("bookingData1");
        });
      })
      .catch((error) => {
        console.error("Error booking event:", error);
        swal({
          title: "Error!",
          text: "There was an error or you have already booked this event.",
          icon: "error",
          button: "Okay!",
        });
      });
  };

  const isPaymentButtonDisabled = () => {
    const { EventName, Location, Date, Time, Package } = eventData;
    return !EventName || !Location || !Date || !Time || !Package;
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <br /> <br />
          <img
            src="https://s3-eu-west-1.amazonaws.com/poptop-wp/blog/wp-content/uploads/2018/02/15113845/1st-shot-2.gif"
            width="90%"
            height="60%"
            alt="img"
          />
        </div>
        <div className="col-6">
          <div className="myformstyle2">
            <div className="card-body">
              <h3 className="text-center">Book Event</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Event Name:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="EventName"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    value={eventData.EventName}
                    readOnly={paymentSuccess}
                    
                  />
                </div>
                {en && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }} >Event Name:</label>
          <input
            type="text"
            className="form-control"
            name="en"
            value={en}
            style={{ display: paymentSuccess ? "block" : "none" }}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}

                  <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Category:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="Category"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    value={eventData.Category}
                    readOnly
                    
                  />
                </div>
                {c && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }} >Category:</label>
          <input
            type="text"
            className="form-control"
            name="c"
            value={c}
            style={{ display: paymentSuccess ? "block" : "none" }}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}
                
                <label style={{ display: paymentSuccess ? "none" : "block" }}> Package:</label>
                <select
                  required
                  className="form-control"
                  style={{ height: "52px" , display: paymentSuccess ? "none" : "block" }}
                  name="Package"
                  value={eventData.Package}
                  onChange={handleChange}
                  disabled={paymentSuccess}
                >
                  <option className="dropdown-item" value="">
                    Select Package
                  </option>
                  <option className="dropdown-item" value="Gold">
                    Gold
                  </option>
                  <option className="dropdown-item" value="Silver">
                    Silver
                  </option>
                  <option className="dropdown-item" value="Platinum">
                    Platinum
                  </option>
                </select>

                {p && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }}>Package :</label>
          <input
            type="text"
            className="form-control"
            name="Pack"
            style={{ display: paymentSuccess ? "block" : "none" }}
            value={p}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}
                <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Price:</label>
                  {/* <label>Price:</label> */}
                  <input
                    type="number"
                    className="form-control"
                    name="Price"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    value={
                      eventData.Package === "Gold"
                        ? eventData.G_Pprice
                        : eventData.Package === "Silver"
                        ? eventData.S_Pprice
                        : eventData.Package === "Platinum"
                        ? eventData.P_Pprice
                        : ""
                    }
                    readOnly
                  />
                </div>
                {p1 && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }}>Price :</label>
          <input
            type="text"
            className="form-control"
            name="pric"
            value={p1}
            style={{ display: paymentSuccess ? "block" : "none" }}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}
                
                <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Location:</label>
                  {/* // <label >Location:</label> */}
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="Location"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    value={eventData.Location}
                    onChange={handleChange}
                    readOnly={paymentSuccess}
                  />
                </div>
                {l && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }}>Location :</label>
          <input
            type="text"
            className="form-control"
            name="Loc"
            value={l}
            style={{ display: paymentSuccess ? "block" : "none" }}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}
                
                
  <div className="form-group">
                <label style={{ display: paymentSuccess ? 'none' : 'block' }}>Date:</label>
                {/* <label>Date:</label> */}
                  <input
                    type="date"
                    required
                    className="form-control"
                    name="Date"
                    value={eventData.Date}
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                    onChange={handleChange}
                    readOnly={paymentSuccess}
                  />
                </div>

                {d && (
        <div className="form-group">
          <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }}>Date :</label>
          <input
            type="text"
            className="form-control"
            name="dt"
            value={d}
            style={{ display: paymentSuccess ? "block" : "none" }}
            hidden={!paymentSuccess}
            readOnly
          />
        </div>
      )}

                
                <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Time:</label>
                  <input
                    type="time"
                    required
                    className="form-control"
                    name="Time"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    value={eventData.Time}
                    onChange={handleChange}
                    readOnly={paymentSuccess}
                  />
                </div>
                {t && (
                  <div className="form-group">
                    <label hidden={!paymentSuccess} style={{ display: paymentSuccess ? "block" : "none" }}>Time :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tm"
                      value={t}
                      style={{ display: paymentSuccess ? "block" : "none" }}
                      hidden={!paymentSuccess}
                      readOnly
                    />
                  </div>
                )}

                
                <div className="form-group">
                  <label style={{ display: paymentSuccess ? "none" : "block" }}>Payment: </label>
                  <input
                    type="button"
                    className="btn btn-success"
                    value="Make Payment"
                    style={{ display: paymentSuccess ? "none" : "block" }}
                    onClick={handlePaymentRedirect}
                    disabled={isPaymentButtonDisabled() || paymentSuccess}
                  />
                </div>

                {paymentMethod && (
                  <div>
                    <div className="form-group">
                      <label>Payment Method:</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="paymentMethod"
                        value={paymentMethod}
                        readOnly
                      />
                    </div>

                    {upiApp && (
                      <p>
                        UPI App:{" "}
                        <input
                          type="text"
                          name="upiApp"
                          className="form-control"
                          value={upiApp}
                          readOnly
                        />
                      </p>
                    )}
                  </div>
                )}

                {paymentSuccess && (
                  <div className="alert alert-success">
                    Payment successful! You can now book the event.
                  </div>
                )}

                <div className="form-group">
                  <input
                    type="submit"
                    value="Book Event"
                    className="btn btn-primary"
                    disabled={!paymentSuccess}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
