import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { VictoryTooltip, VictoryChart, VictoryTheme, VictoryCandlestick, VictoryAxis } from 'victory';


class TSDailyGraph extends Component {
  state = {
      data: this.props.data,
      dates: this.props.dates,
      max: '',
      min: '',

      selectedDataPoint: '',
      clickedDataPoint: ''
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

  renderTooltip(event){
    const index = Array.prototype.indexOf.call(event.target.parentElement.parentElement.childNodes, event.target.parentElement)
    const currData = this.state.data[index];
    this.setState({selectedDataPoint:currData});

    debugger;
  }

  onClickDatapoint(event){

  }

  getCurrDatapointTime(){
    var date = this.state.selectedDataPoint.date;
    return date.getMonth() + '/' + date.getDate() + ' - ' + date.getHours() + ':' + date.getMinutes();
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
                        if(this.state.clickedDataPoint === ''){
                          this.renderTooltip(event);
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
              <h1 class="d">
                {this.state.selectedDataPoint.date ? this.getCurrDatapointTime(): ''}
              </h1>
              <h2 class="o" style={h2Style}>
                {'Open: ' + this.state.selectedDataPoint.open}
              </h2>
              <h2 class="h" style={h2Style}>
                {'High: ' + this.state.selectedDataPoint.high}
              </h2>
              <h2 class="l" style={h2Style}>
                {'Low: ' + this.state.selectedDataPoint.low}
              </h2>
              <h2 class="c" style={h2Style}>
                {'Close: ' + this.state.selectedDataPoint.close}
              </h2>

              <div class="newsContainer" style={newsStyle}>

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
  borderStyle: 'solid'
}

var h2Style = {
  fontSize: 28
}

export default TSDailyGraph;
