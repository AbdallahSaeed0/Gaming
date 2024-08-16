document.getElementById('sign-up-btn').addEventListener('click', function(e) {
    e.preventDefault();

    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(user => user.username === enteredUsername && user.password === enteredPassword);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});