document.getElementById('signUpBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const user = {
        username,
        email,
        phone,
        password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';

    window.location.href = 'index.html';
});
