import React, { useState, useEffect } from "react";
import { nasaPlanetApi } from "../lib/api/nasaPlanetApi.js";

export default function PlanetPageContent({ planetId }) {
  const [planetData, setPlanetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanetData() {
      setLoading(true);
      try {
        const [basicResponse, detailsResponse] = await Promise.all([
          nasaPlanetApi.getAllPlanets(),
          nasaPlanetApi.getPlanetDetails(planetId),
        ]);

        if (basicResponse.success && detailsResponse.success) {
          const basicInfo = basicResponse.data.find((planet) => planet.id === planetId);
          setPlanetData({
            basic: basicInfo,
            details: detailsResponse.data,
          });
        }
      } catch (error) {
        console.error("Failed to fetch planet data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanetData();
  }, [planetId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-header text-space-header mb-4">Loading Planet Data...</h1>
          <p className="text-space-text font-body">Fetching information from NASA API...</p>
        </div>
      </div>
    );
  }

  if (!planetData) {
    return (
      <div className="min-h-screen bg-space-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-header text-space-header mb-4">Planet Not Found</h1>
          <p className="text-space-text font-body">The requested planet could not be found.</p>
        </div>
      </div>
    );
  }

  const { basic, details } = planetData;

  return (
    <div className="min-h-screen bg-space-bg px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-header font-bold text-space-header mb-4 capitalize">{basic.name}</h1>
          <p className="text-xl text-space-text font-body max-w-3xl mx-auto">{basic.description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Planet Image */}
          <div className="bg-space-card rounded-lg p-8 flex items-center justify-center min-h-[400px] relative z-10">
            <div className="text-center">
              <div className="w-96 h-96 mx-auto mb-4 overflow-hidden rounded-lg border-2 border-space-header/30">
                <img
                  src={`/images/planets/${basic.id}.jpg`}
                  alt={`${basic.name} - High resolution NASA photograph`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-space-button rounded-lg flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <span className="text-6xl">🪐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="space-y-6">
            <div className="bg-space-card p-6 rounded-lg relative z-10">
              <h2 className="text-2xl font-header text-space-header mb-4">Quick Facts</h2>
              <div className="space-y-3 text-space-text font-body">
                <div className="flex justify-between">
                  <span className="font-semibold">Diameter:</span>
                  <span>{basic.diameter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Distance from Sun:</span>
                  <span>{basic.distanceFromSun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Orbital Period:</span>
                  <span>{basic.orbitalPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Moons:</span>
                  <span>{basic.moons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Rings:</span>
                  <span>{basic.hasRings ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            <div className="bg-space-card p-6 rounded-lg relative z-10">
              <h2 className="text-2xl font-header text-space-header mb-4">Interesting Facts</h2>
              <div className="space-y-4">
                {details.interestingFacts.map((fact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-space-header text-xs">•</span>
                    <p className="text-space-text font-body">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
