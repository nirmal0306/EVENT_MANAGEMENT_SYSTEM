import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from "react-bootstrap";


const UserBooked = ({ username }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            console.log("User not logged in.");
            alert('User not logged in.');
            navigate('/login');
            return;
        }

        console.log(username);
        axios.get(`http://localhost:2000/booking`)
            .then(response => {
                const userBookings = response.data.filter(booking => booking.username === username);
                setBookings(userBookings);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch bookings');
                setLoading(false);
            });
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (bookings.length === 0) return <div>No bookings found.</div>;

    return (
        <div>
    <h2>Your Bookings</h2>
    <table className="table table-bordered">
        <thead className="thead-light">
            <tr>
                <th>Booked By</th>
                <th>Event Name</th>
                <th>Booked At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {bookings.map((booking) => (
                <tr key={booking._id}>
                    <td>{booking.username}</td>
                    <td>{booking.eventName}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                        <Link to={`/booked/${booking.eventId}`}>
                            <Button variant="danger btn-sm">Open</Button>
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

        // <div>
        //     <h2>Your Bookings</h2>
        //     <ul>
        //         {bookings.map((booking) => (
        //             <li key={booking._id}>
        //                 <p><strong>Booked By:</strong> {booking.username}</p>
        //                 <p><strong>Event Name:</strong> {booking.eventName}</p>
        //                 <p><strong>Booked at :</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        //                 <Link to={`/booked/${booking.eventId}`}>
        //                     <Button variant="danger btn-sm">Open</Button><br /><br />
        //                 </Link>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default UserBooked;