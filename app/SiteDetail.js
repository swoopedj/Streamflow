import React from 'react';

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
        <div className={'graph_wrapper ' + (this.state.graphIsOpen ? 'graph_open' : '')}>
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
      streamName: this.props.streamName,
      discharge: this.props.data.discharge || 'Unavailable',
      gageHeight: this.props.data.gage_height || 'Unavailable',
    };
  }

  render() {
    return (
        <div className="site_detail">
          <div className="title_bar">
            <div className="title_info">
              <span>{this.props.data.site_name}</span>
              <span>{this.props.data.parameter.time}</span>
            </div>
            <span className="site_id"><span className="id_label">USGS Site # </span>{this.props.data.site_id}</span>
          </div>
          <div className="conditions">
            <div className="gage_height">
              <span className="param_label">Gage Height: </span>
              {this.state.gageHeight + (this.props.data.gage_height ? ' ft.' : '')} 
            </div>
            <div className="discharge">
              <span className="param_label">Discharge: </span>
              {this.state.discharge + (this.props.data.discharge ? ' ft.'+ '\u00B3' + '/s' : '')}
            </div>
          </div>
          <div className="detail_footer">
            <HydroGraph graph_link={this.props.data.q_graph_link} />
            <a href={this.props.data.infoLink} target="blank">View additional info for this site.</a>
          </div>
          <div className="close" onClick={this.props.toggleHandler}>CLOSE</div>
        </div>
    );
  }
}

export default SiteDetail;
