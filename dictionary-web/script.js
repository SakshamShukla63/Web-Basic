const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('result');
const error = document.getElementById('error');
const loading = document.getElementById('loading');
const wordEl = document.getElementById('word');
const phoneticEl = document.getElementById('phonetic');
const meaningsEl = document.getElementById('meanings');
const audioBtn = document.getElementById('audioBtn');

let audioUrl = '';

searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWord();
    }
});

audioBtn.addEventListener('click', () => {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    }
});

async function searchWord() {
    const word = searchInput.value.trim();

    if (!word) {
        showError('Please enter a word to search');
        return;
    }

    hideAll();
    loading.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();
        displayResult(data[0]);
    } catch (err) {
        showError(`Sorry, we couldn't find the word "${word}". Please check the spelling and try again.`);
    } finally {
        loading.classList.add('hidden');
    }
}

function displayResult(data) {
    hideAll();

    wordEl.textContent = data.word;

    if (data.phonetic) {
        phoneticEl.textContent = data.phonetic;
    } else if (data.phonetics && data.phonetics.length > 0) {
        phoneticEl.textContent = data.phonetics.find(p => p.text)?.text || '';
    }

    audioUrl = '';
    if (data.phonetics && data.phonetics.length > 0) {
        const audioPhonetic = data.phonetics.find(p => p.audio);
        if (audioPhonetic && audioPhonetic.audio) {
            audioUrl = audioPhonetic.audio;
            audioBtn.classList.remove('hidden');
        }
    }

    meaningsEl.innerHTML = '';

    data.meanings.forEach(meaning => {
        const meaningDiv = document.createElement('div');
        meaningDiv.className = 'meaning-item';

        const partOfSpeech = document.createElement('div');
        partOfSpeech.className = 'part-of-speech';
        partOfSpeech.textContent = meaning.partOfSpeech;
        meaningDiv.appendChild(partOfSpeech);

        meaning.definitions.slice(0, 3).forEach((def, index) => {
            const definitionDiv = document.createElement('div');
            definitionDiv.className = 'definition';
            definitionDiv.innerHTML = `<strong>${index + 1}.</strong> ${def.definition}`;
            meaningDiv.appendChild(definitionDiv);

            if (def.example) {
                const exampleDiv = document.createElement('div');
                exampleDiv.className = 'example';
                exampleDiv.textContent = `"${def.example}"`;
                meaningDiv.appendChild(exampleDiv);
            }
        });

        if (meaning.synonyms && meaning.synonyms.length > 0) {
            const synonymsDiv = document.createElement('div');
            synonymsDiv.className = 'synonyms';
            synonymsDiv.innerHTML = `<strong>Synonyms:</strong> <span class="synonym-list">${meaning.synonyms.slice(0, 5).join(', ')}</span>`;
            meaningDiv.appendChild(synonymsDiv);
        }

        meaningsEl.appendChild(meaningDiv);
    });

    result.classList.remove('hidden');
}

function showError(message) {
    hideAll();
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideAll() {
    result.classList.add('hidden');
    error.classList.add('hidden');
    audioBtn.classList.add('hidden');
}
