import logo from './logo.svg';
import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";
function App() {
  return (
      <div className="App">
          <main>
              {/*<Dashboard/> /!* Render Dashboard on the landing page *!/*/}
              <Dashboard2/>
          </main>
      </div>
  );
}

export default App;
