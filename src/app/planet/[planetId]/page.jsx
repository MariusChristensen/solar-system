"use client";

import React from "react";
import PlanetPageContent from "../../../components/PlanetPageContent";

export default function PlanetPage({ params }) {
  const { planetId } = React.use(params);

  return <PlanetPageContent planetId={planetId} />;
}
