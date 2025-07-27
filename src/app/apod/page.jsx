"use client";

import React, { useState, useEffect } from "react";
import { nasaApodApi } from "../../lib/api/nasaApodApi.js";

export default function ApodPage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaysApod();
  }, []);

  const fetchTodaysApod = async () => {
    setLoading(true);
    try {
      const response = await nasaApodApi.getTodaysApod();
      if (response.success) {
        setApod(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch APOD");
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomApod = async () => {
    setLoading(true);
    try {
      const response = await nasaApodApi.getRandomApod();
      if (response.success) {
        setApod(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch random APOD");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-header text-space-header mb-4">Loading NASA Picture...</h1>
          <p className="text-space-text font-body">Fetching today's astronomy picture from NASA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-bg px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-header font-bold text-space-header mb-4">
            NASA Astronomy Picture of the Day
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              onClick={fetchTodaysApod}
              disabled={loading}
              className="px-6 py-3 bg-space-header text-space-bg rounded-lg font-body text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Today's Picture
            </button>
            <button
              onClick={fetchRandomApod}
              disabled={loading}
              className="px-6 py-3 bg-space-button text-space-text rounded-lg font-body text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Random Picture
            </button>
          </div>
        </div>

        {apod && (
          <div className="bg-space-card rounded-lg overflow-hidden shadow-lg relative z-10">
            {/* Image/Video */}
            <div className="aspect-video bg-black">
              {apod.mediaType === "image" ? (
                <img src={apod.hdurl || apod.url} alt={apod.title} className="w-full h-full object-contain" />
              ) : (
                <iframe src={apod.url} title={apod.title} className="w-full h-full" allowFullScreen />
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-header text-space-header">{apod.title}</h2>
                <span className="text-sm text-space-text/60 font-body">{apod.date}</span>
              </div>

              <p className="text-space-text font-body leading-relaxed mb-4">{apod.explanation}</p>

              {apod.copyright && <p className="text-sm text-space-text/60 font-body">© {apod.copyright}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
