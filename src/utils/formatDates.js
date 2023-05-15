function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

function customToLocaleDateString(date) {
  return date.toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function tolocaleDateStringUS(date) {
  const customDate = new Date(date);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return customDate.toLocaleString("en-US", options).replace(/,([^,]*)$/, "$1");
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
}

function formatTimeDifference(departureTime, arrivalTime) {
  const departureDate = new Date(`1970-01-01T${departureTime}Z`);
  const arrivalDate = new Date(`1970-01-01T${arrivalTime}Z`);

  if (arrivalDate < departureDate) {
    arrivalDate.setDate(arrivalDate.getDate() + 1); // add 1 day to arrival time
  }

  const differenceInMilliseconds = arrivalDate - departureDate;
  const differenceInMinutes = differenceInMilliseconds / 60000; // 1 minute = 60000 milliseconds
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = Math.floor(differenceInMinutes % 60);

  return `${hours}h ${minutes}m`;
}

export {
  dateToYMD,
  customToLocaleDateString,
  tolocaleDateStringUS,
  formatTime,
  formatTimeDifference,
};
