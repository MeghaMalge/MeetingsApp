let membersArray = [];
function appendMembers(member) {
  membersArray.push(member);
  const memberNode = document.createTextNode(`,${member}`);
  document.querySelector(".membersList").appendChild(memberNode);
}

(function () {
  const addTeamsList = document.querySelector(".members");
  let allUsers = [];
  function showUsersDropdown() {
    let allUsersOptionsStr = "";
    let addTeamsListStr = "";
    allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    addTeamsListStr += `<div class="membersList"><span style="font-weight:bold">Members:</span></div>
      <div>
        <span>
          <label for="member"></label>
          <select style="width:40%" class= "select-input" id="member"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
        </span>
        <button type="button" 
                class="add-btn" 
                onclick="appendMembers(this.closest('div').querySelector('.select-input').value)">Add
        </button>
      </div>
      `;

    addTeamsList.innerHTML = addTeamsListStr;
    return allUsersOptionsStr;
  }

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

  window.addEventListener("load", function () {
    let allUsersOptionsStr = "";
    getAllUsers().then(function () {
      showUsersDropdown();
    });
    allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });
    addNewTeam(allUsersOptionsStr);
  });
})();

console.log(membersArray);

function addNewTeam(users) {
  const addTeamForm = document.querySelector("#add-team");
  // var users; //;
  addTeamForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let selectInput = document.getElementById("add-member");
    console.log(selectInput.innerHTML);

    let team = {
      name: document.getElementById("team-name").value.trim(),
      shortName: document.getElementById("team-short-name").value.trim(),
      description: document.getElementById("team-description").value.trim(),
      members: membersArray,
    };
    if (true) {
      addTeam(team).then(function (addedTeam) {
        console.log(addedTeam._id);

        let newTeamMembers = addedTeam.members.map(function (newMember) {
          return newMember.email;
        });

        // let newAllMembersOption = "";
        // allUsers.forEach(function (user) {
        //   newAllMembersOption += `<option value="${user.email}">${user.email}</option> `;
        // });

        let addedNewTeam = `
      
            <div class="team-name">${addedTeam.name}</div>
            <div class="team-short-name">@${addedTeam.shortName}</div>
            <div>${addedTeam.description}</div>
            <div> 
              <button type="submit" 
                      onclick="excuseYourself('${addedTeam._id}',this.closest('.card'))" 
                      class="excuse-yourself-btn"
                  >Excuse yourself
              </button>
            </div>
            <div class="aaron"><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
            <div>
              <span>
                <label for="add-member"></label>
                <select style="width:40%" id="add-member" class= "select-input">${selectInput.innerHTML}</select>
              </span>
              <button type="submit" 
                      class="add-btn" 
                      onclick=" addMember('${addedTeam._id}',this.closest('.card').querySelector('.select-input').value,this.closest('div').previousElementSibling
                      )"
                  >Add
              </button>
            </div>
          </div>
       
        `;

        const parentNode = document.querySelector(".card-collection");
        const childNode = document.createElement("div");
        childNode.innerHTML = addedNewTeam;
        parentNode.insertBefore(childNode, document.getElementById("add-team"));
        childNode.classList.add("card");
        document.getElementById("add-team").classList.add("hide");
      });
    }
  });
}
