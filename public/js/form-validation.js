const start = document.getElementById("start-time");
const end = document.getElementById("end-time");
let startTime;
let endTime;
start.addEventListener("input", function () {
  startTime = start.value;
  const timeError = end.closest("div").querySelector(".message");
  if (startTime > endTime) {
    console.log("error");
    timeError.textContent = "End time should be greater than start time";
  } else {
    timeError.textContent = "";
  }
});

end.addEventListener("input", function () {
  endTime = end.value;
  const timeError = end.closest("div").querySelector(".message");
  if (startTime > endTime) {
    console.log("error");
    timeError.textContent = "End time should be greater than start time";
  } else {
    timeError.textContent = "";
  }
});
