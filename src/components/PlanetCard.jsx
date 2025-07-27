import React from "react";
import Link from "next/link";

export default function PlanetCard({ planet }) {
  return (
    <div className="bg-space-card p-6 rounded-lg border border-space-header/50">
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

      <Link
        href={`/planet/${planet.id}`}
        className="mt-4 inline-block px-4 py-2 bg-space-button text-space-text rounded font-body hover:opacity-80 transition-opacity text-center"
      >
        More Information
      </Link>
    </div>
  );
}
