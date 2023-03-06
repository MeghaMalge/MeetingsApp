
  function getUserID() {
    return fetch(`https://mymeetingsapp.herokuapp.com/api/users`, {
      method: "GET",

      headers: {
        Authorization: `${localStorage.getItem(`token`)}`,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(function (usersResponse) {
        // console.log(usersResponse);
       
        return usersResponse;
        

        // console.log(findUser(usersResponse));
      });
  }
  getUserID();

  

