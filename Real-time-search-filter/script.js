// Add unique IDs to objects to make deletion precise
let users = [
    {
        id: "1",
        name: "amisha rathore",
        pic: "https://images.unsplash.com/photo-1440589473619-3cde28941638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Learning to love the slow days. ☕"
    },
    {
        id: "2",
        name: "aarav sharma",
        pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Chasing sunsets and clean code. 🌅💻"
    },
    {
        id: "3",
        name: "riya kapoor",
        pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Designing interfaces by day, reading fantasy by night. 📚"
    },
    {
        id: "4",
        name: "rohan mehta",
        pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Coffee addict, full-stack builder, outdoor enthusiast. ☕🏔️"
    },
    {
        id: "5",
        name: "amira verma",
        pic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Capturing candid moments in a noisy world. 📸"
    },
    {
        id: "6",
        name: "vikram singh",
        pic: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Building digital products that scale. 🚀"
    },
    {
        id: "7",
        name: "sneha gupta",
        pic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Plant mom 🌱 | UI/UX Explorer | Tea over coffee 🍵"
    },
    {
        id: "8",
        name: "karan patel",
        pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Exploring beat drops and frontend frameworks. 🎧"
    },
    {
        id: "9",
        name: "divya joshi",
        pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Curating aesthetic spaces and digital experiences. ✨"
    },
    {
        id: "10",
        name: "siddharth roy",
        pic: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Debugging life one line of code at a time. 🐛"
    },
    {
        id: "11",
        name: "meera nair",
        pic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Minimalist layout lover & typography nerd. 🎨"
    },
    {
        id: "12",
        name: "kabir verma",
        pic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        bio: "Architecting cloud systems by day, playing bass by night. 🎸☁️"
    }
];

// DOM Elements
const cardsContainer = document.getElementById('cards-container');
const searchInput = document.getElementById('search-input');
const modalOverlay = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addUserForm = document.getElementById('add-user-form');

// Render Cards
function renderUsers(list) {
    if (!list.length) {
        cardsContainer.innerHTML = '<p class="no-results">No profiles found.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    list.forEach(({ id, name, pic, bio }) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <button class="delete-btn" data-id="${id}" title="Remove profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
            <img src="${pic}" alt="${name}" class="bg-img" loading="lazy">
            <div class="blurred-layer" style="background-image: url('${pic}')"></div>
            <div class="content">
                <h3>${name}</h3>
                <p>${bio}</p>
            </div>
        `;
        fragment.appendChild(card);
    });

    cardsContainer.replaceChildren(fragment);
}

// Remove Profile Handler
cardsContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (!deleteBtn) return;

    const userId = deleteBtn.getAttribute('data-id');
    users = users.filter(user => user.id !== userId);
    
    // Refresh list based on current search input value
    filterAndRender();
});

// Search Filtering & Debounce
function filterAndRender() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = users.filter(({ name, bio }) =>
        name.toLowerCase().includes(query) || bio.toLowerCase().includes(query)
    );
    renderUsers(filtered);
}

function debounce(func, delay = 200) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

searchInput.addEventListener('input', debounce(filterAndRender));

// Modal Controls
function toggleModal(show) {
    if (show) {
        modalOverlay.classList.add('active');
    } else {
        modalOverlay.classList.remove('active');
        addUserForm.reset();
    }
}

openModalBtn.addEventListener('click', () => toggleModal(true));
closeModalBtn.addEventListener('click', () => toggleModal(false));
cancelModalBtn.addEventListener('click', () => toggleModal(false));

// Close modal when clicking dark backdrop
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) toggleModal(false);
});

// Add New Profile Handler
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newName = document.getElementById('user-name').value.trim();
    const newPic = document.getElementById('user-pic').value.trim();
    const newBio = document.getElementById('user-bio').value.trim();

    const newUser = {
        id: Date.now().toString(),
        name: newName,
        pic: newPic,
        bio: newBio
    };

    // Prepend to display new object first
    users.unshift(newUser);

    filterAndRender();
    toggleModal(false);
});

// Initial Render
renderUsers(users);