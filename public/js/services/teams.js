const getTeams = function () {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/teams`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem(`token`)}`,
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
function addTeam(team) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/teams`, {
    method: "POST",
    body: JSON.stringify(team),
    headers: {
      Authorization: `${localStorage.getItem(`token`)}`,
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    window.alert("team added successfully");
    console.log(response);
    return response.json();
  });
}
function excuseYourself(teamID, teamCard) {
  console.log(teamID);
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/teams/${teamID}?action=remove_member`,
    {
      method: "PATCH",

      headers: {
        Authorization: `${localStorage.getItem(`token`)}`,
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    teamCard.remove();
    return response.json();
  });
}
function addMember(teamID, userID, memberList) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/teams/${teamID}?action=add_member&email=${userID}`,
    {
      method: "PATCH",

      headers: {
        Authorization: `${localStorage.getItem(`token`)}`,
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const memberNode = document.createTextNode(`,${userID}`);
    memberList.appendChild(memberNode);
    membersArray.append(memberList);
    console.log(membersArray);
    return response.json();
  });
}
