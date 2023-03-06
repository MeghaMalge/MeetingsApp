(function () {
  function showMeetings(meetings) {
    const meetingsList = document.querySelector(".meetings-container");

    let meetingsListStr = "";
    meetings.forEach(function (meeting) {
      let meetingAttendees = meeting.attendees.map(function (attendee) {
        return attendee.email;
      });

      let duration =
        parseInt(`${meeting.endTime.hours}`) * 60 +
        parseInt(`${meeting.endTime.minutes}`) -
        (parseInt(`${meeting.startTime.hours}`) * 60 +
          parseInt(`${meeting.startTime.minutes}`)) +
        (parseInt(`${meeting.endTime.hours}`) -
          parseInt(`${meeting.startTime.hours}`)) *
          10;
      let topHeight =
        parseInt(`${meeting.startTime.hours}`) * 60 +
        parseInt(`${meeting.startTime.minutes}`) +
        parseInt(`${meeting.startTime.hours}`) * 10;

      meetingsListStr += `
      <div>
        <div style="position:absolute;
             top:${topHeight}px;
             overflow:hidden;
             word-break:break-all;
             border:1px solid black;
             height:${duration}px;
             width:98%;
             background-color: rgb(248, 249, 250);
             padding-left:5px;
             color:black;
             z-index:3;">
          <div>${meeting.name}</div>    
          <div>${meetingAttendees}</div>    
        </div>
      </div>
       `;
    });
    meetingsList.innerHTML = meetingsListStr;
  }

  function fetchMeetings(fetchDate) {
    getMeetings(fetchDate).then(function (meetings) {
      showMeetings(meetings);
    });
  }

  window.addEventListener("load", function () {
    today = new Date();
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let user = document.getElementById("user");
    user.textContent = ` ${localStorage.getItem("email")}`;

    let todaysDate = document.getElementById("today-date");

    todaysDate.textContent = `${today.getDate()} ${
      month[today.getMonth()]
    } ${today.getFullYear()}`;

    fetchMeetings(date);

    let selectDate = document.getElementById("select-date");
    selectDate.addEventListener("input", function () {
      searchDate = selectDate.value;
      date = selectDate.value;
      let monthIndex = parseInt(date[6] + date[7]) - 1;
      todaysDate.textContent = `${date[8]}${date[9]} ${month[monthIndex]} ${date[0]}${date[1]}${date[2]}${date[3]}`;
      fetchMeetings(searchDate);
    });
  });
})();

var today;
var date;
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
