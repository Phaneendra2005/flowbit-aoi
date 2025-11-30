import React, { useEffect, useState } from "react";
import { loadAOIs } from "../utils/storage";
import { FeatureCollection } from "geojson";
export default function Sidebar() {
  const [aois, setAoIs] = useState<number>(0);
  const [raw, setRaw] = useState<FeatureCollection | null>(null);
  useEffect(() => {
    const data = loadAOIs();
    if (data) {
      setAoIs(data.features.length);
      setRaw(data);
    } else {
      setAoIs(0);
      setRaw(null);
    }
    const onStorage = () => {
      const d = loadAOIs();
      setAoIs(d?.features.length ?? 0);
      setRaw(d ?? null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">AOI Manager</h2>
      <p className="mb-2">
        Saved AOIs: <strong>{aois}</strong>
      </p>
      <div className="text-sm text-gray-600">
        Tip: Use the draw toolbar on the map to add a point/polygon/rectangle.
        Drawn features are persisted to localStorage.
      </div>
      <hr className="my-4" />
      <pre className="bg-gray-50 p-2 rounded text-xs max-h-64 overflow-auto">
        {raw ? JSON.stringify(raw, null, 2) : "No AOIs saved."}
      </pre>
    </div>
  );
}
