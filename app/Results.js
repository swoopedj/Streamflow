import React from 'react';
import SiteList from './SiteList';

class Results extends React.Component {
  render() {
    return (
      <SiteList site_list={this.props.location.state.site_list} />
    );
  }
}

export default Results;