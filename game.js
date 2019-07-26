let data = {
  energy: 0,
  creatures: [],
  creatureCount: 0
};

let state = {
  gatheringEnergy: false
};

let { energy, creatures } = data;
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

var energyLabel = document.getElementById("energyLabel");
var energyButton = document.getElementById("energyButton");

var purchasePanel = document.getElementById("purchasePanel");
var buyCreature = document.getElementById("buyCreature");

var creaturesLabel = document.getElementById("creaturesLabel");
var creaturesList = document.getElementById("creaturesList");

var gatherEnergyTimer;

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

function checkAvailableUnlocks(e) {
  switch (e) {
    case 3:
      purchasePanel.classList.remove("hidden");
      break;
    case 5:
      buyCreature.classList.remove("hidden");
      console.log("Should see buy creature button");
      break;
    default:
      break;
  }
}

function clickedPurchase(unit) {
  if (unit == "creature" && energy >= 10) {
    creatures.push({ name: names[Math.floor(Math.random() * names.length)] });
    energy -= 10;
    data.creatureCount++;
    var li = document.createElement("li");
    li.appendChild(
      document.createTextNode(` ${creatures[creatures.length - 1].name} `)
    );
    creaturesList.appendChild(li);
    updateCounts();
  }
}

function updateCounts() {
  energyLabel.innerText = `Energy: ${energy}`;
  creaturesLabel.innerText = `Creatures: ${data.creatureCount}`;
}
