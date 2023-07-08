import utils from "./utils.js";

async function showImages(interations) {
  for (let i = 0; i < interations; i++) {
    //getting data
    const data = await utils.getData();
    const jsonData = await data.json();
    console.log(jsonData);

    if (jsonData.media_type === "image") {
      const article = document.createElement("article");
      article.className = "shadow-lg p-3 mb-5 text-white rounded";

      const titles = document.createElement("div");

      const title = document.createElement("h2");
      title.className = "display-5 text-white";
      title.innerText = jsonData.title;
      titles.append(title);

      const informationView = document.createElement("div");
      informationView.className = "d-inline";
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

      const date = document.createElement("p");
      date.className = "text-muted";
      date.innerHTML =
        `<span class="text-white"><i class="fa-sharp fa-solid fa-calendar-days"></i></span>` +
        ` ${utils.getDateFormatedString(jsonData.date.toString())}`;

      informationView.append(author);
      informationView.append(date);
      console.log(utils.getDateFormatedString(jsonData.date.toString()));

      const img = document.createElement("img");
      img.src = jsonData.hdurl;
      img.className = "image";

      const explanation = document.createElement("p");
      explanation.className = "explanation lead";
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
      article.append(informationView);
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
