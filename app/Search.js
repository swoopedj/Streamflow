import React from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// import bBoxFormatter from './util/format-bbox.js';

const SearchWrapper = styled.div`
  align-items: center;
  border-radius: 3px;
  color: #40A4DF;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.5px;
  margin: auto;
  padding: 10px;
  width: 40%;

  span {
    margin: 5px;
  }

  .error {
    color: red;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    text-align: center;
  }
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  > input {
    border: none;
    border-bottom: 2px solid black;
    display: block;
    font-size: 1rem;
    margin-top: 0.5rem;
    outline: none;
    width: 100%;
  }

  > label {
    color: #999;
    font-size: 1rem;
    position: absolute;
    pointer-events:none;
    left: 5px;
    top: -3px;
    width: 100%;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }

  > input:focus ~ label, input:valid ~ label {
    top: -20px;
    font-size: 0.75rem;
    color: #40A4DF;
  }

  button {
    border-radius: 7px;
    background-color: #40A4DF;
    color: #fff;
    font-size: 1rem;
    margin-left: 20px;
    padding: 5px 7px;
    &.disabled {
      background-color: #d3d3d3
    }
  }

  > span {
    font-size: 0.75rem;
  }

`;

class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      proximity: '3',
      state: '',
      error: '',
    };

    this.getSites = this.getSites.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.showNavError = this.showNavError.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  getCoordinates(){
    this.setState({error: ''});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.getSites(location);
      }, this.showNavError);
    }

  }

  getSites(location) {
    axios.get('/api/bBox', {
      params: {
        coords: location,
        radius: this.state.proximity
      }
    }).then(results => {
      if (results.data.length) {
        this.props.history.push('/results', { site_list: results.data});
      }
      //set error for no results
      this.setState({error: 'No sites found in area.\nTry another location or increasing proximity.'});
      
    });
  }

  search () {
    this.setState({error: ''});

    // pass form data to API
    // if results are returned, route to /results
    // if no results returned, display error
    // error should suggest entering a county instead of city?
    axios.get('/api/address', {
      params: {
        address: `${this.state.address},${this.state.city},${this.state.state}`,
      }
    }).then(response => {
      if(response.data.results.length !== 1) {
        this.setState({error: 'Specified address not found'});
        return;
      }
      axios.get('/api/bBox', {
        params: {
          coords: response.data.results[0].geometry.location,
          radius: this.state.proximity
        }
      }).then(results => {
        if (results.data.length) {
          this.props.history.push('/results', { site_list: results.data});
        }
        this.setState({error: 'No sites found in area.  Try another location or increasing proximity.'});
      });
    });
  }

  showNavError(error) {
    switch(error.code) {
    case error.PERMISSION_DENIED:
      this.setState({error: 'Permission denied'});
      break;
    case error.POSITION_UNAVAILABLE:
      this.setState({error: 'Geolocation unavailable'});
      break;
    default:
      this.setState({error: 'Geolocation error'});
      break;
    }
  }

  validateField(e) {
    let err = `${e.target.name}Error`;
    if (!e.target.value) {
      this.setState({[err]: true});
      return;
    }
    this.setState({[err]: false});

  }

  render() {
    return (
      <SearchWrapper>
        <h1>Streamflow</h1>
          <InputGroup>
            <input type="text" name="address" onChange={this.handleChange} required />
            <label >Address</label>
            <span></span>
          </InputGroup>
          <InputGroup>
            <input type='text' name="city" onChange={this.handleChange} onBlur={this.validateField} required />
            <label>City</label>
            <span className='error'>{this.state.cityError ? 'Required' : ''}</span>
          </InputGroup>
          <InputGroup>
            <input type='text' name="state" onChange={this.handleChange} onBlur={this.validateField} required />
            <label>State</label>
            <span className='error'>{this.state.stateError ? 'Required' : ''}</span>
          </InputGroup>
          <InputGroup>
            <span>Proximity</span>
            <select name="proximity" value={this.state.proximity} onChange={this.handleChange}>
              <option value="1">1 mi</option>
              <option value="2">2 mi</option>
              <option value="3">3 mi</option>
              <option value="5">5 mi</option>
              <option value="10">10 mi</option>
              <option value="20">20 mi</option>
            </select>
            <button onClick={this.search} className={this.state.cityError || this.state.stateError? 'disabled' : ''} disabled={this.state.validationError}>Search</button>
          </InputGroup>
          <button type="button" onClick={this.getCoordinates}>or Find Near Me</button>
          <div className="error">{this.state.error}</div>
      </SearchWrapper>
    );
  }
}

export default Search;
