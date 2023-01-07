import { inputRoll, quickRoll, setQuickRoll, addRoll } from "./functions.js";

const input = document.getElementById("roll-string");
input.focus();
input.addEventListener("keypress", (e) => { if(e.key === "Enter") { inputRoll(e.target.value) }});

chrome.storage.session.get(["rolls"], (result) => {
  const rolls = result.rolls || [];
  
  for(const roll of rolls) {
    addRoll(roll);
  }
});

// Quick Rolls
const quick_btn = document.getElementById("quick-roll-button");
quick_btn.addEventListener("click", quickRoll);

const quick_rolls = document.getElementById("quick-rolls");
for(const d of [20, 4, 6, 8, 10, 100, 12]) {
  const die = document.createElement("button");
  die.setAttribute("class", `roll-button d${d}`);
  die.setAttribute("data-die", d);
  die.addEventListener("click", (e) => setQuickRoll(e, "+"));
  die.addEventListener("contextmenu", (e) => setQuickRoll(e, "-"));
  die.innerText = `d${d}`;

  quick_rolls.appendChild(die);
};