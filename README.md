# Intraday Risk and P&L Calculation System

## 📋 Project Overview
This project is an **Intraday Risk and P&L Calculation System** designed to fetch real-time market data, perform risk assessments (like VaR and Greeks), and compute profit and loss (P&L) for financial instruments. It uses open-source data and provides an interactive dashboard for visualization.

## 🛠 Tech Stack
- **Frontend:** React
- **Backend:** Flask (Python)
- **Database:** PostgreSQL, Redis (caching)
- **Processing:** Apache Spark (optional)
- **Data Sources:** Yahoo Finance API, Alpha Vantage, Kaggle Datasets
- **Visualization:** Plotly
- **Deployment:** Docker + AWS EC2

## 📁 Project Structure
```
intraday-risk-pnl/
├── backend/
│   ├── app.py               # Flask API
│   ├── risk_engine.py       # Risk calculations (VaR, Greeks)
│   ├── pnl_engine.py        # P&L calculations
│   ├── data_fetcher.py      # Fetch market data
│   ├── requirements.txt
├── frontend/
│   ├── src/
│       ├── components/
│           ├── Dashboard.js # React dashboard
│       ├── App.js
├── database/
│   ├── schema.sql           # PostgreSQL schema
├── Dockerfile
├── docker-compose.yml
├── README.md
```

## 🚀 Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/intraday-risk-pnl.git
   cd intraday-risk-pnl
   ```
2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Run with Docker:**
   ```bash
   docker-compose up --build
   ```

## 📊 Key Features
- **Market Data Ingestion:** Fetch intraday data using Yahoo Finance API.
- **Risk Calculation:**
   - VaR (Value at Risk) using historical data.
   - Greeks (Delta, Gamma) using the Black-Scholes model.
- **P&L Calculation:** Mark-to-Market (MtM) and P&L Explain.
- **Interactive Dashboard:** Plotly charts in React.

## 📞 API Endpoints
- `/api/market_data/<ticker>`: Fetch market data.
- `/api/risk/<ticker>`: Get risk metrics.
- `/api/pnl/<ticker>`: Calculate P&L.

## 📜 License
Gopal Jamnal, 2025.
