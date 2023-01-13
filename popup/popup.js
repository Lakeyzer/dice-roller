import { executeInput, quickRoll, setQuickRoll, addRoll, getHistory } from "./functions.js";

const input = document.getElementById("roll-string");
input.focus();
input.addEventListener("keydown", (e) => { 
  if(e.key === "Enter") { executeInput(e.target.value) }
  if(e.key === "ArrowUp") { getHistory(1); }
  if(e.key === "ArrowDown") { getHistory(-1); }
});

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
  
  if(d === 100) {
    die.innerHTML = `<i class="fas fa-dice-d10" aria-hidden="true"></i>`+
        `<i class="fas fa-dice-d10" aria-hidden="true"></i>`;
  } else {
      die.innerHTML = `<i class="fas fa-dice-d${d}" aria-hidden="true"></i>`;
  }

  quick_rolls.appendChild(die);
};