//variables
const myKey = "bCTvDDFSEetLNv6WuUlzhRNptfTCNBPQmMy1aihZ";
const apiUrl = "https://api.nasa.gov/planetary/apod?api_key=";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

async function showImages(interations) {
  for (let i = 0; i < interations; i++) {
    //getting data
    const data = await getData();
    const jsonData = await data.json();
    console.log(jsonData);

    if (jsonData.media_type === "image") {
      const article = document.createElement("article");
      article.className =
        "shadow p-3 mb-5 text-white rounded explanationarticle";

      const titles = document.createElement("div");
      titles.className = "d-inline";

      const title = document.createElement("h2");
      title.className = "display-5 text-white";
      title.innerText = jsonData.title;

      const author = document.createElement("p");
      author.className = "text-muted";

      //in case not copyright in the response
      try {
        author.innerHTML =
          '<span class="text-white">Author <i class="fa-sharp fa-solid fa-user" ></i></span>' +
          ` ${jsonData.copyright.toString()}`;
      } catch (TypeError) {
        author.innerHTML = '<i class="fa-sharp fa-solid fa-user" ></i> Unknow';
      }
      // author.innerHTML =
      //   '<span class="text-white">Author <i class="fa-sharp fa-solid fa-user" ></i></span>' +
      //   ` ${jsonData.copyright.toString()}`;

      titles.append(title);
      titles.append(author);

      const img = document.createElement("img");
      img.src = jsonData.hdurl;
      img.className = "image";

      const explanation = document.createElement("p");
      explanation.className = "explanation";
      explanation.innerText = jsonData.explanation.toString();

      const div = document.createElement("div");
      div.className = "d-grid gap-2 col-6 mx-auto";
      const saveButton = document.createElement("a");
      saveButton.innerText = "Save";
      saveButton.setAttribute("href", jsonData.hdurl);
      saveButton.setAttribute("download", jsonData.hdurl);
      saveButton.setAttribute("target", "__blank");
      saveButton.className = "btn btn-primary";
      div.append(saveButton);

      //adding
      article.append(titles);
      article.append(author);
      article.append(img);
      article.append(explanation);
      article.append(div);

      const dataView = document.getElementById("dataView");
      dataView.append(article);
    } else if (jsonData.msg === "day is out of range for month") {
      null;
    } else if (
      jsonData.msg === "Date must be between Jun 16, 1995 and Jun 29, 2023."
    ) {
      null;
    } else if (jsonData.msg === "day is out of range for month") {
      null;
    }
  }
}

export default showImages;
