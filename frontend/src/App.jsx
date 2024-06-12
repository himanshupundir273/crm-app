import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log(response);
    setIsAuthenticated(true);
  };

  const handleLoginFailure = (response) => {
    console.error(response);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
