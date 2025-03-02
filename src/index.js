import "./style.css";
import addFavicon from "./addFavicon/addFavicon.js";
import getData from "./getData.js";

const button = document.querySelector(`button`);

button.addEventListener(`click`, getData);
document.addEventListener(`keyup`, (e) => {
  if (e.key === "Enter") {
    getData();
  }
});
