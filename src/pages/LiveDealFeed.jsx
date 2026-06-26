import { useEffect, useState } from "react";

import usePolling from "../hooks/usePolling";

import DealHeader from "../components/feed/DealHeader";
import FeedItem from "../components/feed/FeedItem";
import TerminalState from "../components/feed/TerminalState";

import { mockServer } from "../api/server";


export default function LiveDealFeed() {
  const [product, setProduct] = useState(null);
  const [feedEvents, setFeedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  const loadProgress = async () => {
    const res = await mockServer.getNextTierProgress();
    setProgress(res.data);
  };

  const loadData = async () => {
    try {
      const productRes = await mockServer.getProduct(1);
      const statusRes = await mockServer.getDealStatus(1);

      setProduct(productRes.data);
      setFeedEvents(statusRes.data.feedEvents);
      setError(null);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  usePolling(loadProgress, 3000);

  useEffect(() => {
    loadData();
  }, []);

  usePolling(loadData, 3000);

  const [joining, setJoining] = useState(false);
  const [slashing, setSlashing] = useState(false);

  const handleJoinDeal = async () => {
    try {
      setJoining(true);

      const res = await mockServer.joinDeal({
        buyerName: `Buyer ${Date.now()}`,
      });

      setProduct((prev) => ({
        ...prev,
        participants: res.data.participants,
        currentPrice: res.data.currentPrice,
      }));

      setFeedEvents((prev) => [res.data.event, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setJoining(false);
    }
  };

  const handleSlashPrice = async () => {
    try {
      setSlashing(true);

      const res = await mockServer.slashPrice();

      setFeedEvents((prev) => [res.data.event, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setSlashing(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#0B3D2E]/15 border-t-[#0B3D2E] rounded-full animate-spin" />
          <p className="mt-5 text-[15px] tracking-wide text-[#15201B]/50 font-medium uppercase">
            Loading live deal…
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
        <div className="border-2 border-[#E13838] bg-[#E13838]/5 px-8 py-6 text-[#E13838] font-semibold uppercase tracking-wide">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen  text-[#15201B] font-sans">
      <div className="max-w-6xl mx-auto  lg:px-6 py-8">

        {/* ===== Scoreboard Header ===== */}
        <div className="bg-slate-900 rounded-[7px] overflow-hidden shadow-[0_8px_30px_-10px_rgba(11,61,46,0.5)]">
          <div className="flex items-center justify-between px-6 sm:px-8 py-3 border-b border-white/10 bg-black/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E13838] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E13838]" />
              </span>
              <span className="text-[#F7F5F0] text-xs font-bold uppercase tracking-[0.2em]">
                Live Group Buy
              </span>
            </div>
            <span className="text-[#F7F5F0]/50 text-xs font-mono uppercase tracking-widest">
              Deal #001
            </span>
          </div>

          <div className="px-6 sm:px-8 pt-7 pb-8">
            <p className="text-[#F5A623] text-xs font-bold uppercase tracking-[0.25em] mb-2">
              On the board now
            </p>
            <h1 className="text-[#F7F5F0] text-4xl sm:text-5xl font-black uppercase leading-[0.95] tracking-tight">
              {product.name}
            </h1>
            <p className="text-[#F7F5F0]/60 mt-3 max-w-xl text-[15px]">
              Watch buyers join in real time — every slash drops the price for everyone in the deal.
            </p>
          </div>

          {/* Scoreboard strip */}
          <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-black/15">
            <ScoreCell label="Current Price" value={`₹${(product.currentPrice ?? 0).toLocaleString()}`} accent />
            <ScoreCell label="Buyers In" value={product.participants ?? 0} />
            <ScoreCell label="Status" value={product.status} small />
          </div>
        </div>

        {/* ===== Detail + Tier ladder ===== */}
        <div className="grid lg:grid-cols-3 gap-5 mt-6">
          <div className="lg:col-span-2 border-2 border-[#15201B]/10 bg-white rounded-[7px] p-6">
            <DealHeader product={product} />
            <div className="mt-5 pt-5 border-t border-dashed border-[#15201B]/15">
              <TerminalState status={product.status} />
            </div>
          </div>

          {progress && (
            <div className="border-2 border-[#0B3D2E]/15 bg-white rounded-[7px]overflow-hidden flex flex-col">
              <div className="px-5 pt-5">
                <span className="inline-flex items-center gap-1.5 bg-[#F5A623]/15 text-[#0B3D2E] text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  ⚡ Next Unlock
                </span>
                <h2 className="mt-3 text-2xl font-black uppercase leading-tight">
                  {progress.participantsNeeded} more to go
                </h2>
                <p className="text-[#15201B]/55 text-sm mt-1">
                  At <span className="font-bold text-[#0B3D2E]">{progress.nextTierParticipants}</span> buyers, price drops to{" "}
                  <span className="font-bold text-[#0B3D2E]">₹{progress.nextTierPrice.toLocaleString()}</span>.
                </p>
              </div>

              {/* Crowd-meter: stacked tick ladder instead of a plain bar */}
              <div className="px-5 mt-5">
                <div className="flex items-end justify-between gap-[3px] h-16">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const filled = (i / 24) * 100 < progress.progressPercentage;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all duration-500 ${
                          filled ? "bg-[#0B3D2E]" : "bg-[#15201B]/8"
                        }`}
                        style={{ height: filled ? `${40 + (i % 5) * 10}%` : "30%" }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-mono uppercase tracking-wider text-[#15201B]/40">
                  <span>{progress.currentParticipants} joined</span>
                  <span className="text-[#0B3D2E] font-bold">{progress.progressPercentage}%</span>
                  <span>goal {progress.nextTierParticipants}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#15201B]/8 mt-6">
                <MiniStat label="Current" value={`₹${progress.currentPrice.toLocaleString()}`} />
                <MiniStat label="Next Tier" value={`₹${progress.nextTierPrice.toLocaleString()}`} highlight />
              </div>
            </div>
          )}
        </div>

        {/* ===== Action bar ===== */}
        <div className="flex gap-3 py-5">
          <button
            onClick={handleJoinDeal}
            disabled={joining || product.status !== "ACTIVE"}
            className="flex-1 sm:flex-none px-7 py-3.5 bg-[#0B3D2E] hover:bg-[#0a3327] cursor-pointer text-white rounded-[7px] transition disabled:opacity-40 disabled:cursor-not-allowed font-bold uppercase tracking-wide text-sm"
          >
            {joining ? "Joining…" : "Join This Deal"}
          </button>

          <button
            onClick={handleSlashPrice}
            disabled={slashing || product.status !== "ACTIVE"}
            className="flex-1 sm:flex-none px-7 py-3.5 bg-[#F5A623] hover:bg-[#e6991a] cursor-pointer text-[#15201B] rounded-[7px] transition disabled:opacity-40 disabled:cursor-not-allowed font-bold uppercase tracking-wide text-sm"
          >
            {slashing ? "Slashing…" : "Slash Price"}
          </button>
        </div>

        {/* ===== Live commentary feed ===== */}
        <div className="border-2 border-[#15201B]/10 bg-white rounded-[7px]mt-6 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-[#15201B]/[0.03] border-b border-[#15201B]/10">
            <h2 className="font-black uppercase tracking-wide text-lg">Live Commentary</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-[#15201B]/40">
              {feedEvents.length} events
            </span>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {feedEvents.map((event, idx) => (
              <div
                key={event.id}
                className={`flex gap-4 px-6 py-4 ${
                  idx !== feedEvents.length - 1 ? "border-b border-[#15201B]/[0.06]" : ""
                }`}
              >
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#0B3D2E]" />
                  {idx !== feedEvents.length - 1 && (
                    <div className="w-px flex-1 bg-[#15201B]/10 mt-1" />
                  )}
                </div>
                <div className="flex-1 -mt-1">
                  <FeedItem event={event} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCell({ label, value, accent, small }) {
  return (
    <div className="px-6 sm:px-8 py-5 text-center sm:text-left">
      <p className="text-[#F7F5F0]/45 text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">
        {label}
      </p>
      <p
        className={`font-mono font-bold ${
          accent ? "text-[#F5A623]" : "text-[#F7F5F0]"
        } ${small ? "text-lg uppercase" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value, highlight }) {
  return (
    <div className="bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#15201B]/40">
        {label}
      </p>
      <p className={`mt-1 text-lg font-mono font-bold ${highlight ? "text-[#0B3D2E]" : "text-[#15201B]"}`}>
        {value}
      </p>
    </div>
  );
}