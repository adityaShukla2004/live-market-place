function NextTierCard({
  progress,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-xl font-bold">
        Next Price Unlock
      </h2>

      <p className="mt-2 text-gray-500">
        {progress.participantsNeeded}
        {" "}
        more buyers needed
      </p>

      <h3 className="text-3xl font-bold text-green-600 mt-2">
        ₹
        {progress.nextTierPrice?.toLocaleString()}
      </h3>

      <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          style={{
            width: `${progress.progressPercentage}%`,
          }}
          className="
            h-full
            bg-green-500
            transition-all
            duration-500
          "
        />

      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>
          {
            progress.currentParticipants
          }
        </span>

        <span>
          {
            progress.nextTierParticipants
          }
        </span>
      </div>

    </div>
  );
}