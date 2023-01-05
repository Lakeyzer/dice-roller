export const inputRoll = (e) => {
  rollString(e.target.value);
  e.target.value = "";
};

/**
 * Finds the total value for a roll string input
 * @param {string} input 1d6+2
 * @returns {object} { input: string; total: number; }
 */
export const rollString = (input) => {
  const rolls = input.match(/(\d*d\d+)|(\d+)|(\+|-)/g);
  let outcome = "";
  const operate = (op, val, total) => (op === "+") ? total+val : total-val;

  let result = 0;
  let operator = "+";
  for(const roll of rolls) {
    // Roll 
    if(roll.match(/d/g)) {
      const rolled = rollDice(roll);
      const rolls = [];
      for(let r of rolled.rolls) {
         rolls.push(
          (r === 1) 
            ? `<span class="die fail">${r}</span>` 
            : (r == rolled.die) 
            ? `<span class="die success">${r}</span>` 
            : `<span class="die">${r}</span>`
         );
      }
      outcome += rolls.join(" ");
      result = operate(operator, parseInt(rolled.total), result);
    }
    // Modifier
    if(roll.match(/^\d*$/g)) {
      outcome += roll;
      result = operate(operator, parseInt(roll), result);
    }
    // Operator
    if(roll.match(/^(\+|-){1}$/g)) {
      outcome += ` ${roll} `;
      operator = roll;
    }
  }
  storeRoll({
    input,
    outcome,
    result
  });
};

/**
 * Rolls a string input
 * @param {string} input 1d6
 * @returns {object} { rolls: number[]; total: number; }
 */
export const rollDice = (input) => {
  const roll = input.split("d");
  const count = roll[0] || 1;
  const die = roll[1];
  const rolls = [];

  for(let i = 1; i <= count; i++) {
    rolls.push(Math.ceil(Math.random() * die));
  }
  const total = rolls.reduce((a, b) => a + b);

  return { count, die, rolls, total };
};

/**
 * Store rolls
 */
export const storeRoll = (roll) => {
  // Store in Chrome
  chrome.storage.session.get(["rolls"], (result) => {
    const current = result.rolls || [];
    current.push(roll);
    chrome.storage.session.set({ rolls: current });
  });

  // Add to HTML list
  addRoll(roll);
}

export const addRoll = (roll) => {
  const list = document.getElementById("rolls");
  const li = document.createElement("li");
  li.setAttribute("class", "roll");

  const input = document.createElement("div");
  input.setAttribute("class", "roll__input");
  input.innerText = roll.input;

  const result = document.createElement("div");
  result.setAttribute("class", "roll__result");

  const outcome = document.createElement("div");
  outcome.setAttribute("class", "roll__result-outcome");
  outcome.innerHTML = roll.outcome;

  const total = document.createElement("div");
  total.setAttribute("class", "roll__result-total");
  total.innerText = roll.result;

  result.appendChild(outcome);
  result.appendChild(total);

  li.appendChild(input);
  li.appendChild(result);

  list.prepend(li);
}