export const getTimeLeft = (date, frame) => {
  try {
    date = new Date(date);
  } catch (e) {
    return "00h : 00m : 00s";
  }
  if (date > new Date()) return { days: -1, hours: -1, minutes: -1, seconds: -1 };
  date.setDate(date.getDate() + frame);
  let timeLeft = new Date(date) - new Date();
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  let seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const hebDate = (date) => {
  try {
    date = new Date(date);
  } catch (e) {}
  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + months[monthIndex] + ", " + year;
};
