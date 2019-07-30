//Player Data
let data = {
  energy: 0,
  gold: 0,
  creatures: [],
  creatureCount: 0,
  maxCreatures: 3
};

//Game State
let state = {
  gatheringEnergy: false
};

//Unlocks in story based on energy count (Maybe Refactor?)
let storyUnlocks = {
  five: false,
  fifteen: false,
  creature: false
};

//Creature's battle stats
let battleStats = {
  minAttack: 1,
  maxAttack: 3,
  minDefence: 1,
  maxDefence: 3,
  health: 5,
  battling: false,
  battlesWon: 0,
  reward: 0
};

//Pull out some common variables
let { energy, creatures, gold, creatureCount } = data;
let { minAttack, maxAttack, minDefence, maxDefence, battling } = battleStats;

//set first creature ID (When session saving is done this will need to change)
let id = 0;

//Random data names, will seperate out into own file and use for other things.
const names = [
  "Mara",
  "Shad",
  "Paul",
  "Pascale",
  "Micah",
  "Caleb",
  "Jessica",
  "Hanae",
  "Erasmus",
  "Yoko",
  "Christen",
  "Ori",
  "Cameran",
  "Len",
  "Boris",
  "Lydia",
  "Hamish",
  "Macaulay",
  "Coby",
  "Bree",
  "Preston",
  "Cole",
  "Melissa",
  "Clayton",
  "Steel",
  "Nina",
  "Kessie",
  "Hop",
  "Ainsley",
  "Elijah",
  "Camilla",
  "Tyler",
  "Jana",
  "Kelly",
  "Amal",
  "Elton",
  "Barclay",
  "Dai",
  "Macy",
  "Gisela",
  "Castor",
  "Quinlan",
  "Duncan",
  "Riley",
  "Elvis",
  "Hayfa",
  "Jacqueline",
  "Vivien",
  "Nicole",
  "Brody",
  "Martha",
  "Elmo",
  "Hilda",
  "Calvin",
  "Rajah",
  "Cairo",
  "Gay",
  "Cathleen",
  "Patrick",
  "Leigh",
  "Jackson",
  "Marshall",
  "Amir",
  "Akeem",
  "Gail",
  "Indira",
  "Wylie",
  "Isaiah",
  "Lareina",
  "Bianca",
  "Katell",
  "Hilda",
  "Hunter",
  "Louis",
  "Keaton",
  "Hedy",
  "Alexander",
  "Jameson",
  "Astra",
  "Walter",
  "Adria",
  "Brennan",
  "Ursula",
  "Amelia",
  "Fuller",
  "Shaine",
  "Alan",
  "Mikayla",
  "Erasmus",
  "Camille",
  "Illana",
  "Octavius",
  "Maggy",
  "Aladdin",
  "Amaya",
  "Warren",
  "Carol",
  "Jada",
  "Reese",
  "Damon"
];

//    These will be replaced with refactoring
//Energy DOM
var energyLabel = document.getElementById("energyLabel");
var energyButton = document.getElementById("energyButton");
var goldLabel = document.getElementById("goldLabel");

//Purchasing DOM
var purchasePanel = document.getElementById("purchasePanel");
var buyCreature = document.getElementById("buyCreature");

//Creatures DOM
var creaturesLabel = document.getElementById("creaturesLabel");
var creaturesList = document.getElementById("creaturesList");

//Battle DOM
var battleArea = document.getElementById("battleArea");

//Send first message (Not a good solution)
addMessageToLog(
  "welcomeArea",
  "You wake up after being knocked out cold. You don't remember much. Except now you must gather energy from the universe once more.",
  "logArea",
  1
);

//Clicked Gather Energy Button
function gatherEnergy() {
  state.gatheringEnergy = !state.gatheringEnergy;
  let gatherEnergyTimer;
  if (state.gatheringEnergy == true) {
    gatherEnergyTimer = setInterval(function() {
      energy++;
      updateCounts();
      checkAvailableUnlocks(energy);
    }, 100);
    energyButton.innerText = "Gathering Energy";
  } else {
    clearInterval(gatherEnergyTimer);
    energyButton.innerText = "Gather Energy";
  }
}

//Check Available Unlocks (Called when Energy is being gathered)
function checkAvailableUnlocks(e) {
  if (e > 5 && storyUnlocks.five == false) {
    purchasePanel.classList.remove("hidden");
    addMessageToLog(
      "knowledgeRegaining",
      "You feel your knowledge regaining.",
      "logArea",
      1
    );
    storyUnlocks.five = true;
  }
  if (e > 15 && storyUnlocks.fifteen == false) {
    buyCreature.classList.remove("hidden");
    addMessageToLog(
      "rememberMinions",
      "You remember you used to have minions.",
      "logArea",
      1
    );
    storyUnlocks.fifteen = true;
  }
}

