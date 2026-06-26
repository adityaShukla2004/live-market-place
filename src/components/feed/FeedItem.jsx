import { motion } from "framer-motion";
import {
  User,
  Clock3,
  TrendingDown,
  ShoppingBag,
  Users,
} from "lucide-react";

function getBadge(type) {
  switch (type) {
    case "JOIN":
      return {
        text: "Joined",
        className:
          "bg-emerald-50 text-emerald-700 border border-emerald-200",
        icon: <Users size={14} />,
      };

    case "SLASH":
      return {
        text: "Price Slashed",
        className:
          "bg-orange-50 text-orange-700 border border-orange-200",
        icon: <TrendingDown size={14} />,
      };

    case "PURCHASE":
      return {
        text: "Purchased",
        className:
          "bg-blue-50 text-blue-700 border border-blue-200",
        icon: <ShoppingBag size={14} />,
      };

    default:
      return {
        text: type,
        className:
          "bg-slate-100 text-slate-700 border border-slate-200",
        icon: null,
      };
  }
}

export default function FeedItem({ event }) {
  const badge = getBadge(event.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        flex flex-col gap-3
        sm:grid sm:grid-cols-12 sm:items-center sm:gap-4
      "
    >
      {/* Buyer */}
      <div className="flex items-center gap-3 sm:col-span-5 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-900 text-white flex items-center justify-center">
          <User size={18} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-slate-900 truncate">
            {event.buyerName}
          </p>
          <p className="text-sm text-slate-500">Customer Activity</p>
        </div>
      </div>

      {/* Action + Time row on mobile, split into two cols from sm: up */}
      <div className="flex items-center justify-between gap-3 sm:col-span-7 sm:contents">
        <div className="sm:col-span-4">
          <span
            className={`
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-md
              text-sm
              font-medium
              whitespace-nowrap
              ${badge.className}
            `}
          >
            {badge.icon}
            {badge.text}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-500 shrink-0 sm:col-span-3 sm:justify-end">
          <Clock3 size={15} />
          {new Date(event.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
}