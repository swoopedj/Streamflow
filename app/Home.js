import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='search'>
      <h1>Streamflow Project</h1>
      <div className="input_group">
        <input type='text' required />
        <label>Address</label>
      </div>
      <div className="input_group">
        <input type='text' required />
        <label>City</label>
      </div>
      <div className="input_group">
        <input type='text' required />
        <label>State</label>
      </div>
      <Link to="/search">Search</Link>
      <Link to="/find">or Find Near Me</Link>
    </div>
  );
};

export default Home;