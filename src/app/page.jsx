"use client";

import React, { useState, useEffect } from "react";
import { nasaPlanetApi } from "../lib/api/nasaPlanetApi.js";
import OrbitalSolarSystem from "../components/OrbitalSolarSystem.jsx";

export default function Home() {
  const [planets, setPlanets] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-4xl font-header text-space-header mb-4">
            Loading Solar System...
          </h1>
          <p className="text-space-text font-body">
            Fetching data from NASA API...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-bg px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-header font-bold text-space-header mb-4">
            Solar System Explorer
          </h1>
        </div>

        {/* Orbital Solar System */}
        <OrbitalSolarSystem planets={planets} />

        {/* Footer */}
        <div className="mt-12 text-center text-space-text/60 font-body text-sm">
          <p>Powered by NASA API & NASA APOD</p>
        </div>
      </div>
    </div>
  );
}
