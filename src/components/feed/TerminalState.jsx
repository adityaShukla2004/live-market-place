export default function TerminalState({
  status,
}) {
  if (
    status !== "EXPIRED" &&
    status !== "SOLD_OUT"
  )
    return null;

  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-6 mt-5">
      <h2 className="text-2xl font-bold text-red-700">
        {status === "EXPIRED"
          ? "Deal Expired"
          : "Deal Sold Out"}
      </h2>

      <p className="text-red-500 mt-2">
        No further actions are
        allowed.
      </p>
    </div>
  );
}