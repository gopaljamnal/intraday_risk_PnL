import logo from './logo.svg';
import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard";
function App() {
  return (
      <div className="App">
          <header className="App-header">
              <h1>Welcome to Intraday Risk and P&L Calculation System</h1>
          </header>
          <main>
              <Dashboard/> {/* Render Dashboard on the landing page */}
          </main>
      </div>
  );
}

export default App;
