function register(user) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        // throw new Error(response.statusText);
        alert(response.statusText);
      }
      alert("Registered successfully");
      return response.json();
    })
    .then(function (registerResponse) {
      // console.log(registerResponse.status);
      alert(registerResponse.status);
      return registerResponse;
    });
}

function login(credentials) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(function (loginResponse) {
      localStorage.setItem("message", loginResponse.message);
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("email", loginResponse.email);
      localStorage.setItem("name", loginResponse.name);
      return loginResponse;
    });
}
function getMessage() {
  return localStorage.getItem("message");
}
function getToken() {
  return localStorage.getItem("token");
}
function getEmail() {
  return localStorage.getItem("email");
}
function getName() {
  return localStorage.getItem("name");
}
