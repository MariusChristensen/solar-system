export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-bg px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-header font-bold text-space-header mb-6">Solar System</h1>
        <p className="text-xl md:text-2xl text-space-text mb-8 font-body max-w-2xl mx-auto">
          Explore the wonders of our solar system with real NASA data
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-space-button text-space-text rounded-lg font-body text-lg hover:opacity-80 transition-opacity shadow-lg">
            Explore Planets
          </button>
          <button className="px-8 py-4 bg-space-card text-space-text rounded-lg font-body text-lg hover:opacity-80 transition-opacity shadow-lg">
            View NASA Data
          </button>
        </div>
      </div>
    </div>
  );
}
