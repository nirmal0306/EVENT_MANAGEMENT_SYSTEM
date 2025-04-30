import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackForm.css";
import { useNavigate } from 'react-router-dom';
import swal from "@sweetalert/with-react";

function FeedbackForm({ username }) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
    if (!username) {
      alert("user not logged in !!");
      navigate('/login');
    }
  }, [username, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) return alert("Feedback cannot be empty");

    try {
      await axios.post("http://localhost:2000/Event/feedback", {
        username,
        feedback,
      }).then(() => {
        swal({
          title: "Done!",
          text: "Feedback send Successfully",
          icon: "success",
          button: "Okay!",
        })});
      setSubmitted(true);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!feedback) return alert("Feedback cannot be empty");

  //   const data = {
  //       username,
  //       feedback,
  //   }

  //     await axios.post("http://localhost:2000/feedback", data);
  //     setSubmitted(true);
  //     setFeedback("");
  //     axios
  //     // .post("http://localhost:2000/feedback", bookingData)
  //     // .then((response) => {
  //     //   swal({
  //     //     title: "Done!",
  //     //     text: "Event Booked Successfully",
  //     //     icon: "success",
  //     //     button: "Okay!",
  //     //   }).then(() => {
  //     //     navigate("/user/booked");
  //     //     sessionStorage.removeItem("bookingData1");
  //     //   });
  //     // })
  //     // .catch((error) => {
  //     //   console.error("Error booking event:", error);
  //     //   swal({
  //     //     title: "Error!",
  //     //     text: "There was an error or you have already booked this event.",
  //     //     icon: "error",
  //     //     button: "Okay!",
  //     //   });
  //     // });
  
    
  // };

  return (
    <div className="feedback-container">
      <h3>Submit Your Feedback</h3>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              placeholder="Enter feedback here"
              value={feedback}
              style={{color:'#000'}}
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
