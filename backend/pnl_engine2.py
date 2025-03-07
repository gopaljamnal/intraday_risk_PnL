def calculate_pnl(market_data):
    prices = market_data['prices']
    if len(prices) < 2:
        return {'PnL': 0}

    pnl = round(prices[-1] - prices[0], 2)  # Simple PnL calculation
    return {'PnL': pnl}
