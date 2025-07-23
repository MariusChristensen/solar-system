"use client";

import React, { useState, useEffect } from "react";
import { nasaPlanetApi } from "../lib/api/nasaPlanetApi.js";
import ApodViewer from "../components/ApodViewer.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import PlanetDetails from "../components/PlanetDetails.jsx";

export default function Home() {
  const [planets, setPlanets] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showApod, setShowApod] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [planetsResponse, overviewResponse] = await Promise.all([
          nasaPlanetApi.getAllPlanets(),
          nasaPlanetApi.getSolarSystemOverview(),
        ]);

        if (planetsResponse.success) {
          setPlanets(planetsResponse.data);
        }

        if (overviewResponse.success) {
          setOverview(overviewResponse.data);
        }
      } catch (error) {
        console.error("Failed to load NASA data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-bg px-6">
        <div className="text-center">
          <h1 className="text-4xl font-header text-space-header mb-4">Loading Solar System...</h1>
          <p className="text-space-text font-body">Fetching data from NASA API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-bg px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-header font-bold text-space-header mb-4">Solar System Explorer</h1>
          <p className="text-xl text-space-text font-body mb-6">Explore our solar system with NASA API data</p>

          {/* APOD Button */}
          <div className="mb-8">
            <button
              onClick={() => setShowApod(true)}
              className="px-6 py-3 bg-space-header text-space-bg rounded-lg font-body text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              🌌 View NASA's Picture of the Day
            </button>
          </div>
        </div>

        {/* Planets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {planets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} onDetails={setSelectedPlanet} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-space-text/60 font-body text-sm">
          <p>Powered by NASA API & NASA APOD</p>
          <p className="mt-2">🚀 Real NASA data • 🌌 Simple & clean</p>
        </div>
      </div>

      {/* Planet Details Modal */}
      {selectedPlanet && <PlanetDetails planetId={selectedPlanet} onClose={() => setSelectedPlanet(null)} />}

      {/* APOD Viewer */}
      <ApodViewer isOpen={showApod} onClose={() => setShowApod(false)} />
    </div>
  );
}
