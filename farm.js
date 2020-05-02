// farm.js
// Farm objects

/*******************************************************************************************************************
sky             : clear, cloud, or rainy
wind            : N, S, E, W
dayCount        : current day number (cannot exceed 40)
temperature     : warm or cold
plots           : list of plots on the land
blight          : bApple, bCorn, bBerry, none
*******************************************************************************************************************/

let plotLocations = [
    [8, 13],
    [8, 10],
    [11, 13],
    [11, 10],
    [15, 10]
];

class Nature {
    constructor() {
        this.sky = "clear"; 
        this.wind = "N";
        this.dayCount = 0;
        this.temperature = "warm";
        this.blight = "none";
        this.moveCounter = 0;
        this.plots = [new Plot(plotLocations[0][0], plotLocations[0][1]), 
                      new Plot(plotLocations[1][0], plotLocations[1][1]), 
                      new Plot(plotLocations[2][0], plotLocations[2][1]), 
                      new Plot(plotLocations[3][0], plotLocations[3][1]), 
                      new Plot(plotLocations[4][0], plotLocations[4][1])];
    }

    updateWeather() {
        this.randCloudy();
    }

    randCloudy() { 
        console.log("Rolling for clouds");
        let rng = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 10% chance of being cloudy
        if(rng === 1) {
            console.log("Sky is cloudy");
            this.sky = "cloudy";

            rng = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 50% chance of raining when cloudy
            if(rng <= 5) {
                console.log("Sky is rainy");
                this.sky = "rainy";
                return "rainy";
            }

            return "cloudy";
        }
        return false;
    }

        
    randBlight() {
        console.log("Rolling for blight");
        let blight_chance = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 2% chance of having blight and stalling growth
        if(blight_chance === 1 || blight_chance === 2) {    
            console.log("Blight occurred");
            return "blight";
        }
    }

    updatePlantGrowthCycle(plant) {
        if(this.sky === "cloudy") {
            return false; // // delay growth
        }
        else {
            
        }
    }

    updatePlantColor(plant) {

    }

    updatePlantWater(plant) {
        if(this.sky === "rainy") {
            console.log("It's raining, waterReserve++")
            plant.waterReserve++;
        } else {
            console.log()
        }

    }

    updatePlantFruitingState(plant) {

    }

    decrementWaterReserve(plant) {
        plant.waterReserve--;
    }
    
}

/*******************************************************************************************************************
plantType       : apple, corn, berry
waterReserve    : 0 to 3
growthCycle     : seed, stalk, bush, flower
                : each plantType will have a certain day at which it will progress to the next stage of growth
fruitColor      : green, yellow, black, no color
fertilizer      : True or False
x               : x-coord
y               : y-coord
*******************************************************************************************************************/
class Plant {
    constructor() {
        this.plantType = "apple";
        this.growthCycle = "seed";
        this.plantColor = "green";
        this.waterReserve = 0;
        this.fruitingState = null;
        this.fertilizer = false;
        this.plantBlight = null;
    }

    isHarvestable() {
        if(this.fruitingState === "red")
            return true
        return false;
    }
}

/*******************************************************************************************************************
x       : plot x-coord
y       : plot y-coord
plant   : apple, berry, or corn
*******************************************************************************************************************/
class Plot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.plant = null;
    }
}

/*******************************************************************************************************************
taskNum     : 0 to 50 -- keeps track of how many tasks its done
equipment   : plot, water can, fertilizer, barrel, or soap
*******************************************************************************************************************/
class Farmzoid {
    constructor(currX, currY) {
        this.taskNum = 0;
        this.equipment = null;
        this.currX = 0;
        this.currY = 0;
        this.barnX = 19;
        this.barnY = 19;
        this.plotLocations = plotLocations;
    }
}

/*******************************************************************************************************************
barnX       : x-coord of barn
barnY      : y-coord of barn
harvestBarrelCount  : Number of full barrels
*******************************************************************************************************************/
class Barn {
    constructor(barnX, barnY) {
        this.barnX = 19;
        this.barnY = 19;
        this.harvestBarrelCount = 0;
    }
}

/*******************************************************************************************************************
Rule 1: Check plot coords if it has plot
            if no, add task to place plot
Rule 2: if there is a plot, check if theres a plant planted
            if no, add seed
Rule 3: if there is a seed, check if there is fertilizer
            if no, add fertilizer
Rule 4: if there is a fertilizer, check water reserve is between 1 and 3
            if >= 3 then dont water
            if < 3 water
Rule 5: if plant has blight
            do not increment plant growth day until soap is applied
Rule 6: if plant is a fruit an is red
            harvest
Rule 7: if plant is a fruit and has 0 water reserve
            decrement color
Rule 8: if plant is a fruit and is not red or green
            add 2 units of water (counts as 2 tasks for farmzoid)
Rule 9: if plant is a fruit and is black
            replant seed
Rule 10:if plant is fruit and water is more than 3
            indicate overwater and wont change until it comes back to 3

Nature Rules
NR1 : If day is clear
        decrement water reserve by 1
NR2 : If day is rainy
        increment water reserve by 1
NR3 : if day is cloudy
        do not increment plant growth


*******************************************************************************************************************/
class FMS {
    constructor(dayCount) {
        this.taskList = null;
        this.taskCount = 0;
        this.day = dayCount;
    }
}

class WorkingMem{
    constructor(nature, fms) {
        this.nature = nature;
        this.fms = fms;
        this.farmzoid = [new Farmzoid(21, 19), new Farmzoid(17, 19), new Farmzoid(19, 21), new Farmzoid(19, 17)];
    }
}
// End of Farm Objects


// Farm Methods

// call to change day, and also check to see if the growing season has ended
function dayCounter(dayCount) {
    dayCount = dayCount + 1;

    if( dayCount == 41){
        // growing season ends
    }
}

var nature = new Nature();
var fms = new FMS(1);
var workingmem = new WorkingMem(nature, fms);
// nature.randCloudy();

// End of Farm Methods