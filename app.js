const staffAccounts =
  [
    { id: 'STAFF001', password: '1234', name: 'John' },
    { id: 'STAFF002', password: 'abcd', name: 'Mary' },
    { id: 'STAFF003', password: 'pass', name: 'Kiran' }
  ];


function sendRegOtp() {
  const phone = document.getElementById('regPhone').value.trim();
  if (!phone) { alert('Enter phone number'); return; }
  // For the assignment: only the number entered here can later login.
  // Generate dummy OTP and store temporarily
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  localStorage.setItem('reg_pending_phone', phone);
  localStorage.setItem('reg_pending_otp', otp);
  alert('Dummy OTP (for prototype): ' + otp);
  // autofill OTP field (optional)
  const el = document.getElementById('regOtp'); if (el) el.value = otp;
}

function completeRegistration() {
  const phone = document.getElementById('regPhone').value.trim();
  const otp = (document.getElementById('regOtp') && document.getElementById('regOtp').value.trim()) || '';
  const pendingPhone = localStorage.getItem('reg_pending_phone');
  const pendingOtp = localStorage.getItem('reg_pending_otp');
  if (!phone || !otp) { alert('Enter phone and OTP'); return; }
  if (phone !== pendingPhone) { alert('Phone does not match the one used to request OTP'); return; }
  if (otp !== pendingOtp) { alert('Invalid OTP'); return; }
  // Save as registered number (only one for prototype)
  localStorage.setItem('registered_phone', phone);
  // clear pending
  localStorage.removeItem('reg_pending_phone'); localStorage.removeItem('reg_pending_otp');
  alert('Registration successful. You can now login using this phone number.');
  window.location = 'citizen_login.html';
}


function sendLoginOtp() {
  const phone = document.getElementById('loginPhone').value.trim();
  const registered = localStorage.getItem('registered_phone');
  if (!phone) { alert('Enter phone number'); return; }
  if (!registered) { alert('No registered phone found. Please register first.'); return; }
  if (phone !== registered) { alert('This phone is not registered. Use the registered phone number.'); return; }
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  localStorage.setItem('login_pending_phone', phone);
  localStorage.setItem('login_pending_otp', otp);
  alert('Dummy Login OTP (for prototype): ' + otp);
  const el = document.getElementById('loginOtp'); if (el) el.value = otp;
}

function completeLogin() {
  const phone = document.getElementById('loginPhone').value.trim();
  const otp = (document.getElementById('loginOtp') && document.getElementById('loginOtp').value.trim()) || '';
  const pendingPhone = localStorage.getItem('login_pending_phone');
  const pendingOtp = localStorage.getItem('login_pending_otp');
  const registered = localStorage.getItem('registered_phone');
  if (!phone || !otp) { alert('Enter phone and OTP'); return; }
  if (phone !== registered) { alert('This phone is not registered.'); return; }
  if (phone !== pendingPhone) { alert('Phone does not match OTP request. Click Send OTP again.'); return; }
  if (otp !== pendingOtp) { alert('Invalid OTP'); return; }
  // Login success - store current citizen
  localStorage.setItem('current_citizen', phone);
  // cleanup pending
  localStorage.removeItem('login_pending_phone'); localStorage.removeItem('login_pending_otp');
  alert('Login successful (prototype). Redirecting to Citizen Home.');
  window.location = 'citizen_home.html';
}


function staffLogin() {
  const id = (document.getElementById('staffId') && document.getElementById('staffId').value.trim()) || '';
  const pass = (document.getElementById('staffPass') && document.getElementById('staffPass').value.trim()) || '';
  if (!id || !pass) { alert('Enter staff id and password'); return; }
  const staff = staffAccounts.find(s => s.id === id && s.password === pass);
  if (!staff) { alert('Invalid staff credentials'); return; }
  localStorage.setItem('current_staff', JSON.stringify(staff));
  alert('Staff login successful (prototype). Redirecting...');
  window.location = 'staff_home.html';
}
