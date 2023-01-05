import { inputRoll, rollString, addRoll } from "./functions.js";

const input = document.getElementById("roll-string");
input.focus();
input.addEventListener("keypress", (e) => { if(e.key === "Enter") { inputRoll(e) }});

chrome.storage.session.get(["rolls"], (result) => {
  const rolls = result.rolls || [];
  
  for(const roll of rolls) {
    addRoll(roll);
  }
});

// Quick Rolls
const quick_rolls = document.getElementById("quick-rolls");
for(const d of [4, 6, 8, 10, 12, 20, 100]) {
  const die = document.createElement("button");
  die.setAttribute("class", "roll-button");
  die.addEventListener("click", () => rollString(`1d${d}`));
  die.innerText = `d${d}`;

  quick_rolls.appendChild(die);
}