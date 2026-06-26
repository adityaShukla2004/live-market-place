<img width="772" height="432" alt="image" src="https://github.com/user-attachments/assets/46cf86de-2cbe-40d8-80bf-b644fd397dd2" /># Slash – Frontend Engineer Assessment

## Overview

This project is my implementation of the Slash Frontend Engineer assessment.

The idea behind the application is a **collective-pricing marketplace**, where the price of a product decreases as more buyers join the deal. Instead of building a real backend, I created an **in-memory mock API** that simulates network requests, real-time updates, and price simulations.

The application is divided into three core screens as requested in the assignment.

---

# Tech Stack

* React.js (Hooks)
* JavaScript (ES6)
* Tailwind CSS
* Recharts
* Mock API (In-Memory)
* Custom Hooks

---

# Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

# Environment Variables

Create a `.env` file in the root of the project.

```env
VITE_APP_NAME=Slash Marketplace
VITE_PRODUCT_ID=1
VITE_API_DELAY=800
VITE_POLLING_INTERVAL=3000
```

---

# Project Structure

```text
src
│
├── api
├── components
│   ├── feed
│   ├── simulation
│   └── intent
│
├── hooks
├── pages
├── App.jsx
└── main.jsx
```

I kept the project modular so that each screen has its own components and business logic.

---

# Screen 1 – Live Deal Feed

This screen represents the buyer experience.

It displays:

* Live activity feed
* Current product price
* Number of participants
* Join Deal button
* Slash Price button
* Next price unlock progress
* Loading, error and terminal states

The feed updates automatically without refreshing the page.

---

# Real-Time Approach

For this assessment I chose **Polling** instead of WebSockets or Server-Sent Events.

The reason is simple:

Since the backend is mocked, polling provides a predictable and lightweight way to simulate live updates without adding unnecessary complexity.

The application refreshes deal information every **3 seconds**.

If this project were connected to a production backend, I would replace polling with WebSockets.

---

# Screen 2 – Unlock More Buyers

This screen is designed for sellers.

A seller can move the price slider and immediately see how demand is expected to change.

The API returns a projected demand curve based on the selected price.

To avoid unnecessary API calls, the simulation request is **debounced**, so a request is sent only after the user pauses changing the price.

The screen clearly separates:

* Current values
* Projected values

to avoid confusing actual data with simulated data.

---

# Simulation Logic

The demand projection is deterministic.

Instead of using random numbers, the growth depends on the difference between the current price and the proposed price.

Lower prices increase projected demand, but the increase follows diminishing returns so the graph remains realistic.

This keeps the simulation predictable while still feeling believable.

---

# Screen 3 – Buyer Intent Map

This screen provides a seller view of buyer behaviour.

Buyers are automatically grouped into four categories:

* Ready to Buy
* Waiting for Better Price
* Watching
* Wishlisted

These buckets are **not hardcoded**.

They are calculated using buyer information such as:

* Join status
* Target price
* Wishlist status

Whenever deal data changes, buyers are automatically re-classified into the correct bucket.

---

# Buyer Bucketing Logic

**Ready to Buy**

Buyer has already joined and the current price is at or below their target price.

---

**Waiting for Better Price**

Buyer joined the deal but is still waiting for a lower price.

---

**Watching**

Buyer has visited the deal but hasn't joined or wishlisted it.

---

**Wishlisted**

Buyer has saved the deal for later.

---

# Mock API

The following endpoints were implemented:

```
GET /product/:id

GET /deal-status/:id

GET /next-tier-progress

POST /join-deal

POST /slash-price

POST /simulate-price-change
```

The API is entirely in-memory and simulates network latency.

---

# Bonus

I also implemented the optional **Market Pulse** component.

The same underlying data is presented differently depending on the audience.

**Buyer**

> Only 50 more buyers needed to unlock ₹64,999.

**Seller**

> Demand at ₹64,999 has reached 1450 buyers.

Both views use a single reusable component instead of separate implementations.

---

# Assumptions

Since no real backend or production data was provided, I made a few assumptions:

* Buyers are stored in memory.
* Price tiers are predefined.
* Demand projection is deterministic.
* Mock API responses include artificial network delay.
* Data resets when the application is refreshed.

---

# Future Improvements

If this were a production project, I would add:

* WebSocket-based real-time updates
* Express.js backend
* Database persistence
* User authentication
* Analytics dashboard
* Push notifications
* Unit and integration tests

---

# Screenshots

The repository includes screenshots of:

* Live Deal Feed
* Unlock More Buyers
* Buyer Intent Map
* Market Pulse (Bonus)

---

# Thank You

Thank you for reviewing my submission.

I focused on keeping the code modular, reusable, and easy to maintain while implementing the requested functionality as closely as possible.


