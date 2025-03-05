import numpy as np

def calculate_var(prices, confidence_level=0.95):
    returns = np.diff(prices) / prices[:-1]
    var = np.percentile(returns, 100 * (1 - confidence_level))
    return round(var * 100, 2)

def calculate_greeks(prices):
    # Dummy implementation for Delta and Gamma
    delta = (prices[-1] - prices[0]) / prices[0]
    gamma = delta / 100
    return {'Delta': round(delta, 2), 'Gamma': round(gamma, 2)}
