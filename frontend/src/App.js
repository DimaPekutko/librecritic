import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CatalogPage from "./components/CatalogPage/CatalogPage";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <div className="App container">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />            
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
