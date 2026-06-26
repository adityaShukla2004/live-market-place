import {
  useEffect,
  useState,
} from "react";
import SellerInsightCard from "../components/intent/SellerInsightCard";

import IntentDistribution from "../components/intent/IntentDistribution";

import {
  mockServer,
} from "../api/server";

import usePolling from
"../hooks/usePolling";

import IntentSummary from
"../components/intent/IntentSummary";

import IntentBucket from
"../components/intent/IntentBucket";

export default function BuyerIntentMap() {

  const [buckets,
    setBuckets] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const loadData =
    async () => {

      try {

        const res =
          await mockServer.getDealStatus(
            1
          );

        setBuckets(
          res.data.buckets
        );

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  usePolling(
    loadData,
    3000
  );

  if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="flex flex-col items-center">

        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />

        <p className="mt-5 text-slate-500 text-sm">
          Loading live deals...
        </p>

      </div>

    </div>
  );

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

    <div className="max-w-7xl mx-auto lg:px-6 py-8">

      {/* Hero */}

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-sm font-medium text-indigo-700 mb-3">
              AI Buyer Analytics
            </span>

            <h1 className="text-4xl font-bold text-slate-900">
              Buyer Intent Map
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl">
              Monitor buyer behaviour in real time. Identify customers
              who are ready to purchase, waiting for discounts, or
              simply tracking the product.
            </p>

          </div>

          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-full">

            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>

            <span className="font-medium text-emerald-700">
              Live Updates
            </span>

          </div>

        </div>

      </div>

      {/* Summary */}

      <IntentSummary buckets={buckets} />

      {/* Buyer Buckets */}

      <div className="mt-8">

        <h2 className="text-2xl font-semibold text-slate-900 mb-5">
          Buyer Segments
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <IntentBucket
            title="Ready To Buy"
            buyers={buckets.readyToBuy}
          />

          <IntentBucket
            title="Waiting For Better Price"
            buyers={buckets.waitingForBetterPrice}
          />

          <IntentBucket
            title="Watching"
            buyers={buckets.watching}
          />

          <IntentBucket
            title="Wishlisted"
            buyers={buckets.wishlisted}
          />

        </div>

      </div>

      {/* Analytics */}

      <div className="grid lg:grid-cols-12 gap-6 mt-8">

        {/* Chart */}

        <div className="lg:col-span-8">

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 h-full">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-semibold">
                  Buyer Distribution
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Visual breakdown of customer intent.
                </p>

              </div>

            </div>

            <IntentDistribution buckets={buckets} />

          </div>

        </div>

        {/* AI Insight */}

        <div className="lg:col-span-4">

          <SellerInsightCard buckets={buckets} />

        </div>

      </div>

    </div>

  </div>
);
}