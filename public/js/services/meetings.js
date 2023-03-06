function addMeeting(newMeeting) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/meetings`, {
    method: "POST",
    body: JSON.stringify(newMeeting),
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(function (addMeetingResponse) {
      window.alert("Meeting is added successfully");
      console.log(addMeetingResponse.description);
    });
}

const getMeetings = function (date) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response);
    return response.json();
  });
};

function filterMeetings(period, search) {
  console.log(localStorage.getItem(`token`));

  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/meetings?period=${period}&search=${search}`,

    {
      method: "GET",

      headers: {
        Authorization: `${localStorage.getItem(`token`)}`,

        "Content-Type": "application/json",
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    console.log(response);

    return response.json();
  });
}

// userID=localStorag
function excuseYourself(meetingID, meetingCard) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingID}?action=remove_attendee`,
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
    meetingCard.remove();
    return response.json();
  });
}
function addAttendee(meetingID, userID, memberList) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingID}?action=add_attendee&email=${userID}`,
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
    return response.json();
  });
}
