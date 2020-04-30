// farm.js
// Farm objects

/*******************************************************************************************************************
sky             : clear, cloud, or rainy
wind            : N, S, E, W
dayCount        : current day number (cannot exceed 40)
temperature     : warm or cold
plots           : list of plots on the land
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
        this.plots = [new Plot(plotLocations[0][0], plotLocations[0][1]), 
                      new Plot(plotLocations[1][0], plotLocations[1][1]), 
                      new Plot(plotLocations[2][0], plotLocations[2][1]), 
                      new Plot(plotLocations[3][0], plotLocations[3][1]), 
                      new Plot(plotLocations[4][0], plotLocations[4][1])];
    }

    randCloudy() {
        let cloudy_chance = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 10% chance of being cloudy
        if(cloudy_chance === 1) {
            this.sky = "cloudy";

            let rainy_chance = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 50% chance of raining when cloudy
            if(rainy_chance <= 5) {
                this.sky = "rainy";
                return "rainy";
            }

            return "cloudy";
        }
    }

    randBlight() {
        let blight_chance = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 2% chance of having blight and stalling growth
        if(blight_chance === 1 || blight_chance === 2) {    
            return "blight";
        }
    }

    updateGrowthCycle(plant) {
        
    }
    
    update

}

/*******************************************************************************************************************
plantType       : apple, corn, berry
waterReserve    : 0 to 3
growthCycle     : seed, stalk, bush, flower
fruitColor      : green, yellow, black, no color
fertilizer      : True or False
x               : x-coord
y               : y-coord
*******************************************************************************************************************/
class Plant {
    constructor() {
        this.plantType = "apple"
        this.growthCycle = "seed";
        this.waterReserve = 0;
        this.fruitColor = null;
        this.fertilizer = false;
        this.blight = false;
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
Rule 5: if nature says its rainy
            add 1 

Nature Rules
NR1 : If day is clear
        decrement water reserve by 1
NR2 : If day is rainy
        increment water reserve by 1

*******************************************************************************************************************/
class FMS {
    constructor() {
        
    }
}