# Stock Data & News Timeline

![alt text](https://raw.githubusercontent.com/balucas/carbon/master/sample.png)

A stock data/news application that displays historical company news. Useful for prospective investors to look at how company news affects its stock movement. Built with Node, Express, & React.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing npm packages

```
npm install
```

And repeat in the 'client' folder


### Running

To run simply:

```
yarn dev
```

Stock ticker default is 'AMZN', to change simply edit and press enter. Click on candlestick markers to retrieve news articles from that time.

Ideally, the range of the time series data would be one year. But due to NewsAPI limitations, 30 days prior is the max range I could get with a free API key.

## Acknowledgments

* alphavantage.co
* NewsAPI.org
