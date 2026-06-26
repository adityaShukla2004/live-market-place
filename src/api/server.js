// src/api/mockServer.js

import { db } from "./db";
import { simulateRequest } from "./apiClient";

/* -------------------------------- */
/* PRICE TIERS */
/* -------------------------------- */

const priceTiers = [
  {
    participants: 0,
    price: 79999,
  },

  {
    participants: 500,
    price: 74999,
  },

  {
    participants: 1000,
    price: 69999,
  },

  {
    participants: 1500,
    price: 64999,
  },

  {
    participants: 2000,
    price: 59999,
  },
];


function getNextTierProgress() {
  const currentParticipants =
    db.product.participants;

  let currentTier =
    priceTiers[0];

  let nextTier = null;

  for (
    let i = 0;
    i < priceTiers.length;
    i++
  ) {
    if (
      currentParticipants >=
      priceTiers[i].participants
    ) {
      currentTier =
        priceTiers[i];
    } else {
      nextTier =
        priceTiers[i];
      break;
    }
  }

  if (!nextTier) {
    return {
      unlocked: true,

      currentParticipants,

      currentPrice:
        db.product.currentPrice,

      message:
        "Lowest price unlocked",
    };
  }

  const participantsNeeded =
    nextTier.participants -
    currentParticipants;

  const tierGap =
    nextTier.participants -
    currentTier.participants;

  const progressPercentage =
    ((currentParticipants -
      currentTier.participants) /
      tierGap) *
    100;

  return {
    unlocked: false,

    currentParticipants,

    currentPrice:
      db.product.currentPrice,

    nextTierPrice:
      nextTier.price,

    nextTierParticipants:
      nextTier.participants,

    participantsNeeded,

    progressPercentage:
      Math.min(
        progressPercentage,
        100
      ),
  };
}
/* -------------------------------- */
/* HELPERS */
/* -------------------------------- */

function updatePriceTier() {
  let unlockedPrice =
    db.product.basePrice;

  priceTiers.forEach((tier) => {
    if (
      db.product.participants >=
      tier.participants
    ) {
      unlockedPrice =
        tier.price;
    }
  });

  db.product.currentPrice =
    unlockedPrice;
}

function getIntentBuckets() {
  const buckets = {
    readyToBuy: [],
    waitingForBetterPrice: [],
    watching: [],
    wishlisted: [],
  };

  db.buyers.forEach((buyer) => {
    if (
      buyer.joined &&
      db.product.currentPrice <=
        buyer.thresholdPrice
    ) {
      buckets.readyToBuy.push(
        buyer
      );
    } else if (
      buyer.joined
    ) {
      buckets.waitingForBetterPrice.push(
        buyer
      );
    } else if (
      buyer.wishlisted
    ) {
      buckets.wishlisted.push(
        buyer
      );
    } else {
      buckets.watching.push(
        buyer
      );
    }
  });

  return buckets;
}

function createEvent(
  type,
  buyerName
) {
  const event = {
    id: Date.now(),
    type,
    buyerName,
    timestamp: Date.now(),
  };

  db.feedEvents.unshift(event);

  return event;
}

function projectDemand(
  proposedPrice
) {
  const currentPrice =
    db.product.currentPrice;

  const currentParticipants =
    db.product.participants;

  const delta =
    (currentPrice -
      proposedPrice) /
    currentPrice;

  const growth =
    Math.max(
      0,
      Math.floor(
        150 *
          Math.log(
            1 + delta * 10
          )
      )
    );

  return [
    {
      minute: 0,
      participants:
        currentParticipants,
    },

    {
      minute: 5,
      participants:
        currentParticipants +
        Math.floor(
          growth * 0.3
        ),
    },

    {
      minute: 10,
      participants:
        currentParticipants +
        Math.floor(
          growth * 0.6
        ),
    },

    {
      minute: 15,
      participants:
        currentParticipants +
        growth,
    },
  ];
}

/* -------------------------------- */
/* API CONTRACT */
/* -------------------------------- */

export const mockServer = {
  /* GET /product/:id */

  async getProduct(id) {
    return simulateRequest(() => {
      return {
        endpoint:
          `/product/${id}`,

        data: db.product,
      };
    });
  },

  /* GET /deal-status/:id */

  async getDealStatus(id) {
    return simulateRequest(() => {
      return {
        endpoint:
          `/deal-status/${id}`,

        data: {
          participants:
            db.product
              .participants,

          currentPrice:
            db.product
              .currentPrice,

          currentTier:
            db.product
              .currentPrice,

          buckets:
            getIntentBuckets(),

          feedEvents:
            db.feedEvents,
        },
      };
    });
  },

  /* POST /join-deal */

  async joinDeal(payload) {
  return simulateRequest(() => {

    const buyer = {
      id: Date.now(),
      name: payload.buyerName,
      joined: true,
      visits: 1,
      repeatVisits: 1,
      thresholdPrice:
        db.product.currentPrice,
      wishlisted: false,
    };

    db.buyers.push(buyer);

    db.product.participants += 1;

    updatePriceTier();

    const event = createEvent(
      "JOIN",
      payload.buyerName
    );

    return {
      endpoint: "/join-deal",
      success: true,

      data: {
        participants:
          db.product.participants,

        currentPrice:
          db.product.currentPrice,

        event,
      },
    };
  });
},

  /* POST /slash-price */

  async slashPrice() {
  return simulateRequest(() => {

    const event =
      createEvent(
        "SLASH",
        "Community"
      );

    return {
      endpoint: "/slash-price",
      success: true,

      data: {
        currentPrice:
          db.product.currentPrice,

        event,
      },
    };
  });
},

  /* POST /simulate-price-change */

  async simulatePriceChange(
    proposedPrice
  ) {
    return simulateRequest(() => {
      return {
        endpoint:
          "/simulate-price-change",

        currentPrice:
          db.product
            .currentPrice,

        proposedPrice,

        projectedCurve:
          projectDemand(
            proposedPrice
          ),
      };
    });
  },

  async getNextTierProgress() {
  return simulateRequest(() => {
    return {
      endpoint:
        "/next-tier-progress",

      data:
        getNextTierProgress(),
    };
  });
}
};