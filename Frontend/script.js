
// =====================================================
// ASHRAYA BUSINESS HUB
// FRONTEND APPLICATION
// REAL BACKEND AUTHENTICATION
// =====================================================

const API_URL = "http://localhost:5000";

// =====================================================
// ELEMENTS
// =====================================================

const loginScreen = document.getElementById("loginScreen");
const dashboardApp = document.getElementById("dashboardApp");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");

// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("ashrayaToken");
    const savedEmail = localStorage.getItem("ashrayaEmail");
    const savedUser = localStorage.getItem("ashrayaUser");

    if (token) {

        showDashboard();

        if (savedEmail) {
            const settingsEmail =
                document.getElementById("settingsEmail");

            if (settingsEmail) {
                settingsEmail.value = savedEmail;
            }
        }

        updateUserGreeting(savedUser);

    } else {

        showLogin();

    }

});

// =====================================================
// LOGIN
// =====================================================

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value.trim();

        if (!email || !password) {

            showToast(
                "Please enter your email and password."
            );

            return;
        }

        // Disable button while logging in

        const loginButton =
            loginForm.querySelector(
                'button[type="submit"]'
            );

        const originalButtonText =
            loginButton
                ? loginButton.innerHTML
                : "";

        if (loginButton) {

            loginButton.disabled = true;

            loginButton.innerHTML =
                "Signing in...";

        }

        try {

            // =====================================================
            // REAL BACKEND LOGIN
            // =====================================================

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            // =====================================================
            // LOGIN FAILED
            // =====================================================

            if (!response.ok) {

                showToast(
                    data.message ||
                    "Invalid email or password."
                );

                return;
            }

            // =====================================================
            // SAVE AUTHENTICATION
            // =====================================================

            localStorage.setItem(
                "ashrayaToken",
                data.token
            );

            localStorage.setItem(
                "ashrayaEmail",
                data.user?.email || email
            );

            localStorage.setItem(
                "ashrayaUser",
                JSON.stringify(
                    data.user || {}
                )
            );

            // Keep compatibility with existing frontend

            localStorage.setItem(
                "ashrayaLoggedIn",
                "true"
            );

            // =====================================================
            // SHOW DASHBOARD
            // =====================================================

            showDashboard();

            updateUserGreeting(
                data.user
            );

            showToast(
                "Welcome to ASHRAYA Business Hub"
            );

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            showToast(
                "Cannot connect to ASHRAYA server. Make sure the backend is running."
            );

        } finally {

            if (loginButton) {

                loginButton.disabled = false;

                loginButton.innerHTML =
                    originalButtonText;

            }

        }

    });

}

// =====================================================
// USER GREETING
// =====================================================

function updateUserGreeting(user) {

    let userName = "Ashritha";

    if (user) {

        if (typeof user === "string") {

            try {

                const parsedUser =
                    JSON.parse(user);

                if (parsedUser.name) {
                    userName = parsedUser.name;
                }

            } catch (error) {

                // Ignore invalid stored user

            }

        } else if (user.name) {

            userName = user.name;

        }

    }

    const topTitle =
        document.getElementById("topTitle");

    if (topTitle) {

        topTitle.textContent =
            `Good morning, ${userName}`;

    }

}

// =====================================================
// SHOW LOGIN
// =====================================================

function showLogin() {

    if (loginScreen) {

        loginScreen.style.display =
            "flex";

    }

    if (dashboardApp) {

        dashboardApp.classList.remove(
            "show"
        );

    }

}

// =====================================================
// SHOW DASHBOARD
// =====================================================

function showDashboard() {

    if (loginScreen) {

        loginScreen.style.display =
            "none";

    }

    if (dashboardApp) {

        dashboardApp.classList.add(
            "show"
        );

    }

}

// =====================================================
// PASSWORD
// =====================================================

function togglePassword() {

    const icon =
        document.querySelector(
            ".eye-btn i"
        );

    if (!passwordInput) {
        return;
    }

    if (passwordInput.type === "password") {

        passwordInput.type =
            "text";

        if (icon) {

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

        }

    } else {

        passwordInput.type =
            "password";

        if (icon) {

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );

        }

    }

}

// =====================================================
// NAVIGATION
// =====================================================

function showPage(pageName, clickedButton) {

    const pages =
        document.querySelectorAll(
            ".page"
        );

    pages.forEach(function (page) {

        page.classList.remove(
            "active-page"
        );

    });

    const selectedPage =
        document.getElementById(
            "page-" + pageName
        );

    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(function (item) {

        item.classList.remove(
            "active"
        );

    });

    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }

    const titles = {

        overview: [
            "BUSINESS OVERVIEW",
            "Good morning, Ashritha"
        ],

        customers: [
            "CUSTOMER MANAGEMENT",
            "Customer Management"
        ],

        projects: [
            "PROJECT MANAGEMENT",
            "Project Management"
        ],

        revenue: [
            "FINANCIAL MANAGEMENT",
            "Revenue & Expenses"
        ],

        analytics: [
            "BUSINESS INTELLIGENCE",
            "Business Analytics"
        ],

        "business-model": [
            "BUSINESS STRATEGY",
            "Business Model Canvas"
        ],

        settings: [
            "ACCOUNT SETTINGS",
            "Settings"
        ]

    };

    if (titles[pageName]) {

        const topGreeting =
            document.getElementById(
                "topGreeting"
            );

        const topTitle =
            document.getElementById(
                "topTitle"
            );

        if (topGreeting) {

            topGreeting.textContent =
                titles[pageName][0];

        }

        if (topTitle) {

            topTitle.textContent =
                titles[pageName][1];

        }

    }

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }

}

// =====================================================
// PAGE BY NAME
// =====================================================

function showPageByName(pageName) {

    const button =
        document.querySelector(
            `.nav-item[onclick*="'${pageName}'"]`
        );

    showPage(
        pageName,
        button
    );

}

// =====================================================
// MOBILE SIDEBAR
// =====================================================

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if (sidebar) {

        sidebar.classList.toggle(
            "open"
        );

    }

}

// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "ashrayaToken"
    );

    localStorage.removeItem(
        "ashrayaUser"
    );

    localStorage.removeItem(
        "ashrayaEmail"
    );

    localStorage.removeItem(
        "ashrayaLoggedIn"
    );

    showLogin();

    showToast(
        "You have been logged out."
    );

}

// =====================================================
// FORGOT PASSWORD
// =====================================================

function forgotPassword(event) {

    event.preventDefault();

    showToast(
        "Password recovery page will be connected next."
    );

}

// =====================================================
// TABLE SEARCH
// =====================================================

function searchTable(input, tableId) {

    const searchText =
        input.value.toLowerCase();

    const table =
        document.getElementById(
            tableId
        );

    if (!table) {
        return;
    }

    const rows =
        table.querySelectorAll(
            "tbody tr"
        );

    rows.forEach(function (row) {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(searchText)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    if (!toast || !toastMessage) {

        alert(message);

        return;

    }

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(function () {

        toast.classList.remove(
            "show"
        );

    }, 3000);

}

// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const sidebar =
                document.getElementById(
                    "sidebar"
                );

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }

    }
);
