import yfinance as yf

def get_market_data(symbol):
    ticker = yf.Ticker(symbol)
    hist = ticker.history(period='1d', interval='5m')  # Fetch intraday data
    prices = hist['Close'].tolist()
    return {'prices': prices, 'symbol': symbol}
