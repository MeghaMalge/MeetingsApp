(function () {
  let loginForm;
  loginForm = document.getElementById("login-form");

  function addEventListeners() {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const credentials = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
      };
     
      login(credentials)
        .then(function (loginResponse) {
          console.log(loginResponse);
          window.location.assign("../calendar.html");
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  }

  window.addEventListener("load", function () {
    loginForm = document.getElementById("login-form");
    addEventListeners();
  });
})();
