import React from "react";

export default function PlanetCard({ planet, onDetails }) {
  return (
    <div className="bg-space-card p-6 rounded-lg border border-space-text/20 hover:border-space-header/50 transition-colors">
      <h3 className="text-xl font-header text-space-header mb-2">{planet.name}</h3>
      <p className="text-space-text mb-4 font-body">{planet.description}</p>

      <div className="space-y-2 text-sm text-space-text font-body">
        <div>
          📏 <span className="font-bold">Diameter:</span> {planet.diameter}
        </div>
        <div>
          🌍 <span className="font-bold">Distance:</span> {planet.distanceFromSun}
        </div>
        <div>
          🌙 <span className="font-bold">Moons:</span> {planet.moons}
        </div>
        <div>
          💫 <span className="font-bold">Rings:</span> {planet.hasRings ? "Yes" : "No"}
        </div>
        <div className="text-space-text/80 italic mt-3">💡 {planet.interesting_facts}</div>
      </div>

      <button
        onClick={() => onDetails(planet.id)}
        className="mt-4 px-4 py-2 bg-space-button text-space-text rounded font-body hover:opacity-80 transition-opacity"
      >
        View Details
      </button>
    </div>
  );
}
