"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StarField() {
  const [stars, setStars] = useState([]);

  // Generate stars only on client side to avoid hydration issues
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Use percentages for responsiveness
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // Size between 1-4px
      delay: Math.random() * 4, // Animation delay
      duration: Math.random() * 3 + 2, // Duration between 2-5 seconds
      opacity: Math.random() * 0.8 + 0.2, // Base opacity 0.2-1.0
    }));
    setStars(generatedStars);
  }, []);

  // Don't render anything until stars are generated
  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-white shadow-sm"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size * 1.5}px`,
            height: `${star.size * 1.5}px`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
