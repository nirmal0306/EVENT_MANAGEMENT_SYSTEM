import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

function BookedEvent({ username }) {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState({});
    const [bookingId, setBookingId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            console.log("User not logged in.");
            alert('User not logged in.');
            navigate('/login');
            return;
        }

        // Fetch booking ID for this user and event
        axios
            .get(`http://localhost:2000/booking/find/${username}/${id}`)
            .then((response) => {
                setBookingId(response.data._id); // Set booking ID
                return axios.get(`http://localhost:2000/booking/${response.data._id}`); // Fetch booking data
            })
            .then((response) => {
                setBookingData(response.data); // Set booking data
            })
            .catch((error) => {
                console.error("Error fetching booking data:", error);
            });
    }, [id, username]);

    const handleCancel = () => {
        if (!bookingId) {
            swal({
                title: "Error!",
                text: "No booking found to cancel.",
                icon: "error",
                button: "Okay",
            });
            return;
        }
    
        // Check if the booking date is tomorrow
        const bookingDate = new Date(bookingData.date);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
    
    
        axios
            .delete(`http://localhost:2000/booking/cancel/${bookingId}`)
            .then(() => {
                if (bookingDate.toDateString() === tomorrow.toDateString()) {
                    alert("You can't get a refund because your event is tomorrow.");                    
                }
                swal({
                    title: "Canceled!",
                    text: "Event has been canceled successfully",
                    icon: "success",
                    button: "Okay!",
                }).then(() => {
                    navigate('/user/booked');
                });
            })
            .catch((error) => {
                console.error("Error canceling the booking:", error);
                swal({
                    title: "Error!",
                    text: "Failed to cancel the event",
                    icon: "error",
                    button: "Okay",
                });
            });
    };
    
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
                                    Your Booked Event
                                </font>
                            </h3>
                            <form>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.username}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.eventName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.category}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Package Selected:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.package}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                        <label>Price: </label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.price}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Location:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.location}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Booking Date:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.date}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.time}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Payment via:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.paymentMethod}
                                        readOnly
                                    />
                                </div>
                                {/* Conditionally render the UPI app field */}
                                {bookingData.upiApp && (
                                    <div className="form-group">
                                        <label>UPI app:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={bookingData.upiApp}
                                            readOnly
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>Booked at :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingData.bookingDate}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-danger"
                                    >
                                        Cancel Event
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

export default BookedEvent;