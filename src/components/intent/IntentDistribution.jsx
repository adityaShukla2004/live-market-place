import {
  CheckCircle2,
  Clock3,
  Eye,
  Heart,
  Users,
} from "lucide-react";

export default function IntentDistribution({
  buckets,
}) {
  const ready =
    buckets.readyToBuy.length;

  const waiting =
    buckets.waitingForBetterPrice.length;

  const watching =
    buckets.watching.length;

  const wishlisted =
    buckets.wishlisted.length;

  const total =
    ready +
    waiting +
    watching +
    wishlisted;

  const getPercent = (value) =>
    total === 0
      ? 0
      : ((value / total) * 100).toFixed(1);

  const segments = [
    {
      title: "Ready To Buy",
      value: ready,
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-700",
      icon: <CheckCircle2 size={18} />,
    },
    {
      title: "Waiting",
      value: waiting,
      color: "bg-amber-500",
      light: "bg-amber-50",
      text: "text-amber-700",
      icon: <Clock3 size={18} />,
    },
    {
      title: "Watching",
      value: watching,
      color: "bg-sky-500",
      light: "bg-sky-50",
      text: "text-sky-700",
      icon: <Eye size={18} />,
    },
    {
      title: "Wishlisted",
      value: wishlisted,
      color: "bg-violet-500",
      light: "bg-violet-50",
      text: "text-violet-700",
      icon: <Heart size={18} />,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Buyer Distribution
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Real-time breakdown of buyer intent.
          </p>

        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100">

          <Users
            size={18}
            className="text-slate-700"
          />

          <span className="font-semibold">
            {total} Buyers
          </span>

        </div>

      </div>

      {/* Progress */}

      <div className="h-4 flex rounded-full overflow-hidden bg-slate-100">

        {segments.map((item) => (
          <div
            key={item.title}
            className={item.color}
            style={{
              width: `${getPercent(item.value)}%`,
            }}
          />
        ))}

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

        {segments.map((item) => (
          <div
            key={item.title}
            className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition"
          >

            <div className="flex items-center justify-between">

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.light} ${item.text}`}
              >
                {item.icon}
              </div>

              <span
                className={`text-sm font-semibold ${item.text}`}
              >
                {getPercent(item.value)}%
              </span>

            </div>

            <h3 className="font-semibold text-slate-900 mt-4">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">

              <div
                className={`${item.color} h-full`}
                style={{
                  width: `${getPercent(item.value)}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}