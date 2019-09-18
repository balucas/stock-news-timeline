import React, { Component } from 'react';

import './App.css';
import TSDailyGraph from './components/TSDailyGraph.js';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


  }

  callApi = async () => {
    //TEST
    const response = await fetch('/api/timeseries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: 'SPY' }),
    });
    const body = await response.text();
    debugger;
    var tsdata = JSON.parse(body)['Monthly Time Series'];

    let keys = Object.keys(tsdata);

    var tsarray = [];
    keys.forEach(currDate => {
      let ts = tsdata[currDate];
      var data = ts;
      data.date = currDate;
      tsarray.push(data);
    });

    this.setState({ responseToPost: JSON.stringify(tsarray.reverse()) });
    //TEST END
  };

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
          <TSDailyGraph data={JSON.parse(this.state.responseToPost)}/>
        </div>
      )
    }
  }
}

export default App;
