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
    const data = [{val: 1}, {val: 2}, {val: 3}, {val: 4}, {val: 5}];
    // const data = [1,2,3,4,5];
    const w = '100%';
    const h = 500;

    const candle = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 100);

    // svga.selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - 10 * d.val)
    //   .attr("width", 65)
    //   .attr("height", (d, i) => d.val * 10)
    //   .attr("fill", "green")
    //   .attr("id", (d, i) => JSON.stringify(d.val))
      candle.selectAll("rect")
        .data(tsdata)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 5)
        .attr("y", (d, i) => h - 1 * d['1. open'])
        .attr("width", 3)
        .attr("height", (d, i) => d['1. open'] * 1)
        .attr("fill", "green")
        .attr("id", (d, i) => JSON.stringify(i + ': ' + d['date']))


  }

  render(){
    return(
      <div>
      <div id={"#" + this.props.id}></div>
      <p>TSDailyGraph</p>
      </div>
    )
  }
}

export default TSDailyGraph;
