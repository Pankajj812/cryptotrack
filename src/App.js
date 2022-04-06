import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WatchList from "./components/WatchList";
import AllCoins from "./pages/AllCoins";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="rootpage">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/allcoins" element={<AllCoins />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
