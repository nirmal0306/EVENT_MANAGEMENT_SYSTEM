import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

function EventDetails({ username }) {
    const { id } = useParams();
    const [eventData, setEventData] = useState({});
    const [bookingId, setBookingId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            console.log("User not logged in.");
            alert('User not logged in.');
            navigate('/login');
            return;
        }
        // Fetch event data
        axios
            .get(`http://localhost:2000/Event/${id}`)
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

        axios
            .delete(`http://localhost:2000/booking/cancel/${bookingId}`)
            .then(() => {
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
                                        value={username}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.EventName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventData.Category}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
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

export default EventDetails;