//Trying to purchase something
function clickedPurchase(unit) {
  //Has purchased a creature
  if (unit == "creature" && energy >= 25 && creatureCount < data.maxCreatures) {
    //Create creature
    creatures.push({
      id: id,
      name: names[Math.floor(Math.random() * names.length)],
      attack: Math.floor(Math.random() * (maxAttack - minAttack) + minAttack),
      defence: Math.floor(
        Math.random() * (maxDefence - minDefence) + minDefence
      ),
      health: 10,
      battlesWon: 0,
      reward: 0
    });

    //Create creature DOM elements
    var li = document.createElement("li");
    var btnBattle = document.createElement("BUTTON");
    var btnSacrifice = document.createElement("BUTTON");
    li.appendChild(
      document.createTextNode(
        ` ${creatures[creatures.length - 1].name} - Attack: ${
          creatures[creatures.length - 1].attack
        } | Defence: ${creatures[creatures.length - 1].defence} `
      )
    );
    li.appendChild(btnBattle);
    li.appendChild(btnSacrifice);
    btnBattle.outerHTML = `<button id="creatureComponentButton${id}" class="button is-small battle-button" onclick="startedAdventureLoop(${id})" > Send to Battle </button>`;
    btnSacrifice.outerHTML = `<button id="creatureComponentButton${id}" class="button is-small battle-button" onclick="killCreature(${id})" > Sacrifice Creature</button>`;
    li.id = `creatureComponent${id}`;
    creaturesList.appendChild(li);

    //Story unlock for creature
    if (storyUnlocks.creature == false) {
      addMessageToLog(
        "firstCreature",
        "You kind of smoosh the energy from the universe together. It creates a grotesque creature you feel immediate sympathy for. ",
        "logArea",
        1
      );
      storyUnlocks.creature = true;
    }

    //Update individual counts and run global updateCounts
    id++;
    energy -= 25;
    creatureCount++;
    updateCounts();
  }
}

//Easily called update counts
function updateCounts() {
  energyLabel.innerText = `Energy: ${energy}`;
  creaturesLabel.innerText = `Creatures: ${creatureCount} / ${
    data.maxCreatures
  }`;
  goldLabel.innerText = `Gold: ${gold}`;
}

//Started Adventure loop
function startedAdventureLoop(e) {
  //Remove from DOM and allow more room
  killCreature(e);
  creatureObject = creatures[e];

  //Make sure they're not already battling
  if (battling == false) {
    battling = true;
    addMessageToLog(
      "walkAimlessly",
      `${creatureObject.name} walks the local area aimlessly. </p>`,
      "battleArea",
      0
    );

    //Create wander counter
    var timer = document.getElementById("timer");
    var time = 10;
    timer.innerText = `Encounter Timer: ${time} seconds..`;

    //Start counting down
    wanderInterval = setInterval(function() {
      time--;
      timer.innerText = `Encounter Timer: ${time} seconds..`;
      if (time < 0.001) {
        clearInterval(wanderInterval);
        // HERE you would randomise the action being called (Fighting, gathering etc.)
        battleAction(e);
      }
    }, 1000);
  }
}

function battleAction(e) {
  //Setup fight
  var battleCreature = creatures[e];
  var enemy = {
    attack: 1 + battleCreature.battlesWon,
    defence: 0 + battleCreature.battlesWon,
    health: 10
  };
  let turns = 0;

  addMessageToLog(
    "encounterEnemy",
    ` ${battleCreature.name} comes across a rodent with ${
      enemy.health
    } health `,
    "battleArea",
    0
  );
  //Avoid stalemate by making enemy win
  if (
    enemy.attack == battleCreature.defence &&
    battleCreature.attack == enemy.defence
  ) {
    enemy.attack++;
  }

  //Loop hits
  while (battleCreature.health > 0.001 && enemy.health > 0.001) {
    //Hit enemy
    if (battleCreature.health > 0) {
      enemy.health = enemy.health - (battleCreature.attack - enemy.defence);
    }
    //Hit creature
    if (enemy.health > 0) {
      battleCreature.health =
        battleCreature.health - (enemy.attack - battleCreature.defence);
      turns++;
    }
  }

  //Someone has won
  if (battleCreature.health > enemy.health) {
    addMessageToLog(
      "beatEnemy",
      `${battleCreature.name} takes ${turns} turns to defeat the Rodent.`,
      "battleArea",
      0
    );
    battleCreature.battlesWon++;

    //Reset battle
    battling = false;
    setTimeout(startedAdventureLoop(e), 3000);
    battleCreature.reward =
      battleCreature.reward + battleCreature.battlesWon * 100;
  } else {
    addMessageToLog(
      "beatEnemy",
      `${
        battleCreature.name
      } is defeated after ${turns} turns. You muster your powers to teleport back a bag containing ${
        battleCreature.reward
      } gold.`,
      "battleArea",
      0
    );

    //Send rewards home and kill creature
    gold = gold + battleCreature.reward;
    battling = false;
  }
}

//Kill creature
function killCreature(e) {
  if (document.getElementById(`creatureComponent${e}`)) {
    document.getElementById(`creatureComponent${e}`).remove();
  }
  creatureCount = document.getElementById("creaturesList").childElementCount;
}

//Easy function for adding messages to DOM
function addMessageToLog(id, message, element, flashTimer) {
  let elementArea = document.getElementById(element);
  elementArea.innerHTML =
    elementArea.innerHTML +
    new Date().toLocaleTimeString() +
    `<p id="${id}">` +
    String(message) +
    "<p></br>";
  if (flashTimer > 0) {
    let targetElement = document.getElementById(id);
    targetElement.classList.add("flashit");
    setTimeout(function() {
      let targetElement = document.getElementById(id);
      targetElement.classList.remove("flashit");
    }, flashTimer * 1000);
  }
  elementArea.scrollBy({
    top: 1000,
    behavior: "smooth"
  });
}
