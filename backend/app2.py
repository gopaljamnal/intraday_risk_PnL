from flask import Flask, request, jsonify
from data_fetcher2 import get_market_data
from pnl_engine2 import calculate_pnl
from risk_engine2 import calculate_var
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# API to get market data for multiple stocks
@app.route('/api/market_data', methods=['GET'])
def get_market_data_api():
    symbols = request.args.getlist('symbols')  # Accept multiple symbols as query params
    data = {symbol: get_market_data(symbol) for symbol in symbols}
    return jsonify(data)

# API to get PnL for multiple stocks
@app.route('/api/pnl', methods=['GET'])
def get_pnl_api():
    symbols = request.args.getlist('symbols')
    data = {symbol: calculate_pnl(get_market_data(symbol)) for symbol in symbols}
    return jsonify(data)

# API to get risk (VaR) for multiple stocks
@app.route('/api/risk', methods=['GET'])
def get_risk_api():
    symbols = request.args.getlist('symbols')
    data = {symbol: calculate_var(get_market_data(symbol)) for symbol in symbols}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
