import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import HomeUser from "./components/HomeUser";
import UserEvent from "./components/UserEvent";
import EditEvent from "./components/edit-Event.component";
import CreateEvent from "./components/create-Event.component";
import EventList from "./components/Event-list.component";
import Report from "./components/Report";
import UserDetails from "./components/UserDetails";
import BookedEvent from "./components/BookedEvent";
import AdminDetails from "./components/AdminDetails";
import UserBookings from "./components/UserBookings";
import UserBooked from "./components/UserBooked";
import BookedEvent1 from "./components/BookedEvent1";
import Book from "./components/Book";
import PaymentPage from "./components/PaymentPage";
import FeedbackForm from "./components/FeedbackForm";


function App() {
  const [username, setUsername] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loggedInAdminname, setLoggedInAdminname] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedInUsername(username);
    // console.log(username)
  };

  const handleAdminLogin = (adminUsername) => {
    setAdminUsername(adminUsername);
    setLoggedInAdminname(adminUsername);
    console.log("Admin Username Set:", adminUsername); // Debugging line
  };

  const handleLogout = () => {
    setUsername('');
    setAdminUsername('');
  };

  const renderNavbar = () => {
    console.log("Current Admin Username:", adminUsername);  // Debugging line
    if (adminUsername) {
      return (
<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  <Link to="/" className="navbar-brand">
    <font face="Comic sans MS" size="4">Event Management System</font>
  </Link>
  <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <Link to="/" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '500px' }}>Home</Link>
      <Link to="/admindetails" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px', fontFamily: "cursive", color:"white" }}>Hi, {adminUsername}</Link>
      
      
      <li className="nav-item dropdown">
        <button className="btn btn-outline-success dropdown-toggle" style={{ marginLeft: '8px' }} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Manage Events
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:'transparent'}}>
          <Link to="/create" className="dropdown-item" style={{color:'black'}}>Create Event</Link>
          <Link to="/admin/dashboard" className="dropdown-item" style={{color:'black'}}>List Event</Link>
          <Link to="/user/bookings" className="dropdown-item" style={{color:'black'}}>Booked Event</Link>
          <Link to="/Report" className="dropdown-item" style={{color:'black'}}>Report</Link>
        </div>
      </li>
      
      <Link to="/logout" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px' }}>Logout</Link>
    </ul>
  </div>
</nav>

      );
    } else if (username) {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            <font face="Comic sans MS" size="4">Event Management System</font>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <Link to="/" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '560px' }}>Home</Link>

              <Link to="/userdetails" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px'  , fontFamily: "cursive" , color:"white"}}>Hi, {username}</Link>

              <li className="nav-item dropdown">
        <button className="btn btn-outline-success dropdown-toggle" style={{ marginLeft: '8px' }} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Events
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:'transparent'}}>
          <Link to="/user/booked" className="dropdown-item" style={{color:'black'}}>Booked Event</Link>
          
          <Link to="/events" className="dropdown-item" style={{color:'black'}}>List Events</Link>
        </div>
      </li>   
              <Link to="/logout" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px' }}>Logout</Link>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            <font face="Comic sans MS" size="4">Event Management System</font>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto
            ">
              <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '638px' }}>Login</Link>
              <Link to="/register" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px' }}>Register</Link>
              <Link to="/admin/login" className="btn btn-outline-success my-2 my-sm-0" style={{ marginLeft: '8px' }}>Admin Login</Link>
            </ul>
          </div>
        </nav>
      );
    }
  };

  return (
    <Router>
      <div className="container">
        {renderNavbar()}
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<EventList adminUsername={loggedInAdminname} />} />
          <Route path="/edit/:id" element={<EditEvent adminUsername={loggedInAdminname} />} />
          <Route path="/book/:id" element={<Book username={loggedInUsername}/>} />
          <Route path="/booked/:id" element={<BookedEvent username={loggedInUsername}/>} />
          <Route path="/booked1/:id" element={<BookedEvent1 adminUsername={loggedInAdminname}/>} />
          <Route path="/create" element={<CreateEvent adminUsername={loggedInAdminname} />} />
          <Route path="/events" element={<UserEvent username={loggedInUsername} />} />
          <Route path="/Report" element={<Report adminUsername={loggedInAdminname} />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/userdetails" element={<UserDetails username={loggedInUsername} />} />
          <Route path="/admindetails" element={<AdminDetails adminUsername={loggedInAdminname} />} />
          <Route path="/user/bookings" element={<UserBookings adminUsername={loggedInAdminname} />} />
          <Route path="/user/booked" element={<UserBooked username={loggedInUsername} />} />
          
          <Route path="/paymentPage/:id" element={<PaymentPage username={loggedInUsername} />} />
          <Route path="/feedback" element={<FeedbackForm username={loggedInUsername} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
