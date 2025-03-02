import { result, tempInC, tempInF, input } from "./getData";

const select = document.querySelector(`select`);
select.addEventListener(`input`, writeText);

export default function writeText() {
  const unit = document.querySelector(`select`).value;
  let capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
  if (unit === "C") {
    result.textContent = ` It is currently ${tempInC}\u00B0 C in ${capitalizedInput}`;
  } else {
    result.textContent = ` It is currently ${tempInF}\u00B0 F in ${capitalizedInput}`;
  }
}
