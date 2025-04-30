import React from 'react';
import './Home.css';
import eventImage1 from './images/event1.jpg';
import eventImage2 from './images/event2.jpg';
import eventImage3 from './images/event3.jpg';

  function HomeUser({username}) {
  return (
    <div>
      
    <div className="home">
      
      <header className="hero">
        <h2>Welcome to Event Manager</h2>
        <p style={{color:'black'}}>Your ultimate solution for managing and attending events seamlessly.</p>
      </header>
      <div className="features">
        <div className="feature">
          <img src={eventImage1} className='img' alt="Feature 1" />
          <h3>Plan Events</h3>
          <p>Create and manage your events with ease.</p>
        </div>
        <div className="feature">
          <img src={eventImage2} alt="Feature 2" />
          <h3>Join Events</h3>
          <p>Find and join events that interest you.</p>
        </div>
        <div className="feature">
          <img src={eventImage3} alt="Feature 3" />
          <h3>Track Attendance</h3>
          <p>Keep track of your event attendees.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomeUser;