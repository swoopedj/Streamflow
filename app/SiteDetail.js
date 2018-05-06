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
    graph_link: '',
  }

  toggleGraph = () => {
    this.setState({graphIsOpen: !this.state.graphIsOpen});
  }

  mapParams = () => {
    const site_params = this.props.data.parameterArray.map(param => {
      return (
        <div className="param-wrapper" key={param.code}>
          <span className="descriptor">{param.label}</span>
          {`${param.value} ${param.param_unit}`} 
        </div>
      )
    });
    return site_params;
  }

  mapStats = () => {
    console.log('this.props.stats => ', this.props.stats)
    const site_stats = Object.keys(this.props.stats).map(param => {
      return (
        <div className="stats">Stats will go here maybe {this.props.stats[param].mean_va}</div>)
    })
  }

  render() {
    const { infoLink, parameter, site_detail, site_id, site_name } = this.props.data;
    const { graphIsOpen, streamName } = this.state;

    return (
        <div className="site_detail">
          <div className="title_bar">
            <div className="title_info">
              <span>{site_name}</span>
              <span>{parameter.time}</span>
            </div>
            <span className="site_id">
              <span className="id_label">USGS Site # </span>
              {site_id}
            </span>
          </div>
          <div className="conditions">
            {this.mapParams()}
          </div>
          <div className="stats">
            {this.props.stats ? this.mapStats() : null}
          </div>
          <div className="detail_footer">
            <HydroGraph graph_link={parameter.graph_link} toggleGraph={this.toggleGraph} graphIsOpen={graphIsOpen}/>
            <a href={infoLink} target="blank">View additional info for this site.</a>
          </div>
          <div className="close" onClick={this.props.toggleHandler}>CLOSE</div>
        </div>
    );
  }
}

export default SiteDetail;
