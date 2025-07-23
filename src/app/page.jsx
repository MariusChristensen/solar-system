"use client";

import { nasaPlanetApi } from "../lib/api/nasaPlanetApi.js";
import ApodViewer from "../components/ApodViewer.jsx";
import { useState, useEffect } from "react";

// Simple Planet Card Component
function PlanetCard({ planet, onDetails }) {
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

// Planet Details Modal
function PlanetDetails({ planetId, onClose }) {
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
