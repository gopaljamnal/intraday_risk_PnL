import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const availableStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];  // Extendable stock list

const Dashboard = () => {
    const [selectedStocks, setSelectedStocks] = useState([]);  // Track selected stocks
    const [marketData, setMarketData] = useState({});
    const [pnlData, setPnlData] = useState({});
    const [varData, setVarData] = useState({});
    const svgRef = useRef();

    // Handle stock selection
    const handleStockChange = (event) => {
        const { value, checked } = event.target;
        setSelectedStocks(prev =>
            checked ? [...prev, value] : prev.filter(stock => stock !== value)
        );
    };

    // Fetch data for selected stocks
    const fetchData = async () => {
        if (selectedStocks.length === 0) return;

        try {
            const [marketRes, pnlRes, varRes] = await Promise.all([
                fetch(`http://localhost:5000/api/market_data?symbols=${selectedStocks.join(',')}`).then(res => res.json()),
                fetch(`http://localhost:5000/api/pnl?symbols=${selectedStocks.join(',')}`).then(res => res.json()),
                fetch(`http://localhost:5000/api/risk?symbols=${selectedStocks.join(',')}`).then(res => res.json())
            ]);
            setMarketData(marketRes);
            setPnlData(pnlRes);
            setVarData(varRes);
        } catch (err) {
            console.error("API Fetch Error:", err);
        }
        console.log("Selected Stocks:", selectedStocks);
        console.log("Fetched Prices:", marketData);
        console.log("Fetched PnL Data:", pnlData);
        console.log("Fetched VaR Data:", varData);

    };

    // Render chart when market data changes
    useEffect(() => {
        if (Object.keys(marketData).length > 0) renderChart();
    }, [marketData]);

    // Render multi-line chart with D3.js
    const renderChart = () => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 928, height = 600, margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
        const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x((_, i) => xScale(i))
            .y(d => yScale(d));

        const allPrices = Object.values(marketData).flatMap(stock => stock.prices);
        xScale.domain([0, Math.max(...Object.values(marketData).map(stock => stock.prices.length)) - 1]);
        yScale.domain([0, d3.max(allPrices) || 1]).nice();

        svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale));
        svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(yScale));

        Object.entries(marketData).forEach(([symbol, data]) => {
            svg.append("path")
                .datum(data.prices)
                .attr("fill", "none")
                .attr("stroke", getColor(symbol))
                .attr("stroke-width", 1.5)
                .attr("d", line);
        });
    };

    const getColor = (symbol) => {
        const colors = { 'AAPL': 'steelblue', 'MSFT': 'green', 'GOOGL': 'orange', 'AMZN': 'purple', 'TSLA': 'red' };
        return colors[symbol] || 'grey';
    };

    return (
        <div>
            <h2>Intraday Risk and P&L Dashboard</h2>

            {/* Stock selection section */}
            <div>
                <h4>Select Stocks:</h4>
                {availableStocks.map(stock => (
                    <label key={stock} style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            value={stock}
                            onChange={handleStockChange}
                            checked={selectedStocks.includes(stock)}
                        />
                        {stock}
                    </label>
                ))}
                <button onClick={fetchData} disabled={selectedStocks.length === 0}>
                    Fetch Data
                </button>
            </div>

            {/* Display PnL and VaR for selected stocks */}
            {selectedStocks.map(symbol => (
                <div key={symbol}>
                    <h3>{symbol}</h3>
                    <p>PnL: {pnlData[symbol]?.PnL || 0}</p>
                    <p>VaR: {varData[symbol]?.VaR || 0}</p>
                </div>
            ))}

            {/* Line chart */}
            <svg ref={svgRef} width="928" height="600" style={{ maxWidth: "100%" }} />
        </div>
    );
};

export default Dashboard;
