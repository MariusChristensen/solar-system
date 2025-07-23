// Simple NASA APOD API Service

const NASA_API_BASE = "https://api.nasa.gov";

class NasaApodApi {
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
  }

  // Get today's APOD
  async getTodaysApod() {
    try {
      const url = `${NASA_API_BASE}/planetary/apod?api_key=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          title: data.title,
          explanation: data.explanation,
          date: data.date,
          url: data.url,
          hdurl: data.hdurl,
          mediaType: data.media_type,
          copyright: data.copyright,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get random APOD
  async getRandomApod() {
    try {
      const url = `${NASA_API_BASE}/planetary/apod?api_key=${this.apiKey}&count=1`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }

      const data = await response.json();
      const apodData = data[0]; // Random endpoint returns array

      return {
        success: true,
        data: {
          title: apodData.title,
          explanation: apodData.explanation,
          date: apodData.date,
          url: apodData.url,
          hdurl: apodData.hdurl,
          mediaType: apodData.media_type,
          copyright: apodData.copyright,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const nasaApodApi = new NasaApodApi();
