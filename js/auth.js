//? ======================================
//? Authentication System with Validation
//? ======================================

//? -------  Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    return password.length >= 8;
}

function validatePasswordStrength(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        isValid: password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber,
        length: password.length >= 8,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar
    };
}

//? -------  Show Error Message
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.className = 'alert alert-danger';
        errorDiv.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

//? -------  Show Success Message
function showSuccess(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.className = 'alert alert-success';
        errorDiv.style.display = 'block';
    }
}

//? -------  Registration Handler
function handleRegistration(event) {
    event.preventDefault();

    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirmPassword = document.getElementById('regConfirm')?.value;

    // Validation
    if (!name || name.length < 2) {
        showError('registerError', 'Please enter a valid name (at least 2 characters)');
        return;
    }

    if (!validateEmail(email)) {
        showError('registerError', 'Please enter a valid email address');
        return;
    }

    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.isValid) {
        let errorMsg = 'Password must contain:\n';
        if (!passwordStrength.length) errorMsg += '- At least 8 characters\n';
        if (!passwordStrength.hasUpperCase) errorMsg += '- One uppercase letter\n';
        if (!passwordStrength.hasLowerCase) errorMsg += '- One lowercase letter\n';
        if (!passwordStrength.hasNumber) errorMsg += '- One number\n';

        showError('registerError', errorMsg.replace(/\n/g, '<br>'));
        return;
    }

    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showError('registerError', 'An account with this email already exists');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In production, this should be hashed!
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showSuccess('registerError', 'Account created successfully! Redirecting to login...');

    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

//? -------  Login Handler
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    // Validation
    if (!validateEmail(email)) {
        showError('loginError', 'Please enter a valid email address');
        return;
    }

    if (!password) {
        showError('loginError', 'Please enter your password');
        return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showError('loginError', 'Invalid email or password');
        return;
    }

    // Save current user
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    }));

    showSuccess('loginError', 'Login successful! Redirecting...');

    // Redirect to home after 1 second
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

//? -------  Check if User is Logged In
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
}

//? -------  Get Current User
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

//? -------  Logout Handler
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

//? -------  Initialize Authentication
function initializeAuth() {
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);

        // Real-time password strength indicator
        const passwordInput = document.getElementById('regPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', function () {
                const strength = validatePasswordStrength(this.value);
                // You can add visual feedback here if needed
            });
        }
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                handleLogout();
            }
        });
    }

    // Update UI based on auth status
    updateAuthUI();
}

//? -------  Update UI Based on Auth Status
function updateAuthUI() {
    const currentUser = getCurrentUser();
    const logoutBtn = document.getElementById('logoutBtn');
    const userIcon = document.querySelector('a[href="login.html"]');

    if (currentUser && logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        if (userIcon) {
            userIcon.innerHTML = `<i class="fa-solid fa-user"></i> ${currentUser.name}`;
            userIcon.href = '#';
            userIcon.style.pointerEvents = 'none';
        }
    } else if (logoutBtn) {
        logoutBtn.style.display = 'none';
    }
}

//? -------  Initialize on Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        validatePasswordStrength,
        handleRegistration,
        handleLogin,
        checkAuth,
        getCurrentUser,
        handleLogout
    };
}
