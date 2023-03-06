const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");
const emailEl = document.querySelector("#email");

function validatePassword() {
  const password = passwordEl.value.trim();
  const formGroupEl = passwordEl.closest(".form-group");
  const messageEl = formGroupEl.querySelector(".message");

  let error = "";

  // if( password.length === 0 ) {
  if (!password) {
    // empty string is considered as false
    error += "<div>Password cannot be empty</div>";
  } else {
    // uppercase
    const uppercasePat = /[A-Z]/;
    if (!uppercasePat.test(password)) {
      error += "<div>Password must have an uppercase character</div>";
    }

    // lowercase
    const lowercasePat = /[a-z]/;
    if (!lowercasePat.test(password)) {
      error += "<div>Password must have a lowercase character</div>";
    }

    /* digit */
    const digitPat = /[0-9]/;
    if (!digitPat.test(password)) {
      error += "<div>Password must have a digit</div>";
    }

    /* special characters */
    const specialPat = /[!@#$%^&*()]/;
    if (!specialPat.test(password)) {
      error += "<div>Password must have a special character</div>";
    }
  }

  messageEl.innerHTML = error;

  return error === "";
}

function validateConfirmPassword() {
  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();
  const formGroupEl = confirmPasswordEl.closest(".form-group");
  const messageEl = formGroupEl.querySelector(".message");

  let error = "";

  if (password !== confirmPassword) {
    error += "Password and confirm password must match";
  }

  messageEl.innerHTML = error;

  return error === "";
}

function validateEmail() {
  // for event listeners, this -> element where event happens (usernameEl)
  console.log("this = ", this);

  const email = emailEl.value.trim();
  const formGroupEl = emailEl.closest(".form-group");
  const messageEl = formGroupEl.querySelector(".message");

  let error = "";

  if (!email) {
    // empty string is considered as false
    error += "<div>Email cannot be empty</div>";
  }

  messageEl.innerHTML = error;

  return error === ""; // true for no error / false if input has errors
}

emailEl.addEventListener("blur", validateEmail);
emailEl.addEventListener("input", validateEmail);

passwordEl.addEventListener("blur", validatePassword);
passwordEl.addEventListener("input", validatePassword);

passwordEl.addEventListener("blur", validateConfirmPassword);
passwordEl.addEventListener("input", validateConfirmPassword);

confirmPasswordEl.addEventListener("blur", validateConfirmPassword);
confirmPasswordEl.addEventListener("input", validateConfirmPassword);

function validate() {
  let isValid = true;

  isValid = validateEmail() && isValid;
  isValid = validatePassword() && isValid;
  isValid = validateConfirmPassword() && isValid;

  return isValid;
}

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validate()) {
    this.submit();
    this.reset();
  }
});

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validate()) {
    this.submit();
    this.reset();
  }
});
