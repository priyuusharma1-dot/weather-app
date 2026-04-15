const form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");

    let valid = true;

    // Name validation
    if (name.value === "") {
        showError(name, "Name is required");
        valid = false;
    } else {
        clearError(name);
    }

    // Email validation
    if (!email.value.includes("@")) {
        showError(email, "Enter valid email");
        valid = false;
    } else {
        clearError(email);
    }

    // Phone validation
    if (phone.value.length !== 10 || isNaN(phone.value)) {
        showError(phone, "Enter valid 10 digit number");
        valid = false;
    } else {
        clearError(phone);
    }

    // Password validation
    if (password.value.length < 6) {
        showError(password, "Minimum 6 characters");
        valid = false;
    } else {
        clearError(password);
    }

    if (valid) {
        alert("Form Submitted Successfully ✅");
    }
});

function showError(input, message) {
    let small = input.nextElementSibling;
    small.innerText = message;
}

function clearError(input) {
    let small = input.nextElementSibling;
    small.innerText = "";
} 