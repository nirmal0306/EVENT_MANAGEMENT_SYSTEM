import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ adminUsername }) => {
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [g_Pprice, setG_Pprice] = useState('');
  const [s_Pprice, setS_Pprice] = useState('');
  const [p_Pprice, setP_Pprice] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to admin login if adminUsername is not present
    if (!adminUsername) {
      navigate('/admin/login');
    }
  }, [adminUsername, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const event = {
      EventName: eventName,
      Category: category,
      G_Pprice: g_Pprice,
      S_Pprice: s_Pprice,
      P_Pprice: p_Pprice,
    };
    
    axios
      .post('http://localhost:2000/Event/add', event)
      .then((res) => {
        swal({
          title: 'Done!',
          text: 'Event Successfully Added',
          icon: 'success',
          button: 'Okay!',
        }).then(() => {
          navigate('/admin/dashboard');
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <br /><br /><br /><br /><br /><br />
          <img
            src="https://s3-eu-west-1.amazonaws.com/poptop-wp/blog/wp-content/uploads/2018/02/15113845/1st-shot-2.gif"
            width="90%"
            height="60%"
            alt="Event"
          />
        </div>
        <div className="col-6">
          <div className="myformstyle2">
            <div className="card-body">
              <div className="col-md-8 mt-4 mx-auto"></div>
              <h3 className="text-center">
                <font face="Comic sans MS" size="6">Create New Event</font>
              </h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Event Name:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
  <label>Event Category:</label>
  <select
    required
    className="form-control"
    aria-labelledby="navbarDropdown" 
    style={{backgroundColor:'transparent',height:'52px'}}
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option className="dropdown-item" value="">Select Category</option>
    <option className="dropdown-item" value="Wedding">Wedding</option>
    <option className="dropdown-item" value="Conference">Conference</option>
    <option className="dropdown-item" value="Music Concert">Music Concert</option>
    <option className="dropdown-item" value="Birthday Party">Birthday Party</option>
    <option className="dropdown-item" value="Corporate Event">Corporate Event</option>
  </select>
</div>

                
                <div className="form-group">
                  <label>Gold Package Price:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="Enter Gold Package Price"
                    value={g_Pprice}
                    onChange={(e) => setG_Pprice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Silver Package Price:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="Enter Silver Package Price"
                    value={s_Pprice}
                    onChange={(e) => setS_Pprice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Platinum Package Price:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="Enter Platinum Package Price"
                    value={p_Pprice}
                    onChange={(e) => setP_Pprice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default CreateEvent;