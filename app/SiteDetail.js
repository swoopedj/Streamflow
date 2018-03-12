import React from 'react';

// class CurrentConditions extends React.Component {
//   render() {
//     return (
//       <div className="conditions">
//         <div className="gage_height">
//           <span>Gage Height: </span>
//           {this.props.gage_height} 
//           <span className="data_units"> ft.</span>
//           <span className="date_time">at: {this.props.date_time}</span>
//         </div>
//         <div className="discharge">
//           <span>Discharge: </span>
//           {this.props.discharge}
//           <span className="data_units"> ft<sup>3</sup>/s</span>
//           <span className="date_time">at: {this.props.date_time}</span>
//         </div>
//       </div>
//     );
//   }
// }

class HydroGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphIsOpen: false
    };

    this.toggleGraph = this.toggleGraph.bind(this);
  }


  toggleGraph() {
    this.setState({graphIsOpen: !this.state.graphIsOpen});
  }

  render() {
    return (
      <div>
        <div className="graph_link" >
          <button onClick={this.toggleGraph}>{this.state.graphIsOpen ? 'Hide Hydrograph' : 'Show Hydrograph'}</button>
        </div>
        <div className="graph_wrapper" style={this.state.graphIsOpen ? {display: 'block'} : {display: 'none'}}>
          <img className="graph_img" src={this.props.graph_link} />
        </div>
      </div>
    );
  }
}

class SiteDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streamName: this.props.data.site_name.split(' at ')[0],
    };
  }

  render() {
    return (
        <div className="site_detail">
          <div className="title_bar">
            <span>Site name: {this.props.data.site_name}</span>
            <span className="site_id"><span className="id_label">Site # </span>{this.props.data.site_id}</span>
          </div>
          <div className="conditions">
            <div className="gage_height">
              <span>Gage Height: </span>
              {this.props.data.gage_height} 
              <span className="data_units"> ft.</span>
              <span className="date_time">at: {this.props.data.parameter.time}</span>
            </div>
            <div className="discharge">
              <span>Discharge: </span>
              {this.props.discharge}
              <span className="data_units"> ft<sup>3</sup>/s</span>
              <span className="date_time">at: {this.props.data.parameter.time}</span>
            </div>
          </div>
          <HydroGraph graph_link={this.props.data.gh_graph_link} />
          <a href={this.props.data.siteLink}>View additional info for this site.</a>
          <div onClick={this.props.toggleHandler}>^collapse^</div>
        </div>
    );
  }
}

export default SiteDetail;
