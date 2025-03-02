import getGif from "./getGif";

export default async function getData() {
  const container = document.querySelector(`.container`);
  const indicator = document.querySelector(`.indicator`);
  const input = document.querySelector(`input`).value;
  const result = document.querySelector(`.result`);
  const unit = document.querySelector(`select`).value;

  try {
    indicator.textContent = `Waiting for response`;

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=current&key=RK9QGT68LJC4A8CZLA785FREP&contentType=json`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    indicator.textContent = `Waiting for data`;
    const data = await response.json();
    if (!data) {
      throw new Error("Invalid data");
    }
    getGif(data.currentConditions.conditions);
    indicator.textContent = `Success!`;
    let capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);

    if (unit === "C") {
      result.textContent = ` It is currently ${data.currentConditions.temp}\u00B0 C in ${capitalizedInput}`;
    } else {
      let F = Math.floor(data.currentConditions.temp * (9 / 5) + 32);
      result.textContent = ` It is currently ${F}\u00B0 F in ${capitalizedInput}`;
    }
  } catch (error) {
    result.textContent = ``;
    indicator.textContent = `Failure! Error - ${error}`;
    container.innerHTML = ``;
    getGif("sorry");
    console.log(`Error in catch is ${error}`);
  }
}

// Same function done in promises:

// export default function getData() {
//   const input = document.querySelector(`input`).value;
//   const result = document.querySelector(`.result`);
//   fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=current&key=RK9QGT68LJC4A8CZLA785FREP&contentType=json`,
//     { mode: "cors" }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       result.textContent = data.currentConditions.temp;
//     });
// }
