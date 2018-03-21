import React from 'react';

const HydroGraph = (props) => {
  return (
    <div>
      <div className="graph_link" >
        <button onClick={props.toggleGraph}>{props.graphIsOpen ? 'Hide Hydrograph' : 'Show Hydrograph'}</button>
      </div>
      <div className={'graph_wrapper ' + (props.graphIsOpen ? 'graph_open' : '')}>
        <img className="graph_img" src={props.graph_link} />
      </div>
    </div>
  );
}

class SiteDetail extends React.Component {

  state = {
    graphIsOpen: false,
    streamName: this.props.streamName,
    _q: this.props.data.discharge || 'Unavailable',
    _gh: this.props.data.gage_height || 'Unavailable',
  }

  toggleGraph = () => {
    this.setState({graphIsOpen: !this.state.graphIsOpen});
  }

  render() {
    const { discharge, gage_height, gh_graph_link, infoLink, parameter, q_graph_link, site_detail, site_id, site_name } = this.props.data;
    const { _q, _gh, graphIsOpen, streamName } = this.state;
    return (
        <div className="site_detail">
          <div className="title_bar">
            <div className="title_info">
              <span>{site_name}</span>
              <span>{parameter.time}</span>
            </div>
            <span className="site_id"><span className="id_label">USGS Site # </span>{site_id}</span>
          </div>
          <div className="conditions">
            <div className="gage_height">
              <span className="param_label">Gage Height: </span>
              {_gh + (gage_height ? ' ft.' : '')} 
            </div>
            <div className="discharge">
              <span className="param_label">Discharge: </span>
              {_q + (discharge ? ' ft.'+ '\u00B3' + '/s' : '')}
            </div>
          </div>
          <div className="detail_footer">
            <HydroGraph graph_link={q_graph_link || gh_graph_link} toggleGraph={this.toggleGraph} graphIsOpen={graphIsOpen}/>
            <a href={infoLink} target="blank">View additional info for this site.</a>
          </div>
          <div className="close" onClick={this.props.toggleHandler}>CLOSE</div>
        </div>
    );
  }
}

export default SiteDetail;
