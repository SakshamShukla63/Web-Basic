# Atmosphere — Modern Weather Web Application

A sleek, modern, glassmorphic weather application built with pure Vanilla JavaScript, HTML5, and CSS3. Powered by the **Open-Meteo API**, Atmosphere provides real-time weather metrics, live geolocation auto-complete, dynamic weather backgrounds, and a 7-day forecast without requiring any API keys or rate-limit setups.

---

## Features

- **No API Key Required:** Uses Open-Meteo's free, high-throughput weather & geocoding endpoints (up to 10,000 requests/day).
- **Glassmorphic UI Design:** High-polish dark mode interface built with blur backdrops, CSS grid layouts, and Lucide vector icons.
- **Dynamic Adaptive Backgrounds:** Theme colors and background gradients shift dynamically based on real-time weather conditions (Clear, Clouds, Rain, Snow, Thunderstorms).
- **Global City Search & Auto-Complete:** Search any town or major city across the globe with live debounced suggestions.
- **Detailed Metrics:** View current temperature, feels-like temperature, wind speed, humidity, total precipitation, and daily high/low temperatures.
- **7-Day Forecast:** Clean daily forecast layout tracking temperature ranges and weather conditions across the week.
- **Zero Dependencies / Fast Load:** Built entirely with standard Web APIs (`fetch`, `DOM`), running smoothly across mobile, tablet, and desktop viewports.

---

## File Structure

```text
atmosphere-weather-app/
├── index.html       # Application markup and script/style links
├── style.css        # CSS variables, glassmorphic themes, responsive layout
├── script.js        # API integration, DOM rendering, and search logic
└── README.md        # Project documentation
```

---

## Getting Started

### Prerequisites

No build tools, bundlers, or Node.js packages are required! You only need a modern web browser (Google Chrome, Firefox, Safari, or Microsoft Edge).

### Running Locally

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/your-username/atmosphere-weather-app.git
   cd atmosphere-weather-app
   ```

2. **Open the application:**
   - Double-click `index.html` to open it in your browser, **OR**
   - Use VS Code's **Live Server** extension to launch a local server.

---

## API & Technology Stack

- **HTML5 & CSS3:** Custom CSS variables, CSS Flexbox & Grid, Backdrop Filters.
- **Vanilla JavaScript (ES6+):** Async/Await, Fetch API, Event Debouncing.
- **Weather Data:** [Open-Meteo Weather Forecast API](https://open-meteo.com/) (WMO weather condition codes).
- **Geocoding & Search:** [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
- **Icons:** [Lucide Icons CDN](https://lucide.dev/).
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.

---

## License

Distributed under the MIT License. Feel free to modify and use this project for personal or commercial portfolios!
