document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const openFormBtn = document.getElementById('open-form-btn');
  const closeFormBtn = document.getElementById('close-form-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const callerForm = document.getElementById('caller-form');
  const cardsStack = document.getElementById('cards-stack');
  const emptyState = document.getElementById('empty-state');

  // Fallback image URL
  const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';

  // Load initial caller data from localStorage
  let callers = JSON.parse(localStorage.getItem('callers_deck')) || [];

  // --- Modal Visibility Handlers ---
  const openModal = () => modalOverlay.classList.remove('hidden');
  const closeModal = () => {
    modalOverlay.classList.add('hidden');
    callerForm.reset();
  };

  openFormBtn.addEventListener('click', openModal);
  closeFormBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // --- Core Functions ---

  // Save array to localStorage and render
  const updateStorageAndRender = () => {
    localStorage.setItem('callers_deck', JSON.stringify(callers));
    renderCards();
  };

  // Create Caller Card HTML Element
  const createCardElement = (caller, index) => {
    const card = document.createElement('div');
    card.classList.add('caller-card');
    card.style.setProperty('--card-index', index);

    const avatarSrc = caller.imgUrl.trim() ? caller.imgUrl : DEFAULT_AVATAR;

    card.innerHTML = `
      <div class="card-top">
        <img src="${avatarSrc}" alt="${caller.name}" class="avatar" onerror="this.src='${DEFAULT_AVATAR}'">
        <div class="card-meta">
          <h3>${caller.name}</h3>
          <span class="tag">${caller.purpose}</span>
        </div>
      </div>
      <div class="card-body">
        ${caller.hometown ? `<p><i class="fa-solid fa-location-dot"></i> ${caller.hometown}</p>` : ''}
        ${caller.bio ? `<p><i class="fa-solid fa-align-left"></i> ${caller.bio}</p>` : ''}
      </div>
      <div class="card-footer">
        <button class="delete-card-btn" data-id="${caller.id}">
          <i class="fa-solid fa-trash-can"></i> Remove
        </button>
      </div>
    `;

    // Attach delete handler for this individual card
    const deleteBtn = card.querySelector('.delete-card-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCaller(caller.id);
    });

    return card;
  };

  // Render cards stack
  const renderCards = () => {
    cardsStack.innerHTML = '';

    if (callers.length === 0) {
      emptyState.classList.add('visible');
      cardsStack.style.display = 'none';
      return;
    }

    emptyState.classList.remove('visible');
    cardsStack.style.display = 'flex';

    callers.forEach((caller, index) => {
      const cardNode = createCardElement(caller, index);
      cardsStack.appendChild(cardNode);
    });
  };

  // --- Data Mutation Handlers ---

  // Form Submission
  callerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newCaller = {
      id: Date.now().toString(),
      name: document.getElementById('caller-name').value.trim(),
      imgUrl: document.getElementById('caller-img').value.trim(),
      purpose: document.getElementById('caller-purpose').value.trim(),
      hometown: document.getElementById('caller-hometown').value.trim(),
      bio: document.getElementById('caller-bio').value.trim(),
    };

    callers.push(newCaller);
    updateStorageAndRender();
    closeModal();
  });

  // Delete individual caller
  const deleteCaller = (id) => {
    callers = callers.filter(caller => caller.id !== id);
    updateStorageAndRender();
  };

  // Clear all callers
  clearAllBtn.addEventListener('click', () => {
    if (callers.length === 0) return;
    if (confirm('Are you sure you want to remove all caller cards?')) {
      callers = [];
      updateStorageAndRender();
    }
  });

  // Initial render
  renderCards();
});