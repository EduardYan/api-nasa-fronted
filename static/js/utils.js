//variables
const myKey = "bCTvDDFSEetLNv6WuUlzhRNptfTCNBPQmMy1aihZ";
const apiUrl = "https://api.nasa.gov/planetary/apod?api_key=";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMonthName(number) {
  if (number == 1) {
    return "January";
  } else if (number == 2) {
    return "February";
  } else if (number == 3) {
    return "March";
  } else if (number == 4) {
    return "April";
  } else if (number == 5) {
    return "May";
  } else if (number == 6) {
    return "June";
  } else if (number == 7) {
    return "July";
  } else if (number == 8) {
    return "August";
  } else if (number == 9) {
    return "September";
  } else if (number == 10) {
    return "October";
  } else if (number == 11) {
    return "November";
  } else if (number == 12) {
    return "December";
  } else {
    return " ";
  }
}

function getDateFormatedString(dateString) {
  let newDateStringList = dateString.split("-");
  let sortedDateString = newDateStringList.reverse().toString();
  sortedDateString = sortedDateString.replaceAll(",", " ");
  let sortedDateStringList = sortedDateString.split(" ");

  sortedDateStringList = sortedDateStringList.map((e) => {
    return parseInt(e);
  });

  const month = getMonthName(sortedDateString[1]);
  const finalSorted = `${month} ${sortedDateStringList[0]},${sortedDateStringList[2]}`;

  return finalSorted;
}

function getRamdonDate() {
  //1995 06 16 RestAPi permission

  const currentYear = new Date().getFullYear();

  const daysNumbers = random(1, 31);
  const monthsNumbers = random(1, 12);
  const year = random(1995, currentYear);

  return `${year}-${monthsNumbers}-${daysNumbers}`;
}

const getData = async () => {
  try {
    const randomDate = getRamdonDate();
    const request = apiUrl + myKey + "&date=" + randomDate;
    const data = await fetch(request);
    //showing request
    console.log(request);
    console.log("Date" + randomDate);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default { getData, getDateFormatedString };
