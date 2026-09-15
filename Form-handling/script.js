const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');

const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resEmail = document.getElementById('resEmail');
const resTime = document.getElementById('resTime');
const resetBtn = document.getElementById('resetBtn');
const passwordHint = document.getElementById('passwordHint');
const meterSegments = document.querySelectorAll('.password-meter span');

// Toggle Password Visibility
togglePassword.addEventListener('click', () => {
  const type = password.type === 'password' ? 'text' : 'password';
  password.type = type;
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

password.addEventListener('input', () => {
  const value = password.value;
  const strength = [value.length >= 8, /[A-Z]/.test(value), /[0-9!@#$%^&*]/.test(value)].filter(Boolean).length;
  const labels = ['Use 8 or more characters', 'Getting stronger', 'Good password', 'Strong password'];

  meterSegments.forEach((segment, index) => segment.classList.toggle('filled', index < strength));
  passwordHint.textContent = labels[strength];
  passwordHint.dataset.strength = strength;
});

// Show Error Message
function showError(input, message) {
  const formControl = input.parentElement.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('.error-msg');
  small.innerText = message;
}

// Show Success Outline
function showSuccess(input) {
  const formControl = input.parentElement.parentElement;
  formControl.className = 'form-control success';
}

// Validate Email Format
function isValidEmail(emailVal) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailVal).toLowerCase());
}

// Validate Inputs Function
function validateForm() {
  let isValid = true;

  // Validate Username
  if (username.value.trim() === '') {
    showError(username, 'Full Name is required');
    isValid = false;
  } else if (username.value.trim().length < 3) {
    showError(username, 'Name must be at least 3 characters');
    isValid = false;
  } else {
    showSuccess(username);
  }

  // Validate Email
  if (email.value.trim() === '') {
    showError(email, 'Email address is required');
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  } else {
    showSuccess(email);
  }

  // Validate Password
  if (password.value.trim() === '') {
    showError(password, 'Password is required');
    isValid = false;
  } else if (password.value.trim().length < 8) {
    showError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    showSuccess(password);
  }

  // Validate Confirm Password
  if (confirmPassword.value.trim() === '') {
    showError(confirmPassword, 'Please confirm your password');
    isValid = false;
  } else if (confirmPassword.value.trim() !== password.value.trim()) {
    showError(confirmPassword, 'Passwords do not match');
    isValid = false;
  } else {
    showSuccess(confirmPassword);
  }

  return isValid;
}

// Form Submit Event
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Populate Results
    resName.innerText = username.value.trim();
    resEmail.innerText = email.value.trim();
    resTime.innerText = new Date().toLocaleTimeString();

    // Toggle View
    form.style.display = 'none';
    resultCard.classList.remove('hidden');
  }
});

// Reset Form Event
resetBtn.addEventListener('click', () => {
  form.reset();
  
  // Clear success/error classes
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(ctrl => ctrl.className = 'form-control');

  resultCard.classList.add('hidden');
  form.style.display = 'block';
  meterSegments.forEach(segment => segment.classList.remove('filled'));
  passwordHint.textContent = 'Use 8 or more characters';
  delete passwordHint.dataset.strength;
});