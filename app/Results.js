import React from 'react';
import { Link } from 'react-router-dom';
import SiteList from './SiteList';

class Results extends React.Component {
  render() {
    return (
      <div className="results-wrapper">
        <Link to="/"><h1>Streamflow</h1></Link>
        <SiteList site_list={this.props.location.state.site_list} />
        <Link to="/"><span>back to search</span></Link>
      </div>
    );
  }
}

export default Results;