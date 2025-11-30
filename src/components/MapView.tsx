import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import { loadAOIs, saveAOIs } from "../utils/storage";
import { FeatureCollection } from "geojson";
const WMS_URL = "https://www.wms.nrw.de/geobasis/wms_nw_dop";
function LeafletDrawControl({
  onChange,
}: {
  onChange: (fc: FeatureCollection) => void;
}) {
  const map = useMap();
  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new (L.Control as any).Draw({
      position: "topright",
      draw: {
        polygon: true,
        polyline: false,
        rectangle: true,
        circle: false,
        marker: true,
        circlemarker: false,
      },
      edit: { featureGroup: drawnItems, remove: true },
    });
    map.addControl(drawControl);
    const saved = loadAOIs();
    if (saved && saved.features?.length) {
      const geoJsonLayer = L.geoJSON(saved);
      geoJsonLayer.eachLayer((l) => drawnItems.addLayer(l as L.Layer));
    }
    map.on(L.Draw.Event.CREATED, (e: any) => {
      drawnItems.addLayer(e.layer);
      triggerSave();
    });
    map.on(L.Draw.Event.EDITED, triggerSave);
    map.on(L.Draw.Event.DELETED, triggerSave);
    function triggerSave() {
      const fc = drawnItems.toGeoJSON() as unknown as FeatureCollection;
      onChange(fc);
      saveAOIs(fc);
    }
    return () => {
      map.off(L.Draw.Event.CREATED);
      map.off(L.Draw.Event.EDITED);
      map.off(L.Draw.Event.DELETED);
      try {
        map.removeControl(drawControl);
        map.removeLayer(drawnItems);
      } catch {}
    };
  }, [map, onChange]);
  return null;
}
export default function MapView() {
  const wmsParams = {
    layers: "nw_dop",
    format: "image/png",
    transparent: false,
    version: "1.3.0",
  };
  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url={WMS_URL}
        layers={wmsParams.layers as any}
        format={wmsParams.format}
        transparent={wmsParams.transparent as any}
        version={wmsParams.version as any}
      />
      <LeafletDrawControl onChange={(fc) => console.log("AOIs changed", fc)} />
    </MapContainer>
  );
}
