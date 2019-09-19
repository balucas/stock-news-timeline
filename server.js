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
     { function: 'TIME_SERIES_INTRADAY',
       interval: '60min',
       symbol: req.body.post,
       apikey: 'M88X3Y65YYJRDM0I' }};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
});

});


app.post('/api/news', (req, res) => {
  var request = require('request');
  var post = req.body.post.split('&');
  console.log((new Date (post[1])).toISOString());
  var options = { method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    qs:
     { q: post[0],
       to: (new Date(post[1])).toISOString(),
       sortBy: 'publishedAt',
       language: 'en',
       apikey: 'f235bf3e59564835ac93d2f349c50c4c' }};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
});


});

app.listen(port, () => console.log(`Listening on port ${port}`));
