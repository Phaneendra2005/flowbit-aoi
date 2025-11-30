📍Flowbit AOI Creation — Assignment Submission

Author: K Phaneendra
Date: 30-11-2025
Status: Completed & Submitted

🚀 Overview

This project is a fully functional AOI (Area of Interest) Creation tool, built according to the Flowbit assignment requirements.
It converts the provided Figma UI into a working, responsive application with satellite/drone imagery, drawing tools, AOI persistence, and Playwright test coverage.

🛠️ Tech Stack

React + TypeScript
Vite (for fast builds)
Tailwind CSS (UI & layout)
Leaflet + Leaflet.draw (map + AOI tools)
Playwright (E2E testing)
LocalStorage (client-side persistence)

🗺️ Map Features

WMS background imagery from NRW (https://www.wms.nrw.de/geobasis/wms_nw_dop)
Smooth zooming & panning
Custom overlays for AOIs
AOI drawing:
Polygon
Rectangle
Marker
Edit & delete tools
GeoJSON export for AOIs

💾 Persistence

All AOIs are stored in:
localStorage → flowbit_aoi_v1
Data format: GeoJSON FeatureCollection
AOIs persist automatically across page reloads.

📦 Project Structure

src/
  components/
    MapView.tsx
    Sidebar.tsx
  utils/
    storage.ts
  App.tsx
  main.tsx
tests/
  e2e/
    map-load.spec.ts
    persistence.spec.ts
    draw-polygon.spec.ts
public/
dist/

🧪 Testing Strategy (Playwright)

Included E2E tests:
Map Load Test
Ensures map container + WMS tiles appear.
Persistence Test
Refreshes page and checks AOIs still present.
Draw Polygon Test
Draws a polygon and ensures it is saved to localStorage.

Tests run using:
npm run test:e2e

🧱 Architecture Decisions

Why Leaflet?
Native WMS support
Lightweight (vs Mapbox/MapLibre)
Easier AOI-drawing plugins (Leaflet.draw)
Simple integration with React
State Management
Local component state + localStorage persistence
No external state library to keep code simple and lightweight
Folder Structure
components/ for UI and map components
utils/ for pure utility logic (storage, GeoJSON helpers)

⚡ Performance Considerations

Designed to scale for 1000+ AOIs via:
GeoJSON storage (lightweight format)
Minimal re-renders using separate map layers
Efficient Leaflet vector rendering
Debounced map events
Lazy loading of WMS tiles
Future optimization ideas:
Clustering for large point datasets
Vector tiles for huge polygon loads
Server-side AOI storage

🛠️ How to Run Locally
git clone https://github.com/Phaneendra2005/flowbit-aoi
cd flowbit-aoi
npm install
npx playwright install
npm run dev

Run Tests:
npm run test:e2e

Build for Production:
npm run build
npm run preview

🎥 Demo Video

Google Drive:
https://drive.google.com/file/d/1MrFP6WZGgOZIp25Jr1QlEcKLQ6gKNofL/view?usp=drive_link

📁 Submission ZIP

Google Drive:
https://drive.google.com/file/d/1S77WvxIz33XcON0udTJM_cHnFZ8MU0iO/view?usp=drive_link

🔖 Release

GitHub Release (v1.0-flowbit):
https://github.com/Phaneendra2005/flowbit-aoi/releases/tag/v1.0-flowbit

🧾 Tradeoffs

Used Leaflet instead of MapLibre for easier WMS + drawing
Chose localStorage for simplicity (no backend required)
Minimal global state to keep app light
Limited CSS custom components (followed Tailwind clean layout)

📦 Production Readiness Suggestions

If moving to production:
Add authentication + backend AOI storage
Use database (PostGIS) for spatial queries
Add map performance enhancements (vector tiles, clustering)
Add unit tests for utilities
Add CI/CD pipeline + GitHub Actions for tests
Harden error handling for WMS downtime

⏱️ Time Spent

Setup & architecture: 1 hour
Map integration: 1 hour
AOI drawing + persistence: 2 hours
UI/Styling & Figma match: 1 hour
Playwright tests: 1 hour
Documentation + video: 1 hour
Total: ~6 hours
