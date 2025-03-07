import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Dashboard = () => {
    const [marketData, setMarketData] = useState([]);
    const [varData, setVarData] = useState(0);
    const svgRef = useRef();  // Reference for the SVG element

    useEffect(() => {
        // Fetch data for prices and VaR
        Promise.all([
            fetch('http://localhost:5000/api/market_data/AAPL').then(res => res.json()),
            fetch('http://localhost:5000/api/risk/AAPL').then(res => res.json())
        ])
        .then(([marketResponse, riskResponse]) => {
            setMarketData(marketResponse.prices || []);
            setVarData(riskResponse.VaR || 0);
        })
        .catch(err => console.error("API Fetch Error:", err));
    }, []);

    useEffect(() => {
        if (marketData.length > 0) {
            renderChart();
        }
    }, [marketData]);

    // Function to render D3.js chart
    const renderChart = () => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();  // Clear previous content

        // Chart dimensions
        const width = 928;
        const height = 600;
        const margin = { top: 20, right: 20, bottom: 30, left: 30 };

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, marketData.length - 1])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(marketData, d => d) || 1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Axis
        const xAxis = d3.axisBottom(xScale).ticks(10);
        const yAxis = d3.axisLeft(yScale);

        // Append axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove());

        // Line generator
        const line = d3.line()
            .x((_, i) => xScale(i))
            .y(d => yScale(d));

        // Append line path
        svg.append("path")
            .datum(marketData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    };

    return (
        <div>
            <h2>Intraday Risk and P&L Dashboard</h2>
            <p>VaR: {varData}</p>
            <svg ref={svgRef} width="928" height="600" style={{ maxWidth: "100%" }} />
        </div>
    );
};

export default Dashboard;
