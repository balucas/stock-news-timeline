import React, { Component } from 'react';
import * as d3 from "d3";
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryCandlestick, VictoryAxis } from 'victory';


class TSDailyGraph extends Component {
  state = {
      data: this.props.data,
      dates: this.props.dates,
      max: '',
      min: ''
  };

  constructor(props){
    super(props);
    debugger;
    // this.setState({"data": props.data});
  }

  componentDidMount(){
    this.drawChart();
      const tsdata = this.state.data;
      const max = Math.max.apply(Math, tsdata.map(function(o) { return o.high; }))
      const min = Math.min.apply(Math, tsdata.map(function(o) { return o.low; }))

      this.setState({ max: max,
                      min: min})
  }

  drawChart(){
    const tsdata = this.state.data;

    // const max = Math.max.apply(Math, tsdata.map(function(o) { return o.high; }))
    // const min = Math.min.apply(Math, tsdata.map(function(o) { return o.low; }))
    //
    // const w = '100%';
    // const h = 600;
    // const vertScale = h/max;
    // const horiScale = 6;
    // const leftMargin = 50;
    //
    // const candle = d3.select(".chartContainer")
    //   .append("svg")
    //   .attr("width", w)
    //   .attr("height", h)
    //   .attr("margin-left", 100);
    //
    // candle.selectAll("rect")
    //     .data(tsdata)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * (horiScale + 1) + leftMargin)
    //     .attr("y", (d, i) => h - vertScale * d3.max([d.open, d.close]))
    //     .attr("width", horiScale)
    //     .attr("height", (d, i) => vertScale * Math.abs(d.open - d.close))
    //     .attr("fill", (d, i) => d.open > d.close ? "red" : "green")
    //     .attr("id", (d, i) => d3.max([d.open, d.close]));
    //
    // var yScale = d3.scaleLinear()
    //                 .domain([min, max])
    //                 .range([h - vertScale * min, h - vertScale * max]);
    //
    // var yAxis = d3.axisLeft()
    //                 .scale(yScale);
    //
    // candle.append("g")
    //         .attr("transform", "translate("+leftMargin+", 0)")
    //         .attr("color", "white")
    //         .call(yAxis);
  }

  render(){
    return(
      <div>
        <div class="chartContainer" style={containerStyle} id="#">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 25 }}
            scale={{ x: "time", y:"linear" }}
            minDomain={{y:this.state.min}}
            maxDomain={{y:this.state.max}}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            height={200}
          >
            <VictoryAxis
              tickValues={this.state.dates}
              tickFormat={(t) => (t.getMonth() + 1) + '/' + t.getDate()}
              style={{
                tickLabels: { fontSize: 4,
                              padding: 3}}}
              tickCount={10}
              />
            <VictoryAxis
              dependentAxis
              domain={[0,320]}
              style={{
                tickLabels: { fontSize: 4,
                              padding:3}
              }}/>
            <VictoryCandlestick
              candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
              candleRatio={0.1}
              candleWidth={1}
              data={this.state.data}
              x = "date"
              y = "close"
            />
          </VictoryChart>
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
