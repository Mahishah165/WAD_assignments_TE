document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("authForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitBtn = document.getElementById("submitBtn");
    const formTitle = document.getElementById("formTitle");
    const toggleText = document.getElementById("toggleText");
    const toggleForm = document.getElementById("toggleForm");

    const welcomeText = document.getElementById("welcomeText");
    const logoutButton = document.getElementById("logout");

    let isLoginMode = true; // Default is login mode

    // Toggle between Login and Signup
    document.addEventListener("click", function (event) {
        if (event.target.id === "toggleForm") {
            event.preventDefault();
            isLoginMode = !isLoginMode;
    
            formTitle.textContent = isLoginMode ? "Login" : "Sign Up";
            submitBtn.textContent = isLoginMode ? "Login" : "Sign Up";
            toggleText.innerHTML = isLoginMode
                ? "Don't have an account? <a href='#' id='toggleForm'>Sign Up</a>"
                : "Already have an account? <a href='#' id='toggleForm'>Login</a>";
        }
    });
    

    // Handle Login / Signup
    if (authForm) {
        authForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                alert("Please enter a username and password!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let existingUser = users.find(user => user.username === username);

            if (isLoginMode) {
                // Login process
                if (existingUser && existingUser.password === password) {
                    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
                    window.location.href = "home.html";
                } else {
                    alert("Invalid username or password!");
                }
            } else {
                // Signup process
                if (existingUser) {
                    alert("User already exists! Try logging in.");
                } else {
                    const newUser = { username, password };

                    // Simulating AJAX
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://jsonplaceholder.typicode.com/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onload = function () {
                        if (xhr.status === 201) {
                            users.push(newUser);
                            localStorage.setItem("users", JSON.stringify(users));
                            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
                            alert("Signup successful!");
                            window.location.href = "home.html";
                        } else {
                            alert("Error storing data.");
                        }
                    };
                    xhr.send(JSON.stringify(newUser));
                }
            }
        });
    }

    // Home page greeting
    if (welcomeText) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            welcomeText.textContent = `Hello, ${loggedInUser.username}!`;
        } else {
            window.location.href = "index.html";
        }
    }

    // Logout function
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});
