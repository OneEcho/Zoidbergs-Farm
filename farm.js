// farm.js
// Farm objects

/*
sky             : clear, cloud, or rainy
wind            : N, S, E, W
dayCount        : current day number (cannot exceed 40)
temperature     : warm or cold
plots           : list of plots on the land
*/
class Nature {
    constructor() {
        this.sky = "clear"; 
        this.wind = "N";
        this.dayCount = 0;
        this.temperature = "Warm";
        this.plots = [new Plot(8, 13), new Plot(8, 10), new Plot(11, 13), new Plot(11, 10), new Plot(15, 10)];
    }
}

/*
plantType       : apple, corn, berry
waterReserve    : 0 to 3
growthCycle     : seed, stalk, bush, flower
fruitColor      : green, yellow, black, no color
fertilizer      : True or False
x               : x-coord
y               : y-coord
*/
class Plant {
    constructor() {
        this.plantType = "apple"
        this.waterReserve = 0;
        this.growthCycle = "seed";
        this.fruitColor = null;
        this.fertilizer = false;
        this.blight = false;
    }
}

/*
x       : plot x-coord
y       : plot y-coord
plant   : apple, berry, or corn
*/
class Plot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.plant = null;
    }
}

/*
taskNum     : 0 to 50 -- keeps track of how many tasks its done
equipment   : plot, water can, fertilizer, barrel, 
*/
class farmzoid {
    constructor(currX, currY) {
        this.taskNum = 0;
        this.equipment = null;
        this.currX = 0;
        this.currY = 0;
    }
}