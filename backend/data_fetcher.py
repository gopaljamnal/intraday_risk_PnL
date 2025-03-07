import yfinance as yf
import numpy as np


def fetch_market_data(ticker):
    data = yf.download(ticker, period="1d", interval="15m")
    data = np.round(data, 2)
    prices = data['Close'].values.tolist()

    return {'prices': prices}

