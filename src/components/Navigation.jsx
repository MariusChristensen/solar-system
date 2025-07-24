"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PLANETS = [
  { id: "mercury", name: "Mercury" },
  { id: "venus", name: "Venus" },
  { id: "earth", name: "Earth" },
  { id: "mars", name: "Mars" },
  { id: "jupiter", name: "Jupiter" },
  { id: "saturn", name: "Saturn" },
  { id: "uranus", name: "Uranus" },
  { id: "neptune", name: "Neptune" },
];

export default function Navigation() {
  const [isPlanetsOpen, setIsPlanetsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const isActive = (path) => pathname === path;
  const isPlanetActive = () => pathname.startsWith("/planet/");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPlanetsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when navigating to other pages
  useEffect(() => {
    setIsPlanetsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-bg/90 backdrop-blur-sm border-b border-space-text/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center space-x-8">
          {/* Home */}
          <Link
            href="/"
            className={`px-6 py-3 rounded-lg font-body font-medium transition-all ${
              isActive("/")
                ? "bg-space-button text-space-header"
                : "text-space-text hover:text-space-header hover:bg-space-card"
            }`}
          >
            HOME
          </Link>

          {/* APOD */}
          <Link
            href="/apod"
            className={`px-6 py-3 rounded-lg font-body font-medium transition-all ${
              isActive("/apod")
                ? "bg-space-button text-space-header"
                : "text-space-text hover:text-space-header hover:bg-space-card"
            }`}
          >
            APOD
          </Link>

          {/* Planets Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsPlanetsOpen(!isPlanetsOpen)}
              className={`px-6 py-3 rounded-lg font-body font-medium transition-all flex items-center space-x-2 ${
                isPlanetActive()
                  ? "bg-space-button text-space-header"
                  : "text-space-text hover:text-space-header hover:bg-space-card"
              }`}
            >
              <span>PLANETS</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isPlanetsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isPlanetsOpen && (
              <div className="absolute top-full mt-2 left-0 bg-space-card border border-space-text/20 rounded-lg shadow-lg min-w-[200px]">
                {PLANETS.map((planet) => (
                  <Link
                    key={planet.id}
                    href={`/planet/${planet.id}`}
                    onClick={() => setIsPlanetsOpen(false)}
                    className={`block px-4 py-3 text-sm font-body transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      pathname === `/planet/${planet.id}`
                        ? "bg-space-button text-space-header"
                        : "text-space-text hover:text-space-header hover:bg-space-button/20"
                    }`}
                  >
                    {planet.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
