"use client";

import React, { useState, useEffect } from "react";
import { nasaApodApi } from "../lib/api/nasaApodApi.js";

export default function ApodViewer({ isOpen, onClose }) {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch today's APOD when component opens
  useEffect(() => {
    if (isOpen && !apod) {
      fetchTodaysApod();
    }
  }, [isOpen, apod]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
            <div className="text-white text-xl font-body">Loading...</div>
          </div>
        )}

        {apod && !loading && (
          <>
            {/* Image fills the entire modal */}
            {apod.mediaType === "image" ? (
              <img src={apod.url} alt="NASA Picture of the Day" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <iframe
                src={apod.url}
                title="NASA Picture of the Day"
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            )}

            {/* Floating controls over the image */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-6">
                <button
                  onClick={fetchTodaysApod}
                  disabled={loading}
                  className="px-6 py-3 backdrop-blur-sm text-white rounded-lg font-body hover:backdrop-blur-md transition-all disabled:opacity-50 drop-shadow-lg border border-white/20"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  Today
                </button>
                <button
                  onClick={onClose}
                  className="text-white transition-colors text-2xl w-12 h-12 flex items-center justify-center rounded-full hover:backdrop-blur-sm drop-shadow-lg border border-white/20"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  ×
                </button>
                <button
                  onClick={fetchRandomApod}
                  disabled={loading}
                  className="px-6 py-3 backdrop-blur-sm text-white rounded-lg font-body hover:backdrop-blur-md transition-all disabled:opacity-50 drop-shadow-lg border border-white/20"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  Random
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
