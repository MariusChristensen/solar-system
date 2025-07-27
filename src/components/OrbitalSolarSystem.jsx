"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import PlanetCard from "./PlanetCard";

// Planet orbital data - distances are scaled for visual appeal
const ORBITAL_DATA = {
  mercury: { distance: 80, angle: 0, size: 12, image: "/images/mercury.png" },
  venus: { distance: 110, angle: 45, size: 18, image: "/images/venus.png" },
  earth: { distance: 140, angle: 90, size: 20, image: "/images/earth.png" },
  mars: { distance: 170, angle: 135, size: 15, image: "/images/mars.png" },
  jupiter: {
    distance: 220,
    angle: 180,
    size: 42,
    image: "/images/jupiter.png",
  },
  saturn: { distance: 270, angle: 225, size: 36, image: "/images/saturn.png" },
  uranus: { distance: 320, angle: 270, size: 27, image: "/images/uranus.png" },
  neptune: {
    distance: 370,
    angle: 315,
    size: 26,
    image: "/images/neptune.png",
  },
};

// Reusable orbital animation configuration
const ORBITAL_ANIMATION = {
  rotate: 360,
  transition: {
    duration: 120,
    repeat: Infinity,
    ease: "linear",
  },
};

export default function OrbitalSolarSystem({ planets }) {
  const [focusedPlanet, setFocusedPlanet] = useState(null);
  const [isHoveringAnyPlanet, setIsHoveringAnyPlanet] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const controls = useAnimationControls();

  const handlePlanetClick = (planet) => {
    // Clear hover states when focusing
    setIsHoveringAnyPlanet(false);
    setHoveredPlanet(null);
    setFocusedPlanet(planet);
  };

  const handleBackToOrbital = () => {
    setFocusedPlanet(null);
  };

  // Start rotation on mount AND when returning from focus
  useEffect(() => {
    if (!focusedPlanet) {
      // Auto-trigger the rescue sequence with delay for component to settle
      setTimeout(() => {
        setIsHoveringAnyPlanet(true);
        setTimeout(() => setIsHoveringAnyPlanet(false), 100);
      }, 500);
    }
  }, [focusedPlanet]);

  // Simple hover control
  useEffect(() => {
    if (isHoveringAnyPlanet) {
      controls.stop(); // Pause at current position
    } else {
      controls.start(ORBITAL_ANIMATION);
    }
  }, [isHoveringAnyPlanet, controls]);

  const getPlanetPosition = (planetId) => {
    const orbital = ORBITAL_DATA[planetId];
    if (!orbital) return { x: 0, y: 0 };

    const angleRad = (orbital.angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * orbital.distance;
    const y = Math.sin(angleRad) * orbital.distance;

    return { x, y };
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!focusedPlanet ? (
          // Orbital View
          <motion.div
            key="orbital"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto"
            style={{ width: "800px", height: "800px" }}
          >
            {/* Orbital Rings */}
            {Object.values(ORBITAL_DATA).map((orbital, index) => (
              <div
                key={index}
                className="absolute border border-space-text/10 rounded-full"
                style={{
                  width: orbital.distance * 2,
                  height: orbital.distance * 2,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* Sun - Centered */}
            <div
              className="absolute rounded-full shadow-lg shadow-yellow-400/50"
              style={{
                width: "40px",
                height: "40px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                backgroundImage: "url(/images/sun.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Rotating Planets Container */}
            <motion.div className="absolute inset-0" animate={controls}>
              {/* Planets */}
              {planets.map((planet) => {
                const position = getPlanetPosition(planet.id);
                const orbital = ORBITAL_DATA[planet.id];
                const isHovered = hoveredPlanet?.id === planet.id;
                const scale = isHovered ? 2.0 : 1;

                return (
                  <motion.button
                    key={planet.id}
                    onClick={() => handlePlanetClick(planet)}
                    onMouseEnter={() => {
                      setIsHoveringAnyPlanet(true);
                      setHoveredPlanet(planet);
                    }}
                    onMouseLeave={() => {
                      setIsHoveringAnyPlanet(false);
                      setHoveredPlanet(null);
                    }}
                    className="absolute rounded-full cursor-pointer"
                    style={{
                      width: `${orbital.size}px`,
                      height: `${orbital.size}px`,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      backgroundImage: `url(${orbital.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    title={planet.name}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          // Planet Focus View
          <motion.div
            key="focus"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-[600px] gap-12"
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBackToOrbital}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-space-header text-space-bg rounded-lg font-body"
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Solar System
            </motion.button>

            {/* Large Planet Visualization */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="flex-shrink-0"
            >
              <div
                className="rounded-full"
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundImage: `url(${ORBITAL_DATA[focusedPlanet.id].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            {/* Planet Info Card */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 max-w-md"
            >
              <PlanetCard planet={focusedPlanet} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
