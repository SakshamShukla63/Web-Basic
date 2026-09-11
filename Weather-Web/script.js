// Weather Code Interpretation Map (WMO Standards)
const weatherCodes = {
  0: { label: 'Clear Sky', icon: 'sun', bg: 'linear-gradient(135deg, #0284c7 0%, #0f172a 100%)' },
  1: { label: 'Mainly Clear', icon: 'sun-medium', bg: 'linear-gradient(135deg, #0369a1 0%, #0f172a 100%)' },
  2: { label: 'Partly Cloudy', icon: 'cloud-sun', bg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' },
  3: { label: 'Overcast', icon: 'cloud', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
  45: { label: 'Foggy', icon: 'cloud-fog', bg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' },
  61: { label: 'Slight Rain', icon: 'cloud-rain', bg: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' },
  63: { label: 'Moderate Rain', icon: 'cloud-rain', bg: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' },
  65: { label: 'Heavy Rain', icon: 'cloud-lighting', bg: 'linear-gradient(135deg, #172554 0%, #0f172a 100%)' },
  71: { label: 'Snow Fall', icon: 'snowflake', bg: 'linear-gradient(135deg, #312e81 0%, #0f172a 100%)' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning', bg: 'linear-gradient(135deg, #4c1d95 0%, #0f172a 100%)' },
};

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');
const weatherContent = document.getElementById('weatherContent');

// Default City (New Delhi)
let currentCoords = { lat: 28.6139, lon: 77.2090, name: 'New Delhi', country: 'India' };

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData(currentCoords);
  setupSearch();
});

// Fetch Weather from Open-Meteo API
async function fetchWeatherData({ lat, lon, name, country }) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const res = await fetch(url);
    const data = await res.json();

    renderWeather(data, { name, country });
  } catch (err) {
    weatherContent.innerHTML = `<div class="glass-card" style="grid-column: 1/-1;">Error loading weather data. Please check your internet connection.</div>`;
  }
}

// Render Dashboard UI
function renderWeather(data, location) {
  const current = data.current;
  const daily = data.daily;
  const condition = weatherCodes[current.weather_code] || { label: 'Unknown', icon: 'cloud', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' };

  // Dynamically set background gradient
  document.body.style.background = condition.bg;

  weatherContent.innerHTML = `
    <!-- Main Current Weather Card -->
    <div class="glass-card main-card">
      <div>
        <div class="location-info">
          <h1>${location.name}</h1>
          <p>${location.country}</p>
        </div>

        <div class="temp-display">
          <div class="temp-number">${Math.round(current.temperature_2m)}°</div>
          <div>
            <div class="condition-tag">
              <i data-lucide="${condition.icon}"></i> ${condition.label}
            </div>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              Feels like ${Math.round(current.apparent_temperature)}°
            </p>
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon"><i data-lucide="wind"></i></div>
          <div class="metric-data">
            <h4>Wind Speed</h4>
            <p>${current.wind_speed_10m} km/h</p>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i data-lucide="droplets"></i></div>
          <div class="metric-data">
            <h4>Humidity</h4>
            <p>${current.relative_humidity_2m}%</p>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i data-lucide="cloud-rain"></i></div>
          <div class="metric-data">
            <h4>Precipitation</h4>
            <p>${current.precipitation} mm</p>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i data-lucide="thermometer"></i></div>
          <div class="metric-data">
            <h4>High / Low</h4>
            <p>${Math.round(daily.temperature_2m_max[0])}° / ${Math.round(daily.temperature_2m_min[0])}°</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 7-Day Forecast Card -->
    <div class="glass-card">
      <div class="forecast-title">7-Day Forecast</div>
      <div class="forecast-list">
        ${daily.time.map((time, idx) => {
          const dayName = new Date(time).toLocaleDateString('en-US', { weekday: 'short' });
          const dayCondition = weatherCodes[daily.weather_code[idx]] || { icon: 'cloud' };
          return `
            <div class="forecast-item">
              <div class="forecast-day">${idx === 0 ? 'Today' : dayName}</div>
              <div class="forecast-icon"><i data-lucide="${dayCondition.icon}"></i></div>
              <div class="forecast-temps">
                ${Math.round(daily.temperature_2m_max[idx])}° 
                <span>${Math.round(daily.temperature_2m_min[idx])}°</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Re-initialize Lucide Icons
  lucide.createIcons();
}

// City Auto-Complete Search Logic
function setupSearch() {
  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (query.length < 2) {
      suggestionsBox.style.display = 'none';
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          renderSuggestions(data.results);
        } else {
          suggestionsBox.style.display = 'none';
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}

function renderSuggestions(cities) {
  suggestionsBox.innerHTML = cities.map(city => `
    <div class="suggestion-item" data-lat="${city.latitude}" data-lon="${city.longitude}" data-name="${city.name}" data-country="${city.country || ''}">
      <span><strong>${city.name}</strong></span>
      <span style="color: var(--text-muted); font-size: 0.85rem;">${city.admin1 ? city.admin1 + ', ' : ''}${city.country || ''}</span>
    </div>
  `).join('');

  suggestionsBox.style.display = 'block';

  document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const lat = item.getAttribute('data-lat');
      const lon = item.getAttribute('data-lon');
      const name = item.getAttribute('data-name');
      const country = item.getAttribute('data-country');

      fetchWeatherData({ lat, lon, name, country });
      suggestionsBox.style.display = 'none';
      searchInput.value = '';
    });
  });
}