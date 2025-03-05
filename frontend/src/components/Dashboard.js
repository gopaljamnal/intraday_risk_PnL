import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Dashboard = () => {
    const [prices, setPrices] = useState([]);
    const [varData, setVarData] = useState(0);

    useEffect(() => {
        fetch('/api/market_data/AAPL')
            .then(res => res.json())
            .then(data => setPrices(data.prices));

        fetch('/api/risk/AAPL')
            .then(res => res.json())
            .then(data => setVarData(data.VaR));
    }, []);

    return (
        <div>
            <h2>Intraday Risk and P&L Dashboard</h2>
            <h3>Value at Risk (VaR): {varData}%</h3>
            <Plot
                data={[
                    { x: [...Array(prices.length).keys()], y: prices, type: 'scatter', mode: 'lines+markers', marker: { color: 'blue' } },
                ]}
                layout={{ title: 'Price Trend' }}
            />
        </div>
    );
};

export default Dashboard;
