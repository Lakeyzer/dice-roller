import { inputRoll, addRoll } from "./functions.js";

const input = document.getElementById("roll-string");
input.focus();
input.addEventListener("keypress", (e) => { if(e.key === "Enter") { inputRoll(e) }});

chrome.storage.session.get(["rolls"], (result) => {
  const rolls = result.rolls || [];
  
  for(const roll of rolls) {
    addRoll(roll);
  }
});