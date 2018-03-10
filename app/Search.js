import React from 'react';
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
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 2rem;

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
      error: ''
    };

    this.findSites = this.findSites.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  findSites () {
    //use browser geolocation to get lat and long
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  search () {
    // pass form data to API
    // if results are returned, route to /results
    // if no results returned, display error
    // error should suggest entering a county instead of city?
    axios.get('/api/address', {
      params: {
        address: `${this.state.address},${this.state.city},${this.state.state}`,
      }
    }).then(response => {
      console.log('response from Google: ', response);
      axios.get('/api/bBox', {
        params: {
          coords: response.data.results[0].geometry.location,
          radius: this.state.proximity
        }
      }).then(results => {
        console.log('SiteList ===> ', results.data);
      });
    }).catch(err => {
      console.log('err => ', err);
    });
  }

  render() {
    return (
      <SearchWrapper>
        <h1>Streamflow Project</h1>
          <InputGroup>
            <input type='text' name="address" onChange={this.handleChange} required />
            <label>Address</label>
          </InputGroup>
          <InputGroup>
            <input type='text' name="city" onChange={this.handleChange} required />
            <label>City</label>
          </InputGroup>
          <InputGroup>
            <input type='text' name="state" onChange={this.handleChange} required />
            <label>State</label>
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
            <button onClick={this.search}>Search</button>
          </InputGroup>
          <span>or</span>
          <button type="button" onClick={this.findSites}>or Find Near Me</button>
          <span>(uses browser geolocation)</span>
          <div id="search_error"></div>
      </SearchWrapper>
    );
  }
}

export default Search;
