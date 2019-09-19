import React, { Component } from 'react';

import './App.css';
import TSDailyGraph from './components/TSDailyGraph.js';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    dates: ''
  };

  componentDidMount() {
    this.callApiTimeSeries()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


  }

  callApiTimeSeries = async () => {
    //TEST
    const response = await fetch('/api/timeseries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: 'AMZN', type: 'timeseries' }),
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
    //TEST END
  };

  callApiNews = async () => {
    const response = await fetch('/api/timeseries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: 'BYND', type: 'timeseries' }),
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/timeseries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

render() {
    if(this.state.responseToPost === ''){
      return (
        <div className="App">
          <header className="App-header">
            <p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.post}
                onChange={e => this.setState({ post: e.target.value })}
              />
              <button type="submit">Submit</button>
            </form>
              Edit <code>src/App.js</code> and dont save to reload.
            </p>
          </header>
          <p>{this.state.response}</p>
        </div>
      );
    }else{
      return(
        <div className="App">
          <TSDailyGraph data={this.state.responseToPost}
                        dates={this.state.dates}
                        meta={this.state.meta}/>
        </div>
      )
    }
  }
}

export default App;
