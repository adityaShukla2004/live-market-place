import {
  User,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Eye,
  Heart,
} from "lucide-react";

function getConfig(title) {
  switch (title) {
    case "Ready To Buy":
      return {
        icon: <CheckCircle2 size={18} />,
        color:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
      };

    case "Waiting For Better Price":
      return {
        icon: <Clock3 size={18} />,
        color:
          "bg-amber-50 text-amber-700 border-amber-200",
      };

    case "Watching":
      return {
        icon: <Eye size={18} />,
        color:
          "bg-sky-50 text-sky-700 border-sky-200",
      };

    default:
      return {
        icon: <Heart size={18} />,
        color:
          "bg-pink-50 text-pink-700 border-pink-200",
      };
  }
}

export default function IntentBucket({
  title,
  buyers,
}) {
  const config = getConfig(title);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      {/* Header */}

      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center border ${config.color}`}
          >
            {config.icon}
          </div>

          <div>

            <h2 className="font-semibold text-slate-900">
              {title}
            </h2>

            <p className="text-sm text-slate-500">
              Buyer Segment
            </p>

          </div>

        </div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">
          {buyers.length}
        </span>

      </div>

      {/* Buyers */}

      <div className="max-h-[340px] overflow-y-auto">

        {buyers.length === 0 ? (
          <div className="py-14 text-center text-slate-400">

            <User
              size={42}
              className="mx-auto mb-3 opacity-40"
            />

            <p>No buyers available</p>

          </div>
        ) : (
          buyers.map((buyer) => (
            <div
              key={buyer.id}
              className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-slate-50 transition"
            >

              {/* Buyer */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">

                  {buyer.name.charAt(0)}

                </div>

                <div>

                  <h3 className="font-medium text-slate-900">
                    {buyer.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Interested Buyer
                  </p>

                </div>

              </div>

              {/* Threshold */}

              <div className="text-right">

                <div className="flex items-center justify-end gap-1 text-slate-900 font-semibold">

                  <IndianRupee size={15} />

                  {buyer.thresholdPrice?.toLocaleString()}

                </div>

                <p className="text-xs text-slate-500">
                  Threshold
                </p>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}