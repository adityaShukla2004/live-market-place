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

import LiveDealFeed from "../pages/LiveDealFeed";
import UnlockMoreBuyers from "../pages/UnlockMoreBuyers";
import BuyerIntentMap from "../pages/BuyerIntentMap";

function  Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className=" bg-slate-50">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              F
            </div>

            <div>
              <h1 className="font-semibold text-slate-900">
               Fun Stop
              </h1>

              
            </div>

          </div>

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-2">

            <NavLink to="/" className={navClass}>
              <Activity size={17} />
              Live Feed
            </NavLink>

            <NavLink
              to="/simulation"
              className={navClass}
            >
              <Sparkles size={17} />
              Simulation
            </NavLink>

            <NavLink
              to="/intent"
              className={navClass}
            >
              <MapPinned size={17} />
              Intent Map
            </NavLink>

          </nav>

          {/* Mobile Button */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-80 border-t border-slate-200"
              : "max-h-0"
          }`}
        >
          <div className="px-5 py-4 bg-white flex flex-col gap-2">

            <NavLink
              to="/"
              className={navClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <Activity size={18} />
              Live Feed
            </NavLink>

            <NavLink
              to="/simulation"
              className={navClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <Sparkles size={18} />
              Simulation
            </NavLink>

            <NavLink
              to="/intent"
              className={navClass}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <MapPinned size={18} />
              Intent Map
            </NavLink>

          </div>
        </div>

      </header>

   
     

    </div>
  );
}

export default Navbar;