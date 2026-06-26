import {
  useEffect,
  useState,
} from "react";

import {
  mockServer,
} from "../api/server";

import useDebounce from
"../hooks/useDebounce";

import PriceSlider from
"../components/simulation/PriceSlider";

import ProjectionSummary from
"../components/simulation/ProjectionSummary";

import DemandChart from
"../components/simulation/DemandChart";

export default function UnlockMoreBuyers() {

  const [product,
    setProduct] =
    useState(null);

  const [price,
    setPrice] =
    useState(69999);

  const [projection,
    setProjection] =
    useState([]);

  const debouncedPrice =
    useDebounce(
      price,
      600
    );

  useEffect(() => {

    const loadProduct =
      async () => {

        const res =
          await mockServer.getProduct(
            1
          );

        setProduct(
          res.data
        );

        setPrice(
          res.data.currentPrice
        );
      };

    loadProduct();

  }, []);

  useEffect(() => {

    const simulate =
      async () => {

        const res =
          await mockServer.simulatePriceChange(
            debouncedPrice
          );

        setProjection(
          res.projectedCurve
        );
      };

    simulate();

  }, [debouncedPrice]);



     if (!product)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="flex flex-col items-center">

        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />

        <p className="mt-5 text-slate-500 text-sm">
          Loading live deals...
        </p>

      </div>

    </div>
  );

  const projectedBuyers =
    projection.length
      ? projection[
          projection.length - 1
        ].participants
      : product.participants;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

    <div className="max-w-7xl mx-auto lg:px-6 py-8">

      {/* Hero */}

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-sm font-medium text-indigo-600 mb-2">
              AI Price Simulation
            </p>

            <h1 className="text-4xl font-bold text-slate-900">
              Unlock More Buyers
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl">
              Adjust the product price and instantly see how
              customer demand and buyer participation are expected
              to change.
            </p>

          </div>

          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-full">

            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>

            <span className="font-medium text-emerald-700">
              Live Prediction
            </span>

          </div>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <p className="text-sm text-slate-500">
            Current Price
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{product.currentPrice.toLocaleString()}
          </h2>

        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <p className="text-sm text-slate-500">
            Proposed Price
          </p>

          <h2 className="text-3xl font-bold mt-2 text-indigo-600">
            ₹{debouncedPrice.toLocaleString()}
          </h2>

        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <p className="text-sm text-slate-500">
            Current Buyers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {product.participants}
          </h2>

        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <p className="text-sm text-slate-500">
            Predicted Buyers
          </p>

          <h2 className="text-3xl font-bold mt-2 text-emerald-600">
            {projectedBuyers}
          </h2>

        </div>

      </div>

      {/* Main Content */}

      <div className="grid lg:grid-cols-12 gap-6">

        <div className="lg:col-span-5">

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 h-full">

            <PriceSlider
              value={price}
              setValue={setPrice}
            />

          </div>

        </div>

        <div className="lg:col-span-7">

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 h-full">

            <ProjectionSummary
              currentPrice={product.currentPrice}
              proposedPrice={debouncedPrice}
              currentParticipants={product.participants}
              projectedParticipants={projectedBuyers}
            />

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="mt-6">

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-semibold">
                Demand Forecast
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Estimated buyer growth based on price changes.
              </p>

            </div>

          </div>

          <DemandChart data={projection} />

        </div>

      </div>

    </div>

  </div>
);
}