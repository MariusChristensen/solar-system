import React, { useState, useEffect } from "react";
import { nasaPlanetApi } from "../lib/api/nasaPlanetApi.js";

export default function PlanetDetails({ planetId, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const response = await nasaPlanetApi.getPlanetDetails(planetId);
      if (response.success) {
        setDetails(response.data);
      }
      setLoading(false);
    }
    fetchDetails();
  }, [planetId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-space-card p-8 rounded-lg text-center">
          <div className="text-space-text font-body">Loading from NASA API...</div>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-space-card p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-header text-space-header">{details.basic.name}</h2>
          <button onClick={onClose} className="text-space-text hover:text-space-header transition-colors text-2xl">
            ×
          </button>
        </div>

        <p className="text-space-text mb-6 font-body">{details.basic.description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-header text-space-header mb-3">Physical Properties</h3>
            <div className="space-y-2 text-sm text-space-text font-body">
              <div>
                <span className="font-bold">Diameter:</span> {details.physical.diameter}
              </div>
              <div>
                <span className="font-bold">Temperature:</span> {details.physical.temperature}
              </div>
              <div>
                <span className="font-bold">Gravity:</span> {details.physical.gravity}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-header text-space-header mb-3">Orbital Properties</h3>
            <div className="space-y-2 text-sm text-space-text font-body">
              <div>
                <span className="font-bold">Distance from Sun:</span> {details.orbital.distanceFromSun}
              </div>
              <div>
                <span className="font-bold">Orbital Period:</span> {details.orbital.orbitalPeriod}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-header text-space-header mb-3">Observations</h3>
          <div className="space-y-2 text-sm text-space-text font-body">
            <div>
              <span className="font-bold">Moons:</span> {details.observational.numberOfMoons}
            </div>
            <div>
              <span className="font-bold">Has Rings:</span> {details.observational.hasRings ? "Yes" : "No"}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-header text-space-header mb-3">Interesting Facts</h3>
          <ul className="space-y-2 text-sm text-space-text font-body">
            {details.interestingFacts.map((fact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-space-header mr-2">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-xs text-space-text/60 font-body">
          🚀 Data from NASA API • Updated: {new Date(details.basic.lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
