(function () {
  let Register;
  // Register = document.getElementById("register-form");

  function addEventListeners() {
    Register.addEventListener("submit", function (event) {
      event.preventDefault();

      const user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
      };

      register(user)
        .then(function (registerResponse) {
          console.log(registerResponse);
          return registerResponse;
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  }

  window.addEventListener("load", function () {
    registerForm = document.getElementById("register-form");

    addEventListeners();
  });
})();
