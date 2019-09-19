import React, { Component } from 'react';
import { VictoryTooltip, VictoryChart, VictoryTheme, VictoryCandlestick, VictoryAxis } from 'victory';


class TSDailyGraph extends Component {
  state = {
      data: this.props.data,
      dates: this.props.dates,
      max: '',
      min: '',

      selectedDataPoint: ''
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

      this.setState({ max: max,
                      min: min})
  }

  renderTooltip(event){
    const index = Array.prototype.indexOf.call(event.target.parentElement.parentElement.childNodes, event.target.parentElement)
    const currData = this.state.data[index];
    this.setState({selectedDataPoint:currData});

    debugger;
  }

  render(){
    return(
      <div>
        <div class="chartContainer" style={containerStyle} id="#">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 25 }}
            scale={{ x: "linear", y:"linear" }}
            minDomain={{y:this.state.min}}
            maxDomain={{y:this.state.max}}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            height={200}
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
              candleWidth={1}
              data={this.state.data}
              x = "index"
              y = "close"

              // labels={({ datum }) => <p></p>}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: (event) => {
                    this.renderTooltip(event);
                  }
                }
              }]}
            />
          </VictoryChart>
        </div>
        <div class="infoContainer">
        </div>
      </div>
    )
  }
}

var containerStyle = {
    // padding: "20px 20px 20px 20px",
    margin: "10px 10px 10px 10px",
    overflow: "visible",
    // backgroundColor: "#2e394a"
}

export default TSDailyGraph;
