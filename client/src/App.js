import React, { Component } from 'react';

import './App.css';
import TSDailyGraph from './components/TSDailyGraph.js';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    dates: '',

    ticker: 'AMZN'
  };

  componentDidMount() {
    this.callApiTimeSeries()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


  }

  callApiTimeSeries = async () => {
    //TEST
    this.setState({responseToPost: ''})
    const response = await fetch('/api/timeseries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.ticker, type: 'timeseries' }),
    });
    const body = await response.text();
    debugger;
    var tsdata = JSON.parse(body)['Time Series (60min)'];
    var meta = JSON.parse(body)['Meta Data'];
    debugger;
    //raw json processing
    let keys = Object.keys(tsdata);

    var tsarray = [];
    var darray = [];
    var counter = keys.length;

    keys.forEach(currDate => {
      let ts = tsdata[currDate];
      var data = {};

      data.index = counter + currDate;
      counter--;

      data.date = new Date(currDate);
      data.open = ts['1. open'];
      data.high = ts['2. high'];
      data.low = ts['3. low'];
      data.close = ts['4. close'];

      tsarray.push(data);
      darray.push(data.date);
    });

    this.setState({ responseToPost:tsarray.reverse(),
                    dates: darray,
                    meta: meta});
  };
  handleChange = (e) => {
    this.setState({ticker: e.target.value});
    debugger;
  }
render() {
    if(this.state.responseToPost === ''){
      return (
        <div className="App">
          Loading
        </div>
      );
    }else{
      return(
        <div className="App">
          <div className="searchBar" style={searchBarStyle}>
            <form onSubmit={this.callApiTimeSeries.bind(this)}>
              <h2>Ticker: <input type="text" name="ticker" value={this.state.ticker} onChange={this.handleChange}/></h2>
            </form>
          </div>
          <TSDailyGraph data={this.state.responseToPost}
                        dates={this.state.dates}
                        meta={this.state.meta}/>
        </div>
      )
    }
  }
}

var searchBarStyle = {
  position: 'absolute',
  display: 'block',
  top: 120,
  left: '40%',
  zIndex: 1,
}

export default App;
