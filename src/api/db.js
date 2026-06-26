// src/api/mockDb.js

export const db = {
  product: {
    id: 1,
    name: "iPhone 15 Pro",
    basePrice: 79999,
    currentPrice: 69999,
    participants: 950,
    timeRemaining: 7200,
    status: "ACTIVE",
  },

  buyers: [
    {
      id: 1,
      name: "Rahul",
      joined: true,
      visits: 10,
      repeatVisits: 4,
      thresholdPrice: 69999,
      wishlisted: false,
    },

    {
      id: 2,
      name: "Priya",
      joined: true,
      visits: 8,
      repeatVisits: 3,
      thresholdPrice: 65000,
      wishlisted: false,
    },

    {
      id: 3,
      name: "Aman",
      joined: false,
      visits: 5,
      repeatVisits: 2,
      thresholdPrice: 68000,
      wishlisted: true,
    },
  ],

  feedEvents: [
    {
      id: Date.now(),
      type: "JOIN",
      buyerName: "Rahul",
      timestamp: Date.now(),
    },
  ],
};