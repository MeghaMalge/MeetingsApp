(function () {
  let addMeetingForm;
  addMeetingForm = document.getElementById("add-meeting-form");
  let attendeeList = "";

  function addEventListeners() {
    addMeetingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      attendeeList = document.getElementById("attendees").value;

      let newAttendeesArray = attendeeList.split(`, `);
      const start = document.getElementById("start-time");
      const end = document.getElementById("end-time");

      let meeting = {
        name: document.getElementById("meeting-name").value.trim(),
        description: document.getElementById("description").value.trim(),
        date: document.getElementById("date").value,
        startTime: {
          hours: parseInt(start.value[0] + start.value[1]),
          minutes: parseInt(start.value[3] + start.value[4]),
        },
        endTime: {
          hours: parseInt(end.value[0] + end.value[1]),
          minutes: parseInt(end.value[3] + end.value[4]),
        },
        attendees: newAttendeesArray,
      };

      addMeeting(meeting)
        .then(function (addMeetingResponse) {
          console.log(addMeetingResponse);
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  }

  window.addEventListener("load", function () {
    let user = document.getElementById("user");
    user.textContent = ` ${localStorage.getItem("email")}`;
    addEventListeners();
  });
})();
