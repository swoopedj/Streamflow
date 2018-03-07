import React from 'react';
import { shape, string } from 'prop-types';

class TitleBar extends React.Component {
  render() {
    return (
      <div className="title_bar">
        <span>{this.props.site_name}</span>
        <span className="site_id"><span className="id_label">Site No. </span>{this.props.site_id}</span>
      </div>
    );
  }
}

TitleBar.propTypes = {
  site_id : string.isRequired,
  site_name: string.isRequired
};

class CurrentConditions extends React.Component {
  render() {
    return (
      <div className="conditions">
        <div className="gage_height">
          <span>Gage Height: </span>
          {this.props.gage_height} 
          <span className="data_units"> ft.</span>
          <span className="date_time">at: {this.props.date_time}</span>
        </div>
        <div className="discharge">
          <span>Discharge: </span>
          {this.props.discharge}
          <span className="data_units"> ft<sup>3</sup>/s</span>
          <span className="date_time">at: {this.props.date_time}</span>
        </div>
      </div>
    );
  }
}

CurrentConditions.propTypes = {
  date_time: string.isRequired,
  discharge: string,
  gage_height: string,
};

class SiteInfo extends React.Component {
  render() {
    return (
      <a href="">View additional info for this site.</a>
    );
  }
}

class HydroGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphIsOpen: false
    };
  }


  toggleGraph() {
    this.setState({graphIsOpen: !this.state.graphIsOpen});
  }

  render() {
    return (
      <div>
        <div className="graph_link" >
          <a onClick={this.toggleGraph.bind(this)}>{this.state.graphIsOpen ? 'Hide Hydrograph' : 'Show Hydrograph'}</a>
        </div>
        <div className="graph_wrapper" style={this.state.graphIsOpen ? {display: 'block'} : {display: 'none'}}>
          <img className="graph_img" src={this.props.graph_link} />
        </div>
      </div>
    );
  }
}

HydroGraph.propTypes = {
  graph_link: string
};




class SiteDetail extends React.Component {
  render() {
    return (
        <div className="site_detail">
          <TitleBar site_name={this.props.data.site_name} site_id={this.props.data.site_id} />
          <CurrentConditions 
            gage_height={this.props.data.gage_height}
            discharge={this.props.data.discharge}
            date_time={this.props.data.date_time} />
          <SiteInfo lat={this.props.data.latitude} long={this.props.data.longitude} />
          <HydroGraph graph_link={this.props.data.gh_graph_link} />
        </div>
    );
  }
}

SiteDetail.propTypes = {
  data: shape({
    site_name: string.isRequired,
    date_time: string.isRequired,
    discharge: string,
    gage_height: string,
    gh_graph_link: string,
    latitude: string,
    longitude: string
  }).isRequired
};

export default SiteDetail;
