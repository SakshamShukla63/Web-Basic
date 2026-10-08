/**
  Comprehensive list of ISO currencies mapped with country flags and symbols.
 */
const CURRENCIES = [
  { code: 'USD', name: 'United States Dollar', country: 'US', flag: 'us', symbol: '$' },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: 'eu', symbol: '€' },
  { code: 'GBP', name: 'British Pound Sterling', country: 'United Kingdom', flag: 'gb', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: 'in', symbol: '₹' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: 'jp', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: 'au', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: 'ca', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: 'ch', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: 'cn', symbol: '¥' },
  { code: 'AED', name: 'United Arab Emirates Dirham', country: 'United Arab Emirates', flag: 'ae', symbol: 'AED' },
  { code: 'AFN', name: 'Afghan Afghani', country: 'Afghanistan', flag: 'af', symbol: '؋' },
  { code: 'ALL', name: 'Albanian Lek', country: 'Albania', flag: 'al', symbol: 'L' },
  { code: 'AMD', name: 'Armenian Dram', country: 'Armenia', flag: 'am', symbol: '֏' },
  { code: 'ARS', name: 'Argentine Peso', country: 'Argentina', flag: 'ar', symbol: '$' },
  { code: 'BDT', name: 'Bangladeshi Taka', country: 'Bangladesh', flag: 'bd', symbol: '৳' },
  { code: 'BGN', name: 'Bulgarian Lev', country: 'Bulgaria', flag: 'bg', symbol: 'лв' },
  { code: 'BHD', name: 'Bahraini Dinar', country: 'Bahrain', flag: 'bh', symbol: 'BD' },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: 'br', symbol: 'R$' },
  { code: 'CLP', name: 'Chilean Peso', country: 'Chile', flag: 'cl', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', country: 'Colombia', flag: 'co', symbol: '$' },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', flag: 'cz', symbol: 'Kč' },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', flag: 'dk', symbol: 'kr' },
  { code: 'EGP', name: 'Egyptian Pound', country: 'Egypt', flag: 'eg', symbol: 'E£' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: 'hk', symbol: 'HK$' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', flag: 'hu', symbol: 'Ft' },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', flag: 'id', symbol: 'Rp' },
  { code: 'ILS', name: 'Israeli New Shekel', country: 'Israel', flag: 'il', symbol: '₪' },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', flag: 'kr', symbol: '₩' },
  { code: 'KWD', name: 'Kuwaiti Dinar', country: 'Kuwait', flag: 'kw', symbol: 'KD' },
  { code: 'LKR', name: 'Sri Lankan Rupee', country: 'Sri Lanka', flag: 'lk', symbol: 'Rs' },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: 'mx', symbol: '$' },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', flag: 'my', symbol: 'RM' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: 'no', symbol: 'kr' },
  { code: 'NPR', name: 'Nepalese Rupee', country: 'Nepal', flag: 'np', symbol: 'Rs' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: 'nz', symbol: 'NZ$' },
  { code: 'OMR', name: 'Omani Rial', country: 'Oman', flag: 'om', symbol: 'OMR' },
  { code: 'PKR', name: 'Pakistani Rupee', country: 'Pakistan', flag: 'pk', symbol: 'Rs' },
  { code: 'PLN', name: 'Polish Zloty', country: 'Poland', flag: 'pl', symbol: 'zł' },
  { code: 'QAR', name: 'Qatari Riyal', country: 'Qatar', flag: 'qa', symbol: 'QR' },
  { code: 'RON', name: 'Romanian Leu', country: 'Romania', flag: 'ro', symbol: 'lei' },
  { code: 'RUB', name: 'Russian Ruble', country: 'Russia', flag: 'ru', symbol: '₽' },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: 'sa', symbol: 'SR' },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: 'se', symbol: 'kr' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: 'sg', symbol: 'S$' },
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: 'th', symbol: '฿' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: 'tr', symbol: '₺' },
  { code: 'VND', name: 'Vietnamese Dong', country: 'Vietnam', flag: 'vn', symbol: '₫' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: 'za', symbol: 'R' }
];

// App State
let fromCurrency = CURRENCIES.find(c => c.code === 'USD');
let toCurrency = CURRENCIES.find(c => c.code === 'EUR');
let activeTarget = null; // 'from' or 'to' when opening selection modal

