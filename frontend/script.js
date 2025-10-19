  const formWrapper = document.getElementById("formWrapper");

        // Links to switch forms
        const loginLink = document.getElementById("loginLink");
        const registerLink = document.getElementById("registerLink");

        loginLink.addEventListener("click", () => {
            formWrapper.style.transform = "translateX(-50%)"; // Slide left to show login
        });

        registerLink.addEventListener("click", () => {
            formWrapper.style.transform = "translateX(0%)"; // Slide right to show register
        });

        // Register functionality
        const fullName = document.getElementById("fullName");
        const regEmail = document.getElementById("regEmail");
        const phoneNumber = document.getElementById("phoneNumber");
        const userName = document.getElementById("userName");
        const regPassword = document.getElementById("regPassword");
        const confirmPassword = document.getElementById("confirmPassword");
        const registerBtn = document.getElementById("registerBtn");

        registerBtn.addEventListener("click", () => {
            if (!fullName.value || !regEmail.value || !phoneNumber.value || !userName.value || !regPassword.value || !confirmPassword.value) {
                alert("Fill the form!");
                return;
            }

            if (regPassword.value !== confirmPassword.value) {
                alert("Password does not match!");
                return;
            }

            if (regPassword.value.length < 8) {
                alert("Password must be at least 8 characters!");
                return;
            }

            if (!userName.value.startsWith("@")) {
                alert("Username must start with '@'");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(u => u.email === regEmail.value)) {
                alert("Email already registered!");
                return;
            }

            if (users.some(u => u.phoneNumber === phoneNumber.value)) {
                alert("Phone Number already registered!");
                return;
            }

            if (users.some(u => u.userName === userName.value)) {
                alert("Username already taken!");
                return;
            }

            users.push({
                fullName: fullName.value,
                email: regEmail.value,
                phoneNumber: phoneNumber.value,
                password: regPassword.value,
                userName: userName.value
            });

            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration Successful!");
            formWrapper.style.transform = "translateX(-50%)"; // Show login form
        });

        // Login functionality
        const loginEmail = document.getElementById("loginEmail");
        const loginPassword = document.getElementById("loginPassword");
        const loginBtn = document.getElementById("loginBtn");

        loginBtn.addEventListener("click", () => {
            const uname = loginEmail.value;
            const uPass = loginPassword.value;

            if (!uname || !uPass) {
                alert("Fill the form!");
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => (u.userName === uname || u.email === uname) && u.password === uPass);

            if (user) {
                alert("Login Successful! Welcome, " + user.fullName);
                window.location.href = "profile.html";
            } else {
                alert("Invalid username/email or password!");
            }
        });