import React from 'react';
import { shape, string } from 'prop-types';

class SiteName extends React.Component {
  render() {
    return (
      <div className="site_name">
        <span>{this.props.site_name}</span>
      </div>
    );
  }
}

SiteName.propTypes = {
  site_name: string.isRequired
};

class GageHeight extends React.Component {
  render() {
    return (
        <span className="g_height">{this.props.gage_height}</span>
    );
  }
}

GageHeight.propTypes = {
  gage_height: string.isRequired
};

class Distance extends React.Component {
  render () {
    return (
      <div className='site_distance'>
        <span>({this.props.distance} mi)</span>
      </div>
    );
  }
}

Distance.propTypes = {
  distance: string.isRequired
};

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

SiteCard.propTypes = {
  data: shape({
    detail_link: string.isRequired,
    distance: string.isRequired,
    gage_height: string.isRequired,
    site_name: string.isRequired
  })
};

export default SiteCard;
