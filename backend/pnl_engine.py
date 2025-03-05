def calculate_mtm(prices):
    mtm = prices[-1] - prices[0]
    return round(mtm, 2)
