import numpy as np
from flask import jsonify


def calculate_var(prices, confidence_level=0.95):
    returns = np.diff(prices, axis=0) / prices[:-1]
    # print('returns', returns)
    var = np.percentile(returns, 100 * (1 - confidence_level))
    var = np.round(var, 2)
    var = var.tolist()
    return var

def calculate_greeks(prices):
    # Dummy implementation for Delta and Gamma
    delta = (np.array(prices[-1]) - np.array(prices[0])) / prices[0]
    gamma = delta / 100
    # delta = np.round(delta, 2)
    gamma = np.round(gamma, 2)
    gamma = gamma.tolist()
    return gamma

