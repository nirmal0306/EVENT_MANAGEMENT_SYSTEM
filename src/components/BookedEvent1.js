import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function BookedEvent1({ adminUsername,username }) {
    const { id } = useParams();
    const [eventData, setEventData] = useState({});
    // const [bookingData, setBookingData] = useState({});
    const [setBookingId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUsername) {
            console.log("Admin not logged in.");
            alert('Admin not logged in.');
            navigate('/admin/login');
            return;
        }
        // Fetch event data
        axios
            .get(`http://localhost:2000/booking/${id}`)
            .then((response) => {
                setEventData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
            });

        // Fetch booking ID for this user and event
        axios
            .get(`http://localhost:2000/booking/find/${username}/${id}`)
            .then((response) => {
                setBookingId(response.data._id);
            })
            .catch((error) => {
                console.error("Error fetching booking ID:", error);
            });
    }, [id, adminUsername]);

    const handleBack = () => {
        navigate('/user/bookings/');   
    }



    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <br /> <br /> <br /> <br /> <br /> <br />
                    <img
                        src="https://s3-eu-west-1.amazonaws.com/poptop-wp/blog/wp-content/uploads/2018/02/15113845/1st-shot-2.gif"
                        width="90%"
                        height="70%"
                        alt="Event"
                    />
                </div>
                <div className="col-6">
                    <div className="myformstyle2">
                        <div className="card-body">
                            <h3 className="text-center">
                                <font face="Comic sans MS" size="6">
                                    Booked Event
                                </font>
                            </h3>
                            <form>
                            <div className="form-group">
                                    <label>Username: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.username}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.eventName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.category}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Package Selected:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.package}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                        <label>Price: </label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.price}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Location:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.location}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Booking Date:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.date}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.time}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Payment via:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.paymentMethod}
                                        readOnly
                                    />
                                </div>
                                {/* Conditionally render the UPI app field */}
                                {eventData.upiApp && (
                                    <div className="form-group">
                                        <label>UPI app:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={eventData.upiApp}
                                            readOnly
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>Booked at :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.bookingDate}
                                        readOnly
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label>Event Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.eventName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.category}
                                        readOnly
                                    /> */}
                                {/* </div> */}
                                {/* <div className="form-group">
                                    <label>Gold Package Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={eventData.G_Pprice}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Silver Package Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={eventData.S_Pprice}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Platinum Package Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={eventData.P_Pprice}
                                        readOnly
                                    />
                                </div> */}
                                
                                <div className="form-group">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="btn btn-danger"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br /> <br />
        </div>
    );
}

export default BookedEvent1;
