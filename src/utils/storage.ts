import type { FeatureCollection } from "geojson";
const KEY = "flowbit_aoi_v1";
export function saveAOIs(fc: FeatureCollection) {
  try {
    localStorage.setItem(KEY, JSON.stringify(fc));
  } catch (err) {
    console.error("failed to save AOIs", err);
  }
}
export function loadAOIs(): FeatureCollection | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FeatureCollection;
  } catch (err) {
    console.error("failed to load AOIs", err);
    return null;
  }
}
