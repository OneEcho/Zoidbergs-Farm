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

    updatePlantColor(plant) {

    }

    updatePlantWater(plant) {
        if(this.sky === "rainy") {
            console.log("It's raining, waterReserve++")
            plant.waterReserve++;
        } else {
            console.log();
        }

    }
    
}

/*******************************************************************************************************************
plantType       : apple, corn, berry
waterReserve    : 0 to 3
growthCycle     : seed, stalk, bush, flower
                : each plantType will have a certain day at which it will progress to the next stage of growth
fruitingState      : green, yellow, black, no color
fertilizer      : True or False
taskDone        : watering, soaped, harvesting
age             : how many days its been
plantBlight     : blight type
blight          : true or false
x               : x-coord
y               : y-coord
*******************************************************************************************************************/
class Plant {
    constructor() {
        this.plantType = "apple";
        this.growthCycle = "seed";
        this.waterReserve = 0;
        this.fruitingState = null;
        this.fertilized = false;
        this.plantBlight = null;
        this.blight = false;
        this.taskDone = null;
        this.age = 0;
    }

    incrementAge() {
        this.age++;
    }

    decrementAge() {
        this.age--;
    }

    incrementWaterReserve() {
        if(this.taskDone === "watering") {
            waterReserve++;
            console.log("plant watered")
        }
    }

    fixBlight() {
        if(this.taskDone === "soaping") {
            this.blight = null;
            console.log("blight fixed")
        }
    }

    addFertilizer() {
        if(this.taskDone === "fertilize") {
            this.fertilized = true;
            console.log("plant fertilized")
        }
    }

    updateGrowthCycle() {
        // Apple growth cycle
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 1 && this.growthCycle === "seed" && this.blight === null) {
            this.growthCycle = "stalk"
            console.log("apple seed is now a stalk")
        }
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 4 && this.growthCycle === "stalk" && this.blight === null) {
            this.growthCycle = "bush"
            console.log("apple stalk is now a bush")
        }
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 10 && this.growthCycle === "bush" && this.blight === null) {
            this.growthCycle = "flower"
            console.log("apple bush is now a flower")
        }
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 13 && this.growthCycle === "flower" && this.blight === null) {
            this.growthCycle = "fruiting"
            this.fruitingState = "green"
            console.log("apple flower is now fruiting")
        }

        // Berry growth cycle
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 1 && this.growthCycle === "seed" && this.blight === null) {
            this.growthCycle = "stalk"
            console.log("berry seed is now a stalk")
        }
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 4 && this.growthCycle === "stalk" && this.blight === null) {
            this.growthCycle = "bush"
            console.log("berry stalk is now bush")
        }
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 8 && this.growthCycle === "bush" && this.blight === null) {
            this.growthCycle = "flower"
            console.log("berry bush is now flower")
        }
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 10 && this.growthCycle === "flower" && this.blight === null) {
            this.growthCycle = "fruiting"
            this.fruitingState = "green"
            console.log("berry flower is now fruiting")
        }

        // Corn growth cycle
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && age > 1 && this.growthCycle === "seed" && this.blight === null) {
            this.growthCycle = "stalk"
            console.log("corn seed is now stalk")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && age > 3 && this.growthCycle === "stalk" && this.blight === null) {
            this.growthCycle = "bush"
            console.log("corn stalk is now bush")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && age > 5 && this.growthCycle === "bush" && this.blight === null) {
            this.growthCycle = "flower"
            console.log("corn bush is now flower")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && age > 7 && this.growthCycle === "flower" && this.blight === null) {
            this.growthCycle = "fruiting"
            this.fruitingState = "green"
            console.log("corn flower is now fruiting")
        }
    }

    updateFruitingState() {
        // Apple Fruiting State
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve < 3 && age > 15 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("apple is now harvestable")
        }

        // Berry fruitying state
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve < 3 && age > 11 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("berry is now harvestable")
        }

        // Corn fruiting state
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve < 3 && age > 8 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("corn is now harvestable")
        }
    }

    decrementFruitColor() {
        if(this.fruitingState === "red") {
            this.fruitingState = "green"
        }
        if(this.fruitingState === "green") {
            this.fruitingState = "yellow";
        }
        if(this.fruitingState === "yellow") {
            this.fruitingState = "black";
        }
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
        this.hasPlot = null;
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

    addTasks(task) {
        this.taskList.push(task);
        this.taskCount++;
    }

    newDay() {
        if(this.taskCount === 200) {
            dayCount++;
        }
    }
}

class WorkingMem{
    constructor(nature, fms, validPlots) {
        this.plot = 
        this.nature = nature;
        this.fms = fms;
        this.farmzoid = [new Farmzoid(21, 19), new Farmzoid(17, 19), new Farmzoid(19, 21), new Farmzoid(19, 17)];
    }

    natureEffects() {
        for(let j = 0; j < 20; j++) {
            validPlots[i].plant.incrementAge();
            if(nature.sky === "clear" && validPlots[i].plant.waterReserve > 0) {
                validPlots[i].plant.waterReserve--;
            }
            if(nature.sky === "rainy") {
                validPlots[i].plant.waterReserve++;
            }
            if(nature.sky === "cloudy") {
                validPlots[i].plant.decrementAge();
            }
            if(validPlots[i].plant.waterReserve === 0) {
                validPlots[i].plant.decrementFruitColor();
            }
        }
    }

    setupTasks() {
        for(let i = 0; i < 20; i++) {
            if(validPlots[i].hasPlot === null){
                fms.addTasks("place plot")
            }
            if(validPlots[i].plant.plantType === null) {
                fms.addTasks("plant seed");
            }
            if(validPlots[i].plant.fertilized === false){
                fms.addTasks("fertilize");
            }
            if(validPlots[i].plant.fertilized === true && validPlots[i].plant.waterReserve <= 3) {
                fms.addTasks("water");
            }
            if(validPlots[i].plant.blight === true) {
                fms.addTasks("soaping");
            }
            if(validPlots[i].plant.fruitingState === "red" && validPlots[i].plant.waterReserve > 0 && validPlots[i].plant.waterReserve <=3) {
                fms.addTasks("harvest");
            }
        }
    }
}
// End of Farm Objects


// Farm Methods

// set validPlots
let validPlots =    [new Plot(plotLocations[0][0], plotLocations[0][1]), 
                     new Plot(plotLocations[1][0], plotLocations[1][1]), 
                     new Plot(plotLocations[2][0], plotLocations[2][1]), 
                     new Plot(plotLocations[3][0], plotLocations[3][1]), 
                     new Plot(plotLocations[4][0], plotLocations[4][1])];


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