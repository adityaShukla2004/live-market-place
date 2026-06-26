import {
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
} from "lucide-react";

export default function ProjectionSummary({
  currentPrice,
  proposedPrice,
  currentParticipants,
  projectedParticipants,
}) {
  const buyerDiff =
    projectedParticipants -
    currentParticipants;

  const priceDiff =
    proposedPrice - currentPrice;

  const buyerGrowth =
    (
      (buyerDiff /
        currentParticipants) *
      100
    ).toFixed(1);

  const increasing =
    buyerDiff >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Projection Summary
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            AI-powered demand estimation based on the selected price.
          </p>

        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-sm font-medium">
          Live Analysis
        </span>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-5">

        <div className="border border-slate-200 rounded-lg p-5">

          <div className="flex items-center gap-2 text-slate-500">

            <IndianRupee size={18} />

            Current Price

          </div>

          <h3 className="text-3xl font-bold mt-3">
            ₹{currentPrice.toLocaleString()}
          </h3>

          <p className="text-slate-500 mt-2">
            {currentParticipants} Buyers
          </p>

        </div>

        <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">

          <div className="flex items-center gap-2 text-slate-500">

            <IndianRupee size={18} />

            Proposed Price

          </div>

          <h3 className="text-3xl font-bold text-indigo-600 mt-3">
            ₹{proposedPrice.toLocaleString()}
          </h3>

          <p className="text-slate-500 mt-2">
            {projectedParticipants} Buyers
          </p>

        </div>

      </div>

      {/* Projection Insight */}

      <div className="mt-6 border border-slate-200 rounded-lg p-5">

        <div className="flex items-center gap-3">

          {increasing ? (
            <TrendingUp
              className="text-emerald-600"
              size={26}
            />
          ) : (
            <TrendingDown
              className="text-red-500"
              size={26}
            />
          )}

          <div>

            <h3 className="font-semibold text-slate-900">
              AI Projection
            </h3>

            <p className="text-sm text-slate-500">
              Estimated impact after changing the price.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-5 mt-6">

          <div>

            <p className="text-sm text-slate-500">
              Price Change
            </p>

            <h3
              className={`text-2xl font-bold ${
                priceDiff <= 0
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {priceDiff > 0 ? "+" : ""}
              ₹{priceDiff.toLocaleString()}
            </h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Buyer Growth
            </p>

            <h3
              className={`text-2xl font-bold ${
                increasing
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {increasing ? "+" : ""}
              {buyerGrowth}%
            </h3>

          </div>

        </div>

        {/* Summary */}

        <div
          className={`mt-6 rounded-lg border p-4 ${
            increasing
              ? "bg-emerald-50 border-emerald-200"
              : "bg-red-50 border-red-200"
          }`}
        >

          <div className="flex items-start gap-3">

            <Users
              size={22}
              className={
                increasing
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            />

            <p
              className={`text-sm ${
                increasing
                  ? "text-emerald-700"
                  : "text-red-700"
              }`}
            >
              {increasing
                ? `Reducing the price by ₹${Math.abs(
                    priceDiff
                  ).toLocaleString()} is projected to attract approximately ${buyerDiff} additional buyers, resulting in an estimated ${buyerGrowth}% increase in participation.`
                : `Increasing the price by ₹${priceDiff.toLocaleString()} may reduce buyer participation by ${Math.abs(
                    buyerDiff
                  )} buyers (around ${Math.abs(
                    buyerGrowth
                  )}%).`}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}