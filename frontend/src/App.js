import logo from './logo.svg';
import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard";
function App() {
  return (
      <div className="App">
          <main>
              <Dashboard/> {/* Render Dashboard on the landing page */}
          </main>
      </div>
  );
}

export default App;
