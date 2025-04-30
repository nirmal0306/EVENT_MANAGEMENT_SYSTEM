//session

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css"; // External CSS file.
import swal from "@sweetalert/with-react";

const PaymentPage = ({username}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiApp, setUpiApp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming id is part of the route
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (!username) {
      alert("User not logged in.");
      navigate("/login");
      return;
    }
    const storedData = sessionStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      alert("No booking data found!");
      navigate("/"); // Redirect to home or any other page
    }
  }, [navigate]);

  const handlePayment = (e,en,c,p,p1,l,d,t) => {
    const bookingData1 = {
      en : bookingData.eventName,
      c : bookingData.category,
      p : bookingData.package,
      p1 : bookingData.price,
      l : bookingData.location,
      d : bookingData.date,
      t : bookingData.time,

    };
  
    // Store booking data in session storage
    sessionStorage.setItem("bookingData1", JSON.stringify(bookingData1));
    
    
    e.preventDefault();
    if (paymentMethod === "UPI" && !upiApp) {
      alert("Please select a UPI app.");
      return;
    }

    // Simulate payment success
    setTimeout(() => {
      sessionStorage.setItem("paymentSuccess", "true");
      
      // Pass payment method and UPI app data back to the Book page
      swal({
        title: "Done!",
        text: "Payment Done Successfully",
        icon: "success",
        button: "Okay!",
      }).then(() => {
        navigate(`/book/${id}`, {
          state: { paymentMethod, upiApp },
        });
      });
    }, 1000);
  };

  return (
    <div className="payment-container">
      <div>
        <div className="payment-container">
          {bookingData ? (
            <div>
              <h2>Payment Details</h2>
              <p>
                <strong>Username:</strong> {bookingData.username}
              </p>
              <p>
                <strong>Event Name:</strong> {bookingData.eventName}
              </p>
              <p>
                <strong>Category:</strong> {bookingData.category}
              </p>
              <p>
                <strong>Package:</strong> {bookingData.package}
              </p>
              <p>
                <strong>Price:</strong> ₹{bookingData.price}
              </p>
            </div>
          ) : (
            <h2>No booking data available</h2>
          )}
        </div>
      </div>
      <h2>Select Payment Method</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>
            Select Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </label>
        </div>

        {paymentMethod === "UPI" && (
          <div>
            <label>
              Select UPI App:
              <select
                value={upiApp}
                onChange={(e) => setUpiApp(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Google Pay">Google Pay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
      </select>
    </label>
  </div>
)}

        <button className="btn btn-success" type="submit">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
