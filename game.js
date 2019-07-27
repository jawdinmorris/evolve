let data = {
  energy: 0,
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
let { energy, creatures } = data;
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

//Purchasing DOM
var purchasePanel = document.getElementById("purchasePanel");
var buyCreature = document.getElementById("buyCreature");

//Creatures DOM
var creaturesLabel = document.getElementById("creaturesLabel");
var creaturesList = document.getElementById("creaturesList");

//Log DOM
var logArea = document.getElementById("logArea");

var gatherEnergyTimer;

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
    }, 1000);
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
  if (
    unit == "creature" &&
    energy >= 25 &&
    data.creatureCount < data.maxCreatures
  ) {
    creatures.push({
      id: id,
      name: names[Math.floor(Math.random() * names.length)],
      attack: Math.floor(Math.random() * 10),
      defence: Math.floor(Math.random() * 10)
    });

    id++;
    energy -= 25;
    data.creatureCount++;
    var li = document.createElement("li");
    var btn = document.createElement("BUTTON");
    li.appendChild(
      document.createTextNode(
        ` ${creatures[creatures.length - 1].name} - Attack: ${
          creatures[creatures.length - 1].attack
        } | Defence: ${creatures[creatures.length - 1].defence} `
      )
    );
    li.appendChild(btn);
    btn.classList.add(`class="battle-button"`);
    btn.innerText = "Send to battle";
    btn.id = `creatureComponentButton${id}`;
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

    updateCounts();
  }
}

//Easily called update counts
function updateCounts() {
  energyLabel.innerText = `Energy: ${energy}`;
  creaturesLabel.innerText = `Creatures: ${data.creatureCount} / ${
    data.maxCreatures
  }`;
}