// DOM Elements
const amountInput = document.getElementById('amount-input');
const baseSymbol = document.getElementById('base-symbol');
const fromBtn = document.getElementById('from-btn');
const toBtn = document.getElementById('to-btn');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const fromCode = document.getElementById('from-code');
const toCode = document.getElementById('to-code');
const swapBtn = document.getElementById('swap-btn');
const resultText = document.getElementById('result-text');
const rateSubtext = document.getElementById('rate-subtext');
const copyBtn = document.getElementById('copy-btn');
const updateTime = document.getElementById('update-time');

// Modal Elements
const modal = document.getElementById('currency-modal');
const modalClose = document.getElementById('modal-close');
const currencySearch = document.getElementById('currency-search');
const currencyList = document.getElementById('currency-list');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  fetchExchangeRate();

  // Attach Event Listeners
  amountInput.addEventListener('input', fetchExchangeRate);
  
  fromBtn.addEventListener('click', () => openModal('from'));
  toBtn.addEventListener('click', () => openModal('to'));
  modalClose.addEventListener('click', closeModal);
  
  // Close modal when clicking on background backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  swapBtn.addEventListener('click', swapCurrencies);
  currencySearch.addEventListener('input', handleSearch);
  copyBtn.addEventListener('click', copyResultToClipboard);
});

// Update standard UI labels and symbols
function updateUI() {
  fromCode.textContent = fromCurrency.code;
  fromFlag.src = `https://flagcdn.com/w40/${fromCurrency.flag}.png`;
  fromFlag.alt = `${fromCurrency.code} Flag`;

  toCode.textContent = toCurrency.code;
  toFlag.src = `https://flagcdn.com/w40/${toCurrency.flag}.png`;
  toFlag.alt = `${toCurrency.code} Flag`;

  baseSymbol.textContent = fromCurrency.symbol;
}

// Fetch rates from public Open Exchange API
async function fetchExchangeRate() {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultText.textContent = '0.00';
    rateSubtext.textContent = 'Please enter a valid amount';
    return;
  }

  resultText.textContent = 'Calculating...';

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency.code}`);
    const data = await response.json();

    if (data.result === 'success') {
      const rate = data.rates[toCurrency.code];
      const convertedValue = (amount * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      resultText.textContent = `${toCurrency.symbol} ${convertedValue}`;
      rateSubtext.textContent = `1 ${fromCurrency.code} = ${rate.toFixed(4)} ${toCurrency.code}`;
      
      const now = new Date();
      updateTime.textContent = `Updated: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      throw new Error('API Rate Error');
    }
  } catch (error) {
    resultText.textContent = 'Error';
    rateSubtext.textContent = 'Unable to fetch exchange rates.';
  }
}

// Swap From & To Currencies
function swapCurrencies() {
  const temp = fromCurrency;
  fromCurrency = toCurrency;
  toCurrency = temp;

  updateUI();
  fetchExchangeRate();
}

// Modal Handlers
function openModal(target) {
  activeTarget = target;
  currencySearch.value = '';
  renderCurrencyList(CURRENCIES);
  modal.classList.add('active');
  currencySearch.focus();
}

function closeModal() {
  modal.classList.remove('active');
}

// Search Filter
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const filtered = CURRENCIES.filter(item => 
    item.code.toLowerCase().includes(query) ||
    item.name.toLowerCase().includes(query) ||
    item.country.toLowerCase().includes(query)
  );
  renderCurrencyList(filtered);
}

// Render dynamic list of currencies in Modal
function renderCurrencyList(list) {
  currencyList.innerHTML = '';

  if (list.length === 0) {
    currencyList.innerHTML = `<div style="padding: 1rem; text-align: center; color: #9ca3af;">No currencies found</div>`;
    return;
  }

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'currency-item';
    div.innerHTML = `
      <img src="https://flagcdn.com/w40/${item.flag}.png" class="flag-img" alt="${item.code}" />
      <div class="currency-item-info">
        <span class="currency-item-code">${item.code} - ${item.name}</span>
        <span class="currency-item-name">${item.country}</span>
      </div>
    `;

    div.addEventListener('click', () => {
      if (activeTarget === 'from') {
        fromCurrency = item;
      } else {
        toCurrency = item;
      }
      updateUI();
      closeModal();
      fetchExchangeRate();
    });

    currencyList.appendChild(div);
  });
}

// Copy calculated result
function copyResultToClipboard() {
  const text = `${amountInput.value} ${fromCurrency.code} = ${resultText.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });
}