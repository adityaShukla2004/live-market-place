export default function SellerInsightCard({
  buckets,
}) {
  const waiting =
    buckets.waitingForBetterPrice
      .length;

  const ready =
    buckets.readyToBuy.length;

  const watching =
    buckets.watching.length;

  const wishlisted =
    buckets.wishlisted.length;

  const estimatedConversion =
    Math.floor(waiting * 0.4);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold">
        Seller Insights
      </h2>

      <p className="mt-3 text-white/90">
        {waiting} buyers are waiting
        for a better price.
      </p>

      <p className="mt-2 text-white/90">
        Reducing price may convert
        approximately
        {" "}
        <span className="font-bold">
          {estimatedConversion}
        </span>
        {" "}
        buyers.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

        <div>
          <p className="text-sm">
            Ready
          </p>

          <h3 className="text-3xl font-bold">
            {ready}
          </h3>
        </div>

        <div>
          <p className="text-sm">
            Waiting
          </p>

          <h3 className="text-3xl font-bold">
            {waiting}
          </h3>
        </div>

        <div>
          <p className="text-sm">
            Watching
          </p>

          <h3 className="text-3xl font-bold">
            {watching}
          </h3>
        </div>

        <div>
          <p className="text-sm">
            Wishlisted
          </p>

          <h3 className="text-3xl font-bold">
            {wishlisted}
          </h3>
        </div>

      </div>

    </div>
  );
}