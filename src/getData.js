import getGif from "./getGif";
import writeText from "./writeText";

export let tempInC;
export let tempInF;
export const result = document.querySelector(`.result`);
export let input;

const container = document.querySelector(`.container`);
const indicator = document.querySelector(`.indicator`);

export default async function getData() {
  try {
    input = document.querySelector(`input`).value;
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

    tempInC = data.currentConditions.temp;
    tempInF = Math.floor(data.currentConditions.temp * (9 / 5) + 32);

    writeText();
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
