import { IndianRupee, SlidersHorizontal } from "lucide-react";

export default function PriceSlider({
  value,
  setValue,
}) {
  const min = 59999;
  const max = 79999;

  const progress =
    ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Price Optimizer
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Adjust the selling price to estimate buyer demand.
          </p>

        </div>

        <div className="w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center">

          <SlidersHorizontal
            size={20}
            className="text-indigo-600"
          />

        </div>

      </div>

      {/* Current Price */}

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">

        <p className="text-sm text-slate-500">
          Proposed Price
        </p>

        <div className="flex items-center gap-2 mt-2">

          <IndianRupee
            size={28}
            className="text-emerald-600"
          />

          <h3 className="text-4xl font-bold text-slate-900">
            {value.toLocaleString()}
          </h3>

        </div>

      </div>

      {/* Slider */}

      <div className="relative">

        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
          className="w-full h-2 appearance-none rounded-full bg-slate-200 cursor-pointer accent-indigo-600"
        />

        {/* Progress */}

        <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">

          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Labels */}

      <div className="flex justify-between mt-4 text-sm text-slate-500">

        <span>
          ₹{min.toLocaleString()}
        </span>

        <span>
          ₹{max.toLocaleString()}
        </span>

      </div>

      {/* Info */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">

        <div>

          <p className="text-sm text-slate-500">
            AI Recommendation
          </p>

          <p className="font-semibold text-slate-900">
            Lower price → Higher demand
          </p>

        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700">
          Live Preview
        </span>

      </div>

    </div>
  );
}