import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from "react-bootstrap";

const UserBookings = ({ adminUsername }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUsername) {
            console.log("Admin not logged in.");
            alert('Admin not logged in.');
            navigate('/admin/login');
            return;
        }

        console.log(adminUsername);
        axios.get(`http://localhost:2000/booking`)
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch bookings');
                setLoading(false);
            });
    }, [adminUsername]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (bookings.length === 0) return <div>No bookings found.</div>;

    return (
        <div>
    <h2>User Bookings</h2>
    <table className="table table-bordered">
        <thead className="thead-light">
            <tr>
                <th>Username</th>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Booking Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {bookings.map((booking) => (
                <tr key={booking._id}>
                    <td>{booking.username}</td>
                    <td>{booking.eventId}</td>
                    <td>{booking.eventName}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                        <Link to={"/booked1/" + booking._id}>
                            <Button variant="danger btn-sm">
                                Open
                            </Button>
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    );
};

export default UserBookings;
