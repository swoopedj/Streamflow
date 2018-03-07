import React from 'react';

class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      proximity: ''
    };

    this.findSites = this.findSites.bind(this);
    this.proximityChange = this.proximityChange.bind(this);
    this.search = this.search.bind(this);
  }

  findSites () {
    //use browser geolocation to get lat and long
  }

  proximityChange (event) {
    this.setState({proximity: event.target.value});
  }

  search () {
    // pass location data to API
  }

  render() {
    return (
      <div className='search'>
        <h1>Streamflow Project</h1>
        <form onSubmit={this.search}>
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
          <div className="input_group">
            <span>Proximity</span>
            <select >
              <option value="1">1 mi</option>
              <option value="2">2 mi</option>
              <option value="3">3 mi</option>
              <option value="5">5 mi</option>
              <option value="10">10 mi</option>
              <option value="20">20 mi</option>
            </select>
          </div>
          <button onClick={this.state.search}>Search</button>
          <span>or</span>
          <button onClick={this.state.findSites}>or Find Near Me</button>
          <span>(uses browser geolocation)</span>
          <div id="search_error"></div>
        </form>
      </div>
    );
  }
}

export default Search;
