import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { VictoryTooltip, VictoryChart, VictoryTheme, VictoryCandlestick, VictoryAxis } from 'victory';


class TSDailyGraph extends Component {
  state = {
      data: this.props.data,
      dates: this.props.dates,
      meta: this.props.meta,
      max: '',
      min: '',

      selectedDataPoint: '',
      clickedDataPoint: false,

      newsData: []
  };

  constructor(props){
    super(props);
    debugger;
    // this.setState({"data": props.data});
  }

  componentDidMount(){
      const tsdata = this.state.data;
      const max = Math.max.apply(Math, tsdata.map(function(o) { return o.high; }))
      const min = Math.min.apply(Math, tsdata.map(function(o) { return o.low; }))
      var defaultCurr = {};
      defaultCurr.open = '0.00';
      defaultCurr.high = '0.00';
      defaultCurr.low = '0.00';
      defaultCurr.close = '0.00';
      defaultCurr.date = new Date();

      this.setState({ max: max,
                      min: min,
                      selectedDataPoint: defaultCurr})
  }

  updateInfo(event){
    const index = Array.prototype.indexOf.call(event.target.parentElement.parentElement.childNodes, event.target.parentElement)
    const currData = this.state.data[index];
    this.setState({selectedDataPoint:currData});
  }

  onClickDatapoint(event){
    this.setState({clickedDataPoint:true});
    this.callApiNews();
  }


  callApiNews = async () => {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({post: this.state.meta['2. Symbol'] + '&' + this.state.selectedDataPoint.date
                            }),
      });
      const body = await response.text();
      var newsData = JSON.parse(body);
      debugger;

      this.setState({newsData: newsData.articles});
  }

  getCurrDatapointTime(){
    var date = this.state.selectedDataPoint.date;
    return (date.getMonth() + 1) + '/' + date.getDate() + ' - ' + date.getHours() + ':' + date.getMinutes();
  }

  render(){
    return(
      <div>
            <div class="chartContainer" style={containerStyle} id="#">
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 0 }}
                scale={{ x: "linear", y:"linear" }}
                minDomain={{y:this.state.min}}
                maxDomain={{y:this.state.max}}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
                height={220}
              >
                <VictoryAxis
                  tickValues={this.state.index}
                  tickFormat={(t) =>  (new Date(t.substring(1))).getMonth()
                              + '/' + (new Date(t.substring(1))).getDate()
                              + ' - ' + (new Date(t.substring(1))).getHours()
                              + ':' + (new Date(t.substring(1))).getMinutes()}
                  style={{
                    tickLabels: { fontSize: 3,
                                  padding: 3}}}
                  tickCount={9}
                  />
                <VictoryAxis
                  dependentAxis
                  domain={[0,320]}
                  style={{
                    tickLabels: { fontSize: 3,
                                  padding:3}
                  }}/>
                <VictoryCandlestick
                  candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                  candleRatio={0.1}
                  candleWidth={2}
                  data={this.state.data}
                  x = "index"
                  y = "close"

                  // labels={({ datum }) => <p></p>}
                  events={[{
                    target: "data",
                    eventHandlers: {
                      onMouseOver: (event) => {
                        if(this.state.clickedDataPoint === false){
                          this.updateInfo(event);
                        }
                      },

                      onClick: (event) => {
                        this.onClickDatapoint(event);
                      }
                    }
                  }]}
                />
              </VictoryChart>
            </div>
            <div class="infoContainer" style={infoStyle}>
              <h2 class="d" style={headerStyle}>
                {this.state.selectedDataPoint.date ? this.getCurrDatapointTime(): ''}
              </h2>
              <table class="header" style={headerStyle}>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Open:</th>
                  <th>{this.state.selectedDataPoint.open}</th>
                </tr>
                <tr>
                  <th>High:</th>
                  <th>{this.state.selectedDataPoint.high}</th>
                </tr>
                <tr>
                  <th>Low:</th>
                  <th>{this.state.selectedDataPoint.low}</th>
                </tr>
                <tr>
                  <th>Close:</th>
                  <th>{this.state.selectedDataPoint.close}</th>
                </tr>
              </table>
              <div class="newsContainer" style={newsStyle}>
                {this.state.newsData.map(
                    (comp, i) => {
                      return(
                              <div class="news">
                                <h3><a href={comp.url}>{comp.title}</a></h3>
                                <h4 style={{color:'gray'}}>{comp.source.name}</h4>
                                <p>{comp.description}</p>
                              </div>
                            )
                    })}
              </div>

            </div>
      </div>
    )
  }
}

var containerStyle = {
  width: '85%',
  float: 'left'
}

var headerStyle = {
  marginLeft: 15
}

var infoStyle = {
  float: 'right',
  right: 0,
  position: 'absolute',
  display: 'block',
  width: '20%',
  height: '100%',
  textAlign: 'left',
  paddingTop: 150
}

var newsStyle = {
  height: 500,
  marginRight: 40,
  marginTop: 10,
  padding: 10,
  overflow: 'scroll'
}

var h2Style = {
  fontSize: 28
}

export default TSDailyGraph;
