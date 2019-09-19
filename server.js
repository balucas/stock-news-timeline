const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/timeseries', (req, res) => {
  var request = require('request');
  var options = { method: 'GET',
    url: 'https://www.alphavantage.co/query',
    qs:
     { function: 'TIME_SERIES_DAILY',
       symbol: req.body.post,
       apikey: 'M88X3Y65YYJRDM0I' }};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
});


});

app.listen(port, () => console.log(`Listening on port ${port}`));
