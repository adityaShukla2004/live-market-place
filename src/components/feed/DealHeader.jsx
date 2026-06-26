import {
  IndianRupee,
  Users,
  Activity,
} from "lucide-react";

export default function DealHeader({ product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Current Price */}

      <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-sm text-slate-500">
              Current Price
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              ₹{product.currentPrice.toLocaleString()}
            </h2>

            <p className="text-sm text-emerald-600 mt-2">
              Live Deal Price
            </p>

          </div>

          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">

            <IndianRupee
              size={22}
              className="text-emerald-600"
            />

          </div>

        </div>

      </div>

      {/* Participants */}

      <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-sm text-slate-500">
              Participants
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {product.participants}
            </h2>

            <p className="text-sm text-indigo-600 mt-2">
              Buyers Joined
            </p>

          </div>

          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">

            <Users
              size={22}
              className="text-indigo-600"
            />

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-sm text-slate-500">
              Deal Status
            </p>

            <h2
              className={`text-2xl font-bold mt-2 ${
                product.status === "ACTIVE"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {product.status}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Real-time Monitoring
            </p>

          </div>

          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              product.status === "ACTIVE"
                ? "bg-emerald-50"
                : "bg-red-50"
            }`}
          >
            <Activity
              size={22}
              className={
                product.status === "ACTIVE"
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            />
          </div>

        </div>

      </div>

    </div>
  );
}