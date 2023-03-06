(function () {
  function showTeams(teams) {
    let teamsList = document.querySelector(".card-collection");
    let cards = teamsList.innerHTML;

    let teamsListStr = "";
    let allUsersOptionsStr = "";
    allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    teams.forEach(function (team) {
      let teamMembers = team.members.map(function (member) {
        return member.email;
      });
      let teamID = team._id;
      teamsListStr += `
            <div class="card">
                <div class="team-name">${team.name}</div>
                <div class="team-short-name">@${team.shortName}</div>
                <div>${team.description}</div>
                <div> 
                  <button type="submit" 
                          onclick="excuseYourself('${team._id}',this.closest('.card'))" 
                          class="excuse-yourself-btn"
                      >Excuse yourself
                  </button>
                </div>
                <div><span style="font-weight:bold">Members:</span>${teamMembers}</div>
                <div>
                  <span>
                    <label for="add-member"></label>
                    <select style="width:40%" id="add-member" class= "select-input"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
                  </span>
                  <button type="submit" 
                          class="add-btn" 
                          onclick=" addMember('${teamID}',this.closest('.card').querySelector('.select-input').value,this.closest('div').previousElementSibling
                          )"
                      >Add
                  </button>
                </div>
              </div>
            </div>
            `;
    });

    teamsList.innerHTML = teamsListStr + cards;
    addNewTeam();
    const addTeamBtn = document.querySelector(".add-team");
    const addTeamForm = document.querySelector(".team-form");
    addTeamBtn.addEventListener("click", function () {
      addTeamForm.classList.toggle("hide");
    });
  }

  window.addEventListener("load", function () {
    let user = document.getElementById("user");
    user.textContent = ` ${localStorage.getItem("email")}`;
    getAllUsers().then(function () {
      getTeams()
        .then(function (response) {
          showTeams(response);
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  });
})();
let allUsers = [];
function getAllUsers() {
  return getUserID()
    .then(function (response) {
      console.log(response);
      return response;
    })
    .then(function (users) {
      allUsers = users;
    });
}
