let data = {
  energy: 0,
  gold: 0,
  creatures: [],
  creatureCount: 0,
  maxCreatures: 3
};

let state = {
  gatheringEnergy: false
};

let storyUnlocks = {
  five: false,
  fifteen: false,
  creature: false
};

let battleStats = {
  minAttack: 1,
  maxAttack: 3,
  minDefence: 1,
  maxDefence: 3,
  health: 5,
  battling: false,
  battlesWon: 0
};

let { energy, creatures, gold, creatureCount } = data;
let { minAttack, maxAttack, minDefence, maxDefence, battling } = battleStats;
let id = 0;
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

//Log DOM
var logArea = document.getElementById("logArea");

var gatherEnergyTimer;
var batlleInterval;

//Send first message (Not a good solution)
logArea.innerHTML =
  new Date().toLocaleTimeString() +
  " <p class = 'flashit'> You wake up after being knocked out cold. You don't remember much. Except now you must gather energy from the universe once more.</p>";
setTimeout(function() {
  document.getElementsByClassName("flashit")[0].classList.remove("flashit");
}, 3000);

//Clicked Gather Energy Button
function gatherEnergy() {
  state.gatheringEnergy = !state.gatheringEnergy;
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
  switch (e) {
    case 5:
      if (storyUnlocks.five == false) {
        purchasePanel.classList.remove("hidden");
        logArea.innerHTML =
          new Date().toLocaleTimeString() +
          "<p class = 'flashit'> You feel your knowledge regaining. </p><br>" +
          logArea.innerHTML;
        storyUnlocks.five = true;
        setTimeout(function() {
          document
            .getElementsByClassName("flashit")[0]
            .classList.remove("flashit");
        }, 3000);
      }
      break;
    case 15:
      if (storyUnlocks.fifteen == false) {
        buyCreature.classList.remove("hidden");
        logArea.innerHTML =
          new Date().toLocaleTimeString() +
          "<p class = 'flashit'> You remember you used to have minions. </p><br>" +
          logArea.innerHTML;
        storyUnlocks.fifteen = true;
        setTimeout(function() {
          document
            .getElementsByClassName("flashit")[0]
            .classList.remove("flashit");
        }, 3000);
      }
      break;
    default:
      break;
  }
}

//Trying to purchase something
function clickedPurchase(unit) {
  if (unit == "creature" && energy >= 25 && creatureCount < data.maxCreatures) {
    creatures.push({
      id: id,
      name: names[Math.floor(Math.random() * names.length)],
      attack: Math.floor(Math.random() * (maxAttack - minAttack) + minAttack),
      defence: Math.floor(
        Math.random() * (maxDefence - minDefence) + minDefence
      ),
      health: 10,
      battlesWon: 0
    });
    energy -= 25;
    creatureCount++;
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
    btnBattle.outerHTML = `<button id="creatureComponentButton${id}" class="button is-small battle-button" onclick="startedBattleLoop(${id})" > Send to Battle </button>`;
    btnSacrifice.outerHTML = `<button id="creatureComponentButton${id}" class="button is-small battle-button" onclick="killCreature(${id})" > Sacrifice Creature</button>`;

    li.id = `creatureComponent${id}`;
    creaturesList.appendChild(li);
    if (storyUnlocks.creature == false) {
      purchasePanel.classList.remove("hidden");
      logArea.innerHTML =
        new Date().toLocaleTimeString() +
        "<p class='flashit'> You kind of smoosh the energy from the universe together. It creates a grotesque creature you feel immediate sympathy for. </p><br>" +
        logArea.innerHTML;
      setTimeout(function() {
        document
          .getElementsByClassName("flashit")[0]
          .classList.remove("flashit");
      }, 3000);
      storyUnlocks.creature = true;
    }
    id++;
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

//Started battle loop
function startedBattleLoop(e) {
  creatureObject = creatures[e];
  if (battling == false) {
    battleArea.innerHTML =
      battleArea.innerHTML +
      new Date().toLocaleTimeString() +
      ` <p class = 'flashit'>${
        creatureObject.name
      } walks the local area aimlessly. </p>` +
      "<p id='timer'>10 seconds..<p>";
    setTimeout(function() {
      document.getElementsByClassName("flashit")[0].classList.remove("flashit");
    }, 3000);
    battling = true;
    var timer = document.getElementById("timer");
    var time = 10;

    battleInterval = setInterval(function() {
      time--;
      timer.innerText = `${time} seconds..`;
      if (time < 0.001) {
        timer.classList.add("hidden");
        clearInterval(battleInterval);
        battleAction(e);
      }
    }, 1000);
    timer.removeAttribute("id");
  }
}

function battleAction(e) {
  var battleCreature = creatures[e];
  let enemyAttack;
  let enemyDefence = 0 + battleCreature.battlesWon;
  var enemy = {
    attack: 1 + battleCreature.battlesWon,
    defence: enemyDefence,
    health: 10
  };
  let turns = 0;
  battleArea.innerHTML =
    battleArea.innerHTML +
    `<p class = "flashit">
 ${battleCreature.name} comes across a rodent with ${
      enemy.health
    } health and  `;
  while (battleCreature.health > 0.001 && enemy.health > 0.001) {
    //Hit enemy
    if (
      enemy.attack == battleCreature.defence &&
      battleCreature.attack == enemy.defence
    ) {
      enemy.attack++;
    }
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
  if (battleCreature.health > enemy.health) {
    battleArea.innerHTML =
      battleArea.innerHTML +
      `
 takes ${turns} turns to defeat the rodent </p> <br>`;
    battleCreature.battlesWon++;
    setTimeout(function() {
      document.getElementsByClassName("flashit")[0].classList.remove("flashit");
    }, 3000);
    battling = false;
    setTimeout(startedBattleLoop(e), 3000);
  } else {
    let reward = 100 * battleCreature.battlesWon;
    battleArea.innerHTML =
      battleArea.innerHTML +
      `runs from the foe and back to the tower after winning ${
        battleCreature.battlesWon
      } battles. He returns with a bag of ${reward} gold. <p>`;
    gold = gold + reward;
    battleArea.scrollBy({
      top: 1000,
      behavior: "smooth"
    });
    setTimeout(function() {
      document.getElementsByClassName("flashit")[0].classList.remove("flashit");
    }, 3000);
    battling = false;
    killCreature(e);
  }
}

function killCreature(e) {
  console.log(creatures);
  document.getElementById(`creatureComponent${e}`).remove();
  creatures.splice(e, 1);
  creatureCount--;
  console.log(creatures);
}
