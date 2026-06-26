import { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import {
  Activity,
  Sparkles,
  MapPinned,
  Menu,
  X,
} from "lucide-react";

import LiveDealFeed from "./pages/LiveDealFeed";
import UnlockMoreBuyers from "./pages/UnlockMoreBuyers";
import BuyerIntentMap from "./pages/BuyerIntentMap";
import Navbar from "./components/Navbar";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

       <Navbar/>
      {/* Pages */}

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        <Routes>

          <Route
            path="/"
            element={<LiveDealFeed />}
          />

          <Route
            path="/simulation"
            element={<UnlockMoreBuyers />}
          />

          <Route
            path="/intent"
            element={<BuyerIntentMap />}
          />

        </Routes>

      </main>

    </div>
  );
}

export default App;