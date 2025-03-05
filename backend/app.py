from flask import Flask, jsonify, request
from data_fetcher import fetch_market_data
from risk_engine import calculate_var, calculate_greeks
from pnl_engine import calculate_mtm

app = Flask(__name__)

@app.route('/api/market_data/<ticker>', methods=['GET'])
def market_data(ticker):
    data = fetch_market_data(ticker)
    return jsonify(data)

@app.route('/api/risk/<ticker>', methods=['GET'])
def risk(ticker):
    data = fetch_market_data(ticker)
    var = calculate_var(data['prices'])
    greeks = calculate_greeks(data['prices'])
    return jsonify({'VaR': var, 'Greeks': greeks})

@app.route('/api/pnl/<ticker>', methods=['GET'])
def pnl(ticker):
    data = fetch_market_data(ticker)
    mtm = calculate_mtm(data['prices'])
    return jsonify({'MtM': mtm})

if __name__ == '__main__':
    app.run(debug=True)
