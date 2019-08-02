//Player Data
let data = {
  energy: 0,
  gold: 0,
  creatures: [],
  creatureCount: 0,
  maxCreatures: 3,
  totalBattlesWon: 0
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

upgradeUnlocks = {
  swordOne: false,
  shieldOne: false
};
//Creature's battle stats
let battleStats = {
  minAttack: 1,
  maxAttack: 3,
  minDefence: 1,
  maxDefence: 3,
  health: 20,
  battling: false,
  battlesWon: 0,
  reward: 0
};

//Pull out some common variables
let { energy, creatures, gold, creatureCount } = data;
let {
  minAttack,
  maxAttack,
  minDefence,
  maxDefence,
  health,
  battling
} = battleStats;

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
var purchasePanelList = document.getElementById("purchasePanelList");
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
    pushNewUpgradeToScreen("creature", "Summon Creature", 25, "Energy");
    addMessageToLog(
      "rememberMinions",
      "You remember you used to have minions.",
      "logArea",
      1
    );
    storyUnlocks.fifteen = true;
  }
  if (data.totalBattlesWon > 3 && upgradeUnlocks.swordOne == false) {
    pushNewUpgradeToScreen("sword", "Buy Sword (A+3)", 500, "Gold");
    upgradeUnlocks.swordOne = true;
  }
  if (data.totalBattlesWon > 3 && upgradeUnlocks.shieldOne == false) {
    pushNewUpgradeToScreen("shield", "Buy Shield (D+3)", 500, "Gold");
    upgradeUnlocks.shieldOne = true;
  }
}

//Trying to purchase something
function clickedPurchase(unit, cost) {
  switch (unit) {
    case "sword":
      if (gold >= cost) {
        gold -= cost;
        console.log("Purchased Sword");
        minAttack += 1;
        maxAttack += 3;
      }
      break;
    case "shield":
      if (gold >= cost) {
        gold -= cost;
        console.log("Purchased Shield");
        minDefence += 1;
        maxDefence += 3;
      }
      break;
    case "creature":
      if (energy >= cost && creatureCount < data.maxCreatures) {
        //Create creature
        creatures.push({
          id: id,
          name: names[Math.floor(Math.random() * names.length)],
          attack: Math.floor(
            Math.random() * (maxAttack - minAttack) + minAttack
          ),
          defence: Math.floor(
            Math.random() * (maxDefence - minDefence) + minDefence
          ),
          health: health,
          battlesWon: 0,
          reward: 0
        });

        //Create creature DOM elements
        var li = document.createElement("li");
        var liDiv = document.createElement("div");
        var btnBattle = document.createElement("BUTTON");
        var btnSacrifice = document.createElement("BUTTON");
        li.appendChild(
          document.createTextNode(
            ` ${creatures[creatures.length - 1].name} - AP: ${
              creatures[creatures.length - 1].attack
            } | DP: ${creatures[creatures.length - 1].defence} | HP: ${
              creatures[creatures.length - 1].health
            }`
          )
        );
        li.appendChild(liDiv);
        liDiv.appendChild(btnBattle);
        liDiv.appendChild(btnSacrifice);
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
        energy -= cost;
        creatureCount++;
        updateCounts();
      }
      break;
    default:
      break;
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
  creatureObject = creatures[e];
  updateBattleSummary(creatureObject);
  //Make sure they're not already battling
  if (battling == false) {
    //Remove from DOM and allow more room
    killCreature(e);
    battling = true;
    addMessageToLog(
      "walkAimlessly",
      `${creatureObject.name} walks the local area aimlessly. </img>`,
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
      enemy.attack
    } attack and ${enemy.defence} defence `,
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
    if (
      battleCreature.health > 0 &&
      battleCreature.attack - enemy.defence > 0
    ) {
      enemy.health = enemy.health - (battleCreature.attack - enemy.defence);
    }
    //Hit creature
    if (enemy.health > 0 && enemy.attack - battleCreature.defence) {
      battleCreature.health =
        battleCreature.health - (enemy.attack - battleCreature.defence);
    }
    turns++;
  }

  //Someone has won
  if (battleCreature.health > enemy.health) {
    battleCreature.battlesWon++;
    data.totalBattlesWon++;
    addMessageToLog(
      "beatEnemy",
      `${battleCreature.name} manages to win with ${
        battleCreature.health
      } health remaining. ${
        battleCreature.name
      } finds  ${battleCreature.battlesWon * 100} gold on the body`,
      "battleArea",
      0
    );

    //Reset battle
    battling = false;
    battleCreature.reward =
      battleCreature.reward + battleCreature.battlesWon * 100;
    updateBattleSummary(creatureObject);
    setTimeout(startedAdventureLoop(e), 3000);
  } else {
    addMessageToLog(
      "lostToEnemy",
      `The rodent defeats ${battleCreature.name} with ${
        enemy.health
      } health remaning.`,
      "battleArea",
      0
    );
    addMessageToLog(
      "sendRewardHome",
      `${battleCreature.name} is finally defeated after winning ${
        battleCreature.battlesWon
      } battles. You muster your powers to teleport back a bag containing ${
        battleCreature.reward
      } gold.`,
      "battleArea",
      0
    );
    timer.innerHTML = "DEFEATED";
    updateBattleSummary(creatureObject);
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

function updateBattleSummary(creatureObject) {
  //Create Explore Summary and Update
  var creatureSummary = document.getElementById("battleCreatureSummary");
  creatureSummary.innerHTML = `<p> <strong> ${
    creatureObject.name
  } </strong> </p> <p>AP: ${creatureObject.attack} | DP: ${
    creatureObject.defence
  } | HP: ${creatureObject.health} </p> <p> Battles: ${
    creatureObject.battlesWon
  } Gold: ${creatureObject.reward} </p>`;
}

function pushNewUpgradeToScreen(upgrade, message, cost, resource) {
  var btn = document.createElement("BUTTON");
  purchasePanelList.appendChild(btn);
  btn.outerHTML = `<button onclick="clickedPurchase('${upgrade}',${cost}, '${resource}')"
    class="button list-item"
    id="buy${upgrade}">
    ${message}: ${cost} ${resource}
  </button>`;
}
