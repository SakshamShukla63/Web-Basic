// Quick DOM query shortcuts
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const squares = Array.from($$('.sq'));
const turnTxt = $('#turn-display');
const statusTxt = $('#status');
const xScoreTxt = $('#score-x');
const oScoreTxt = $('#score-o');

const WIN_LINES = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]          // diags
];

let board = Array(9).fill('');
let p1Turn = true;
let active = true;
let wins = { x: 0, o: 0 };

// Load persistence if available
try {
  const saved = localStorage.getItem('ttt_data');
  if (saved) {
    const data = JSON.parse(saved);
    board = data.board || board;
    p1Turn = data.p1Turn ?? true;
    active = data.active ?? true;
    wins = data.wins || wins;
    syncUI();
  }
} catch (e) {
  console.warn('LocalStorage unavailable, running in-memory.');
}

function save() {
  try {
    localStorage.setItem('ttt_data', JSON.stringify({ board, p1Turn, active, wins }));
  } catch(e) {}
}

function checkWinner() {
  for (let line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.includes('') ? null : { tie: true };
}

function handleClick(e) {
  const i = e.target.dataset.i;
  if (!i || board[i] || !active) return;

  const mark = p1Turn ? 'X' : 'O';
  board[i] = mark;
  e.target.textContent = mark;
  e.target.classList.add(mark.toLowerCase());

  const result = checkWinner();

  if (result) {
    active = false;
    if (result.winner) {
      const isX = result.winner === 'X';
      wins[isX ? 'x' : 'o']++;
      statusTxt.innerHTML = `<strong style="color:var(--${isX ? 'x' : 'o'}-color)">${result.winner} wins!</strong>`;
      
      result.line.forEach(idx => squares[idx].classList.add('highlight'));
    } else {
      statusTxt.textContent = "It's a draw!";
    }
    updateScores();
  } else {
    p1Turn = !p1Turn;
    turnTxt.textContent = p1Turn ? 'X' : 'O';
  }

  save();
}

function syncUI() {
  squares.forEach((sq, idx) => {
    const val = board[idx];
    sq.textContent = val;
    sq.className = 'sq' + (val ? ` ${val.toLowerCase()}` : '');
  });

  updateScores();

  const result = checkWinner();
  if (result && result.winner) {
    result.line.forEach(idx => squares[idx].classList.add('highlight'));
    statusTxt.innerHTML = `<strong style="color:var(--${result.winner === 'X' ? 'x' : 'o'}-color)">${result.winner} wins!</strong>`;
  } else if (result && result.tie) {
    statusTxt.textContent = "It's a draw!";
  } else {
    turnTxt.textContent = p1Turn ? 'X' : 'O';
  }
}

function updateScores() {
  xScoreTxt.textContent = wins.x;
  oScoreTxt.textContent = wins.o;
}

$('#grid').addEventListener('click', handleClick);

$('#reset-board').addEventListener('click', () => {
  board = Array(9).fill('');
  active = true;
  p1Turn = true;
  statusTxt.innerHTML = 'Turn: <strong id="turn-display">X</strong>';
  
  squares.forEach(sq => {
    sq.textContent = '';
    sq.className = 'sq';
  });
  
  save();
});

$('#clear-all').addEventListener('click', () => {
  localStorage.removeItem('ttt_data');
  wins = { x: 0, o: 0 };
  $('#reset-board').click();
});