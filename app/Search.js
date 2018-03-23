import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import geoIcon from '../public/geolocate.svg';

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    margin: 5px;
  }

  .error {
    color: red;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  button {
    background-color: #40A4DF;
    border: none;
    border-radius: 7px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 14px;
    outline: none;
    padding: 3px 5px;

    svg {
      height: 20px;
      min-height: 20px;
      margin-left: 5px;
      fill: #fff;
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  > input {
    border: none;
    border-bottom: 2px solid black;
    border-radius: 0;
    box-shadow: none;
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

  select {
    font-size: 12px;
  }

  > input:focus ~ label, input:valid ~ label {
    top: -20px;
    font-size: 0.75rem;
    color: #40A4DF;
  }

  &:nth-child(5) {
    display: flex;
    align-items: baseline;

    > div {
      margin-bottom: 5px;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: center;
      > button {
        margin-left: 0;
      }
    }
  }

  button {
    background-color: #40A4DF;
    border-radius: 7px;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    color: #fff;
    font-size: 1rem;
    margin-left: 20px;
    outline: none;
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

  state = {
    address: '',
    city: '',
    proximity: '3',
    state: '',
    error: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    this.validateField(e);
  }

  getCoordinates = () => {
    this.setState({error: ''});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.getSites(location);
      }, this.showNavError, {timeout: 8000});
    }



  }

  getSites = (location) => {
    axios.get('/api/bBox', {
      params: {
        coords: location,
        radius: this.state.proximity
      }
    }).then(results => {
      if (results.data.length) {
        this.props.history.push('/results', { site_list: results.data});
      }
      this.setState({error: 'No sites found in area.\nTry another location or increasing proximity.'});
      
    });
  }

  search = () => {
    this.setState({error: ''});
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

  showNavError = (error) => {
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

  validateField = (e) => {
    let err = `${e.target.name}Error`;
    if (!e.target.value) {
      this.setState({[err]: true});
      return;
    }
    this.setState({[err]: false});

  }

  render() {
    const { cityError, error, proximity, stateError} = this.state;

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
            <span className='error'>{cityError ? 'Required' : ''}</span>
          </InputGroup>
          <InputGroup>
            <input type='text' name="state" onChange={this.handleChange} onBlur={this.validateField} required />
            <label>State</label>
            <span className='error'>{stateError ? 'Required' : ''}</span>
          </InputGroup>
          <InputGroup>
            <div>
              <span>Proximity</span>
              <select name="proximity" value={proximity} onChange={this.handleChange}>
                <option value="1">1 mi</option>
                <option value="2">2 mi</option>
                <option value="3">3 mi</option>
                <option value="5">5 mi</option>
                <option value="10">10 mi</option>
                <option value="20">20 mi</option>
              </select>
            </div>
            <button onClick={this.search} className={cityError || stateError ? 'disabled' : ''} disabled={cityError || stateError}>Search</button>
          </InputGroup>
          <button type="button" onClick={this.getCoordinates}>
            or Find Near Me
              <svg version="1.1" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000">
                <g><path d="M285,607.2h-90.2L116.5,990h767L812,606h-91.5l-24.6,43.8h72.6l61,297H170.7l57.8-298.5h82.2L285,607.2z M502.7,752.9c109.5-145.7,246.5-357.8,246.5-448.7C749.2,173.4,638.6,67,502.7,67c-135.9,0-246.5,106.4-246.5,237.2C256.2,395,393.1,607.1,502.7,752.9 M499.6,122c102.5,0,186,81.7,186,182.2c0,100.5-83.4,182.2-186,182.2c-102.5,0-186-81.7-186-182.2C313.6,203.7,397,122,499.6,122 M502.8,845.9L502.8,845.9L502.8,845.9z M502.7,845.8c0,0-303.3-379.1-303.3-541.6C199.3,141.7,335.1,10,502.7,10C670.2,10,806,141.7,806,304.2C806,466.7,502.7,845.8,502.7,845.8L502.7,845.8L502.7,845.8L502.7,845.8z M499.6,178.9c-71.3,0-129.1,56.1-129.1,125.2c0,69.2,57.8,125.2,129.1,125.2c71.3,0,129.1-56.1,129.1-125.2C628.7,235,570.9,178.9,499.6,178.9L499.6,178.9L499.6,178.9L499.6,178.9z"/></g>
              </svg>
          </button>
          <div className="error">{error}</div>
      </SearchWrapper>
    );
  }
}

export default Search;
