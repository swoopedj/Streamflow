import React from 'react';

class SiteName extends React.Component {
  render() {
    return (
      <div className="site_name">
        <span>{this.props.site_name}</span>
      </div>
    );
  }
}

class GageHeight extends React.Component {
  render() {
    return (
        <span className="g_height">{this.props.gage_height}</span>
    );
  }
}

class Distance extends React.Component {
  render () {
    return (
      <div className='site_distance'>
        <span>({this.props.distance} mi)</span>
      </div>
    );
  }
}

class SiteCard extends React.Component {
  render() {
    return (
      <a href={this.props.data.detail_link}>
        <div className='site_card'>
          <SiteName site_name={this.props.data.site_name} />
          <Distance distance={this.props.data.distance} />
          <GageHeight gage_height={this.props.data.gage_height} />
        </div>
      </a>
    );
  }
}

export default SiteCard;
