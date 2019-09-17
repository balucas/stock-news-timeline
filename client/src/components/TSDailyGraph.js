import React, { Component } from 'react';
import * as d3 from "d3";


class TSDailyGraph extends Component {
  state = {
      data: this.props.data,
  };

  constructor(props){
    super(props);
    debugger;
    // this.setState({"data": props.data});
  }

  componentDidMount(){
    this.drawChart();
  }

  drawChart(){
    const tsdata = this.state.data;

    const max = Math.max.apply(Math, tsdata.map(function(o) { return o['2. high']; }))
    const min = Math.min.apply(Math, tsdata.map(function(o) { return o['3. low']; }))

    const w = '100%';
    const h = 600;
    const vertScale = h/max;
    const horiScale = 6;
    const leftMargin = 50;

    const candle = d3.select(".chartContainer")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("margin-left", 100);

    candle.selectAll("rect")
        .data(tsdata)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (horiScale + 1) + leftMargin)
        .attr("y", (d, i) => h - vertScale * d3.max([d['1. open'], d['4. close']]))
        .attr("width", horiScale)
        .attr("height", (d, i) => vertScale * Math.abs(d['1. open'] - d['4. close']))
        .attr("fill", (d, i) => d['1. open'] > d['4. close'] ? "red" : "green")
        .attr("id", (d, i) => d3.max([d['1. open'], d['4. close']]));

    var yScale = d3.scaleLinear()
                    .domain([min, max])
                    .range([h - vertScale * min, h - vertScale * max]);

    var yAxis = d3.axisLeft()
                    .scale(yScale);

    candle.append("g")
            .attr("transform", "translate("+leftMargin+", 0)")
            .attr("color", "white")
            .call(yAxis);
  }

  render(){
    return(
      <div>
        <div class="chartContainer" style={containerStyle} id="#"></div>
        <p>TSDailyGrapherino</p>
      </div>
    )
  }
}

var containerStyle = {
    border: "solid 1px",
    margin: "10px 10px 10px 10px",
    overflow: "visible",
    backgroundColor: "#2e394a"
}

export default TSDailyGraph;
