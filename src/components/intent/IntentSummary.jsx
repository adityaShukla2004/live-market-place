import {
  CheckCircle2,
  Clock3,
  Eye,
  Heart,
} from "lucide-react";

export default function IntentSummary({
  buckets,
}) {
  const cards = [
    {
      title: "Ready To Buy",
      value: buckets.readyToBuy.length,
      subtitle: "High Purchase Intent",
      icon: <CheckCircle2 size={22} />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-600",
    },
    {
      title: "Waiting",
      value: buckets.waitingForBetterPrice.length,
      subtitle: "Price Sensitive",
      icon: <Clock3 size={22} />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
    },
    {
      title: "Watching",
      value: buckets.watching.length,
      subtitle: "Monitoring Product",
      icon: <Eye size={22} />,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      valueColor: "text-sky-600",
    },
    {
      title: "Wishlisted",
      value: buckets.wishlisted.length,
      subtitle: "Saved for Later",
      icon: <Heart size={22} />,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      valueColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-300"
        >

          {/* Top */}

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2
                className={`text-4xl font-bold mt-3 ${card.valueColor}`}
              >
                {card.value}
              </h2>

            </div>

            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.iconBg}`}
            >

              <div className={card.iconColor}>
                {card.icon}
              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-5 pt-4 border-t border-slate-100">

            <p className="text-sm text-slate-500">
              {card.subtitle}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}