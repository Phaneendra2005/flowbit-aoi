import React from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
export default function App() {
  return (
    <div className="h-screen flex">
      <aside className="w-80 bg-white shadow p-4">
        <Sidebar />
      </aside>
      <main className="flex-1">
        <MapView />
      </main>
    </div>
  );
}
