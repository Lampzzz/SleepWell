// hh mm ss
export const formatTimer = (seconds) => {
  const hh = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mm = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

// hh mm
export const formatDuration = (duration) => {
  const hh = Math.floor(duration / 3600);
  const mm = Math.floor((duration % 3600) / 60);
  return `${hh}h ${mm}m`;
};

// am or pm
export const formatTimeInAMPM = (date) => {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const period = date.getHours() >= 12 ? "pm" : "am";
  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Determine seconds format
export const formatSecond = (seconds) => {
  if (seconds < 60) {
    return seconds == 0 ? `${seconds}` : `${seconds}s`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`;
  } else {
    return `${Math.floor(seconds / 3600)}h`;
  }
};

// Convert into proper format date
export const formatDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
