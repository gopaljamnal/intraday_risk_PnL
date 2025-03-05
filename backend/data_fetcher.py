import yfinance as yf


def fetch_market_data(ticker):
    data = yf.download(ticker, period="5d", interval="15m")
    prices = data['Close']


    return {'prices': prices}

print(fetch_market_data('AAPL'))