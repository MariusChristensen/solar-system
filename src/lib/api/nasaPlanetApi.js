// Simple Solar System Data API

const SOLAR_SYSTEM_PLANETS = [
  {
    id: "mercury",
    name: "Mercury",
    description: "The smallest and innermost planet in our solar system.",
    diameter: "4,879 km",
    distanceFromSun: "57.9 million km",
    moons: 0,
    hasRings: false,
    orbitalPeriod: "88 Earth days",
    interesting_facts: "Has extreme temperature variations",
  },
  {
    id: "venus",
    name: "Venus",
    description: "The hottest planet with a thick toxic atmosphere.",
    diameter: "12,104 km",
    distanceFromSun: "108.2 million km",
    moons: 0,
    hasRings: false,
    orbitalPeriod: "225 Earth days",
    interesting_facts: "Rotates backwards compared to most planets",
  },
  {
    id: "earth",
    name: "Earth",
    description: "Our home planet, the only known planet with life.",
    diameter: "12,756 km",
    distanceFromSun: "149.6 million km",
    moons: 1,
    hasRings: false,
    orbitalPeriod: "365 Earth days",
    interesting_facts: "The only planet known to harbor life",
  },
  {
    id: "mars",
    name: "Mars",
    description: "The Red Planet with evidence of ancient water.",
    diameter: "6,792 km",
    distanceFromSun: "227.9 million km",
    moons: 2,
    hasRings: false,
    orbitalPeriod: "687 Earth days",
    interesting_facts: "Home to the largest volcano in the solar system",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    description: "The largest planet, a gas giant with many moons.",
    diameter: "142,984 km",
    distanceFromSun: "778.5 million km",
    moons: 95,
    hasRings: true,
    orbitalPeriod: "12 Earth years",
    interesting_facts: "Has a Great Red Spot storm larger than Earth",
  },
  {
    id: "saturn",
    name: "Saturn",
    description: "Famous for its spectacular ring system.",
    diameter: "120,536 km",
    distanceFromSun: "1.43 billion km",
    moons: 274,
    hasRings: true,
    orbitalPeriod: "29 Earth years",
    interesting_facts: "Less dense than water and would float",
  },
  {
    id: "uranus",
    name: "Uranus",
    description: "An ice giant tilted on its side.",
    diameter: "51,118 km",
    distanceFromSun: "2.87 billion km",
    moons: 28,
    hasRings: true,
    orbitalPeriod: "84 Earth years",
    interesting_facts: "Rotates on its side at 98-degree tilt",
  },
  {
    id: "neptune",
    name: "Neptune",
    description: "The windiest planet with supersonic winds.",
    diameter: "49,528 km",
    distanceFromSun: "4.5 billion km",
    moons: 16,
    hasRings: true,
    orbitalPeriod: "165 Earth years",
    interesting_facts: "Has winds reaching 2,100 km/h",
  },
];

class SolarSystemApi {
  // Get all planets
  async getAllPlanets() {
    return {
      success: true,
      data: SOLAR_SYSTEM_PLANETS,
      source: "Solar System Database",
      timestamp: new Date().toISOString(),
    };
  }

  // Get detailed planet information
  async getPlanetDetails(planetId) {
    const planet = SOLAR_SYSTEM_PLANETS.find((p) => p.id === planetId);

    if (!planet) {
      return {
        success: false,
        error: `Planet not found: ${planetId}`,
        timestamp: new Date().toISOString(),
      };
    }

    const details = {
      basic: {
        id: planet.id,
        name: planet.name,
        description: planet.description,
        lastUpdated: new Date().toISOString(),
      },
      physical: {
        diameter: planet.diameter,
        temperature: "Varies by planet",
        gravity: "Relative to Earth",
      },
      orbital: {
        distanceFromSun: planet.distanceFromSun,
        orbitalPeriod: planet.orbitalPeriod,
      },
      observational: {
        numberOfMoons: planet.moons,
        hasRings: planet.hasRings,
      },
      interestingFacts: [planet.interesting_facts],
    };

    return {
      success: true,
      data: details,
      source: "Solar System Database",
      timestamp: new Date().toISOString(),
    };
  }

  // Get solar system overview
  async getSolarSystemOverview() {
    const planets = SOLAR_SYSTEM_PLANETS;
    const overview = {
      totalPlanets: planets.length,
      totalMoons: planets.reduce((sum, p) => sum + p.moons, 0),
      planetsWithRings: planets.filter((p) => p.hasRings).length,
      extremes: {
        largest: "Jupiter",
        smallest: "Mercury",
        hottest: "Venus",
        coldest: "Neptune",
        mostMoons: "Saturn",
      },
      lastUpdated: new Date().toISOString(),
    };

    return {
      success: true,
      data: overview,
      source: "Solar System Database",
      timestamp: new Date().toISOString(),
    };
  }
}

export const nasaPlanetApi = new SolarSystemApi();
