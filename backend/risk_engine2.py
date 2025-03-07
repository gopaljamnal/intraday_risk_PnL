import numpy as np

def calculate_var(market_data, confidence_level=0.95):
    prices = market_data['prices']
    if len(prices) < 2:
        return {'VaR': 0}

    returns = np.diff(prices) / prices[:-1]
    var = round(np.percentile(returns, (1 - confidence_level) * 100) * prices[-1], 2)
    return {'VaR': var}
