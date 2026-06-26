import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload?.length)
    return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-lg">

      <p className="text-sm text-slate-500">
        Minute {label}
      </p>

      <h3 className="text-lg font-semibold text-slate-900 mt-1">
        {payload[0].value} Buyers
      </h3>

    </div>
  );
}

export default function DemandChart({
  data,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Demand Forecast
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Buyer growth based on price changes
          </p>

        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">

          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />

          <span className="text-sm font-medium text-emerald-700">
            Live
          </span>

        </div>

      </div>

      <div className="h-[380px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="buyers"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#4F46E5"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#4F46E5"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="minute"
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
            />

            <Area
              type="monotone"
              dataKey="participants"
              fill="url(#buyers)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="participants"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#4F46E5",
              }}
              animationDuration={700}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}