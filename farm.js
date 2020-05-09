// farm.js
// Farm objects

let plotLocations = [
    [8, 13],    // plot 1
    [8, 10],    // plot 2
    [11, 13],   // plot 3
    [11, 10],   // plot 4
    [15, 10],   // plot 5
    [15, 13],   // plot 6
    [18, 13],   // plot 7
    [18, 10],   // plot 8
    [22, 10],   // plot 9
    [25, 10],   // plot 10
    [22, 13],   // plot 11
    [25, 13],   // plot 12
    [29, 10],   // plot 13
    [32, 10],   // plot 14
    [29, 13],   // plot 15
    [32, 13],   // plot 16
    [29, 16],   // plot 17
    [32, 16],   // plot 18
    [29, 19],   // plot 19
    [32, 19]    // plot 20
];

let barnLocation = {x: 19, y: 19};

/*******************************************************************************************************************
 Nature Class -- defines nature effects
--------------------------------------------------------------------------------------------------------------------
sky             : clear, cloud, or rainy
wind            : N, S, E, W
dayCount        : current day number (cannot exceed 40)
temperature     : warm or cold
plots           : list of plots on the land
blight          : bApple, bCorn, bBerry, none
*******************************************************************************************************************/
class Nature {
    constructor() {
        this.sky = "clear"; 
        this.wind = "N";
        this.temperature = "warm";
        this.blight = null;
        this.moveCounter = 0;
        this.plots = validPlots;
    }

    // Update the weather each day
    updateWeather() {
        this.randCloudy();  // RNG for weather
        this.randBlight();  // RNG for blgiht
    }

    randCloudy() { 
        console.log("randCloudy()");
        let rng = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 10% chance of being cloudy
        if(rng === 1) {
            console.log("\tSky is cloudy");
            this.sky = "cloudy";

            rng = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 50% chance of raining when cloudy
            if(rng <= 5) {
                console.log("\tSky is rainy");
                this.sky = "rainy";
                return "rainy";
            }

            return "cloudy";
        }
        this.sky = clear;
        return false;
    }

        
    randBlight() {
        console.log("randBlight()");
        let rng = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 2% chance of having blight and stalling growth
        var blightType = ["corn", "berry", "apple"];

        if(rng <= 2) {    
            this.blight = blightType[Math.floor(Math.random() * blightType.length)];
            console.log("\tBlight occurred for " + this.blight);
            return this.blight;
        }

        return false;
    }
}

/*******************************************************************************************************************
Plant Class -- defines plant components
--------------------------------------------------------------------------------------------------------------------
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
        this.plantType = null; 
        this.growthCycle = "seed";
        this.waterReserve = 0;
        this.fruitingState = null;
        this.fertilized = false;
        this.blight = null;
        this.taskDone = null;
        this.age = 0;
    }

    incrementAge() {
        this.age++;
        console.log("increased age to " + this.age)
    }

    decrementAge() {
        this.age--;
        console.log("decrease age to " + this.age)
    }

    doPlantTask() {
        if(this.taskDone === "watering") {
            waterReserve++;
            console.log("plant watered")
        }
        if(this.taskDone === "soaping") {
            this.plantBlight = null;
            console.log("blight fixed")
        }
        if(this.taskDone === "fertilize") {
            this.fertilized = true;
            console.log("plant fertilized")
        }
    }

    // do plant color change here
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
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 1 && this.growthCycle === "seed" && this.blight === null) {
            this.growthCycle = "stalk"
            console.log("corn seed is now stalk")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 3 && this.growthCycle === "stalk" && this.blight === null) {
            this.growthCycle = "bush"
            console.log("corn stalk is now bush")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 5 && this.growthCycle === "bush" && this.blight === null) {
            this.growthCycle = "flower"
            console.log("corn bush is now flower")
        }
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve <= 3 && this.age > 7 && this.growthCycle === "flower" && this.blight === null) {
            this.growthCycle = "fruiting"
            this.fruitingState = "green"
            console.log("corn flower is now fruiting")
        }
    }

    // do fruit color change here
    updateFruitingState() {
        // Apple Fruiting State
        if(this.plantType === "apple" && this.waterReserve > 0 && this.waterReserve < 3 && this.age > 15 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("apple is now harvestable")
        }

        // Berry fruitying state
        if(this.plantType === "berry" && this.waterReserve > 0 && this.waterReserve < 3 && this.age > 11 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("berry is now harvestable")
        }

        // Corn fruiting state
        if(this.plantType === "corn" && this.waterReserve > 0 && this.waterReserve < 3 && this.age > 8 && this.fruitingState === "green" && this.blight === null) {
            this.fruitingState = "red"
            console.log("corn is now harvestable")
        }
    }

    // do blight effect of cell here
    blightEffects(blight) {
        if(blight === this.plantType) {
            this.blight = blight
        }
    }

    // do change color of cell here
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
Plot Class -- defines coordinates for a plot and the plant type
--------------------------------------------------------------------------------------------------------------------
x       : plot x-coord
y       : plot y-coord
plant   : apple, berry, or corn
*******************************************************************************************************************/
class Plot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.plant = new Plant();
        this.hasPlot = true;
        this.taskDone = null;
    }

    doPlotTask(task) {
        if(task.taskName === "place plot") {
            this.hasPlot = true;
        }
        if(task.taskName === "plant seed") {
            this.plant= task.equipment;
        }
    }

    // call this when farmzoid plants a seed
    plantSeed(plant) {
        this.plant = plant;
    }
}

/*******************************************************************************************************************
Farmzoid Class -- defines the farmzoid bot
--------------------------------------------------------------------------------------------------------------------
taskNum         : 0 to 50 -- keeps track of how many tasks its done
equipment       : plot, water can, fertilizer, barrel, or soap
barnX           : x-coord of barn
barnY           : y-coord of barn
x               : current x-coord
y               : current y-coord
plotLocations   : list of coords of valid plots
*******************************************************************************************************************/
class Farmzoid {
    constructor(x, y, color) {
        this.taskCounter = 0;   // up to 50 tasks
        this.task = null;
        this.hasTask = false;
        this.equipment = null;
        this.x = x;         // X position
        this.y = y;         // Y position
        this.barnX = 19;    // Know where the bar X,Y is
        this.barnY = 19;
        this.color = color; // Color of the farmzoid
        this.plotLocations = plotLocations; // Know where the plot locations are
    }

    setTask(task) {
        this.task = task;
        this.hasTask = true
    }

    /*
    grabTask(task) {
        if(this.x && this.y === this.barnX && this.barnY){
            this.task = task;
        }
    }
    */

    doTask(plantPlot) {
        if(plantPlot.x === this.x && plantPlot.y === this.y && plantPlot.plant != null) {
            currPlot.doPlotTask();
            this.task.taskCompleted = true;
            dailyTaskCount++;
            this.hasTask = false;
            console.log(this.task.taskName + " completed");
        }
        if(platPlot.x === this.x && plantPlot.y === this.y && plantPlot.plant == null) {
            plantPlot.plant.doPlantTask();
            this.task.taskCompleted = true;
            dailyTaskCount++;
            this.hasTask = false;
            console.log(this.task.taskName + " completed");
        }
    }
}

/*******************************************************************************************************************
barnX               : x-coord of barn
barnY               : y-coord of barn
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

/******************************************************************************************************************
FMS Class -- setup farmzoid tasks
-------------------------------------------------------------------------------------------------------------------
taskList        : List of tasks farmzoids need to do
taskCount       : Keeps count of the number of tasts done (200 per day, 50 for each farmzoid)
day             : Keeps track of the day
*******************************************************************************************************************/
class FMS {
    constructor(dayCount, validPlots) {
        this.taskList = [];
        this.taskCount = 0;
        this.dayCounter = dayCount;
        this.validPlots = validPlots;
    }

    natureEffects() {
        console.log("natureEffects()");
        nature.updateWeather();

        for(let i = 0; i < 20; i++) {
            if(validPlots[i].plant != null) {
                validPlots[i].plant.incrementAge();
                validPlots[i].plant.updateGrowthCycle();
                validPlots[i].plant.updateFruitingState();
                if(nature.sky === "clear" && validPlots[i].plant.waterReserve > 0) {
                    validPlots[i].plant.waterReserve--;
                    console.log("\tday was clear, dec water");
                }
                if(nature.sky === "rainy") {
                    validPlots[i].plant.waterReserve++;
                    console.log("\tday was rainy, inc water");
                }
                if(nature.sky === "cloudy") {
                    validPlots[i].plant.decrementAge();
                    console.log("\tday was cloudy, stall ageing")
                }
                if(validPlots[i].plant.waterReserve === 0) {
                    validPlots[i].plant.decrementFruitColor();
                }
                if(validPlots[i].plant.fruitingState === "black" && validPlots[i].plant.age == validPlots[i].plant.age + 2) {
                    validPlots[i].plant.plantType = null;
                    // change back to empty plot
                    console.log("\tplant is now dead after 2 days of fruit being black")
                }
                if(validPlots[i].plant.blight != null) {
                    validPlots[i].plant.blightEffects(nature.blight);
                }
            }
        }
    }
}


/******************************************************************************************************************
Task Class -- task class with necessary components
-------------------------------------------------------------------------------------------------------------------
taskName        : name of task
equipment       : equipment needed
plotLocation    : location of plot that task needs to be done
*******************************************************************************************************************/
class Task {
    constructor(taskName, plotLocation, equipment) {
        this.taskName = taskName;
        this.plotLocation = plotLocation;
        this.equipment = equipment;
        this.taskCompleted = false;
    }
}

/******************************************************************************************************************
WorkingMem Class -- sets up rules and nature effects
-------------------------------------------------------------------------------------------------------------------
validPlots      : List of valid plots
nature          : Nature class to access current weather
fms             : FMS class to access tasks
farmzoid        : List of 4 bots
*******************************************************************************************************************/
class WorkingMem{
    constructor(nature, fms, validPlots) {
        this.validPlots = validPlots; 
        console.log(validPlots);
        this.nature = nature;
        this.fms = fms;
        this.farmzoids = [new Farmzoid(21, 19, "green"), new Farmzoid(17, 19, "blue"), new Farmzoid(19, 21, "pink"), new Farmzoid(19, 17, "yellow")];
    }

    generateTasks() {
        for(let j = 0; j < 4; j++){
            if(this.farmzoids[j].hasTask === false) {
                for(let i = 0; i < 20; i++) {
                    if(validPlots[i].hasPlot === false){
                        // fms.addTasks(new Task("place plot", validPlots[i], "plot equipment"));
                        this.farmzoids[j].setTask(new Task("place plot", validPlots[i], "plot equipment"));
                    } else {
                        if(validPlots[i].plant.plantType === null) {
                            this.farmzoids[j].setTask(new Task("plant seed", validPlots[i], "apple"));
                        }
                        else if(validPlots[i].plant.fertilized === false){
                            this.farmzoids[j].setTask(new Task("fertilize", validPlots[i], "fertilizer"));
                        }
                        else if(validPlots[i].plant.fertilized === true && validPlots[i].plant.waterReserve <= 3) {
                            this.farmzoids[j].setTask(new Task("watering", validPlots[i], "water"));
                        }
                        else if(validPlots[i].plant.blight != null) {
                            this.farmzoids[j].setTask(new Task("soaping", validPLots[i], "soap"));
                        }
                        else if(validPlots[i].plant.fruitingState === "red" && validPlots[i].plant.waterReserve > 0 && validPlots[i].plant.waterReserve <=3) {
                            this.farmzoids[j].setTask(new Task("harvest", validPlots[i], "barrel"));
                        }
                    }
                }
            }   
        }
    }

    // Randomly check for neighbors in all 8 directions?
    checkNeighbors() { 
        console.log("checkNeighbors()");
        let randomNum;
        let row;
        let col;
        let top, topLeft, topRight, right, bottomRight, bottom, bottomLeft, left;

        // TODO: Choosing random move / neighbors, maybe move based on goal (tasks, plant locations)?????
        for(let i = 0; i < this.farmzoids.length; ++i) {
            randomNum = Math.floor((Math.random() * 8) + 1);  // 1 - 8
            row = this.farmzoids[i].x;
            col = this.farmzoids[i].y;

            topLeft     = grid[index(row-1, col-1)];    // 1
            top         = grid[index(row-1, col)];      // 2
            topRight    = grid[index(row-1, col+1)];    // 3
            right       = grid[index(row, col+1)];      // 4
            bottomRight = grid[index(row+1, col+1)];    // 5
            bottom      = grid[index(row+1, col)];      // 6
            bottomLeft  = grid[index(row+1, col-1)];    // 7
            left        = grid[index(row, col-1)];      // 8

            // Check for move location, valid cell, and if it's not an obstacle
            if(randomNum === 1 && topLeft && topLeft != "obstacle") // top left
            {
                // console.log("Farmzoid # " + i + " moving top left");
                // console.log("before : " + this.farmzoids[i].x + ", " + this.farmzoids[i].y);
                this.farmzoids[i].x = row-1;   // Change farmzoids X, Y position
                this.farmzoids[i].y = col-1;
                //console.log("after : " + this.farmzoids[i].x + ", " + this.farmzoids[i].y);
            }
            else if(randomNum <= 2 && top && top != "obstacle")     // top
            {
                this.farmzoids[i].x = row-1;
                console.log("Farmzoid # " + i + " moving top");
            }
            else if(randomNum <= 3 && topRight && topRight != "obstacle") // top right
            {
                this.farmzoids[i].x = row-1;
                this.farmzoids[i].y = col+1;
                console.log("Farmzoid # " + i + " moving top right");
            }
            else if(randomNum <= 4 && right && right != "obstacle") // right
            {
                this.farmzoids[i].x = col+1;
                console.log("Farmzoid # " + i + " moving right");
            }
            else if(randomNum <= 5 && bottomRight && bottomRight != "obstacle") // bottom right
            {
                this.farmzoids[i].x = row+1;
                this.farmzoids[i].y = col+1;
                console.log("Farmzoid # " + i + " moving bottom right");
            }
            else if(randomNum <= 6 && bottom && bottom != "obstacle") // bottom 
            {
                this.farmzoids[i].x = row+1;
                console.log("Farmzoid # " + i + " moving bottom left");
            }
            else if(randomNum <= 7 && bottomLeft && bottomLeft != "obstacle") //bottom left
            {
                this.farmzoids[i].x = row+1;
                this.farmzoids[i].y = col-1;
                console.log("Farmzoid # " + i + " moving bottom left");
            }
            else if(randomNum <= 8 && left && left != "obstacle") // left
            {
                this.farmzoids[i].y = col-1;
                console.log("Farmzoid # " + i + " moving left");
            }
            else {
                console.log("Farmzoid # " + i + " tried to move to invalid cell");
                i--;    // Redo for that bot
            }
        }
    }

    drawGrid() {
        // Color the dirt
        for(let i = 0; i < grid.length; i++) {
            grid[i].show_dirt();
        }
        
        // Color the plots
        for(let i = 0; i < plotLocations.length; i++) {
            let x = plotLocations[i][1];
            let y = plotLocations[i][0];
            grid[index(x, y)].show_plots();
        }

        // Color river
        grid[0].show_river();

        // Color cave
        for(let x = 14; x < 19; x++) {
            for(let y = 26; y < 30; y++) {
                grid[index(x, y)].show_cave();
            }
        }

        // Color barn
        grid[index(barnLocation.x, barnLocation.y)].show_barn();

    }
    
}
// End of Farm Objects


/*******************************************************************************************************************
 
    Global Variables

*******************************************************************************************************************/

// set validPlots
let validPlots =    [new Plot(plotLocations[0][0], plotLocations[0][1]), 
                     new Plot(plotLocations[1][0], plotLocations[1][1]), 
                     new Plot(plotLocations[2][0], plotLocations[2][1]), 
                     new Plot(plotLocations[3][0], plotLocations[3][1]), 
                     new Plot(plotLocations[4][0], plotLocations[4][1]),
                     new Plot(plotLocations[5][0], plotLocations[5][1]),
                     new Plot(plotLocations[6][0], plotLocations[6][1]),
                     new Plot(plotLocations[7][0], plotLocations[7][1]),
                     new Plot(plotLocations[8][0], plotLocations[8][1]),
                     new Plot(plotLocations[9][0], plotLocations[9][1]),
                     new Plot(plotLocations[10][0], plotLocations[10][1]),
                     new Plot(plotLocations[11][0], plotLocations[11][1]),
                     new Plot(plotLocations[12][0], plotLocations[12][1]),
                     new Plot(plotLocations[13][0], plotLocations[13][1]),
                     new Plot(plotLocations[14][0], plotLocations[14][1]),
                     new Plot(plotLocations[15][0], plotLocations[15][1]),
                     new Plot(plotLocations[16][0], plotLocations[16][1]),
                     new Plot(plotLocations[17][0], plotLocations[17][1]),
                     new Plot(plotLocations[18][0], plotLocations[18][1]),
                     new Plot(plotLocations[19][0], plotLocations[19][1])];

var nature = new Nature();
var fms = new FMS(1, validPlots);
var workingmem = new WorkingMem(nature, fms, validPlots);

var cols, rows;

let mainDayCount = 0;
let dailyTaskCount = 50;

// End of Farm Methods

/*******************************************************************************************************************
 
    Bot Movement

*******************************************************************************************************************/
// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas; // JS Global var, w canvas size info.
var g_frame_cnt; // Setup a P5 display-frame counter, to do anim
var g_frame_mod; // Update ever 'mod' frames.
var g_stop; // Go by default.
var g_cnv;   // To hold a P5 canvas.
var g_button; // btn
var g_button2; // btn
var g_l4job = { id:1 }; // Put Lisp stuff for JS-to-access in ob; id to make ob.
var grid = [];
var frameCounter = 0;

function setup() // P5 Setup Fcn
{
    console.log( "setup()");
    g_canvas = { cell_size:20, wid:40, hgt:40 };
    g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
    g_frame_mod = 24; // Update ever 'mod' frames.
    g_stop = 0;     // Go by default.

    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1.
    let height = sz * g_canvas.hgt;

    cols = floor(width/sz)
    rows = floor(height/sz)

    g_cnv = createCanvas( width, height );  // Make a P5 canvas.
    console.log("\tcreateCanvas()" );

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let cell = new Cell(i, j);  // Create new cell with x, y coords
            grid.push(cell);            // Push into list
        }
    }

    // Change framerate speed
    frameRate(1)
    //do_btn( ); 
}

// Main farm loop?
function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    console.log("draw()");
    console.log("frame = " + frameCounter);
    frameCounter++;

    workingmem.drawGrid();

    // Color farmzoids
    for(let i = 0; i < workingmem.farmzoids.length; ++i) {
        let x = workingmem.farmzoids[i].x;
        let y = workingmem.farmzoids[i].y;
        let color = workingmem.farmzoids[i].color;
        console.log("Farmzoid # " + i + " at " + x + ", " + y);
        grid[index(x, y)].show_farmzoids(color);
    }

    if(dailyTaskCount === 50) {
        mainDayCount++;
        console.log("\tit's a new day, day " + mainDayCount)
        dailyTaskCount = 0;
        workingmem.fms.natureEffects();
    }
    workingmem.generateTasks();
    
    // Update daily nature changes

    // workingmem.fms.checkNewDay();

    workingmem.checkNeighbors();
}

/*******************************************************************************************************************

    RANDOM FUNCTIONS

*******************************************************************************************************************/
function do_btn( )
{ // grab code from csu\assets\js\js+p5+editbox

    // Creates an <input></input> element in the DOM for text input.
    // Use g_input.size() to set the display length of the box.
    g_input = createInput( ); // Create input textbox; get via "contentx = g_input.value();"
    g_input.position(  20, 30 );
    g_button = createButton( "Submit" );
    g_button.id( "btn" ); //Add for P5 btn onclick
    g_button.position( 160, 30 );

    g_button2 = createButton( "Save Image" );
    g_button2.position( 20, 60 );
    g_button2.mousePressed( save_image ); // the callback
}

function save_image( ) // btn
{
    save('myCanvas-' + g_frame_cnt +  '.jpg');
}

var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.

function csjs_get_pixel_color_sum( rx, ry )
{
    let acolors = get( rx, ry ); // Get pixel color [RGBA] array.
    let sum = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ]; // Sum RGB.
    //dbg console.log( "color_sum = " + sum );
    return sum;
}


function keyPressed( )
{
    console.log( "@: keyPressed " );
    g_stop = ! g_stop;
    if (g_stop) { noLoop(); } else {loop();}
}

function mousePressed( )
{
    console.log( "@: mousePressed " );
    let x = mouseX;
    let y = mouseY;
    //dbg console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //dbg console.log( "grid x,y = " + gridx + "," + gridy );
    //dbg console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    farmzoidOne.x = gridx + g_box.wid; // Ensure its positive.
    //dbg console.log( "bot x = " + farmzoidOne.x );
    farmzoidOne.x %= g_box.wid; // Wrap to fit box.
    farmzoidOne.y = gridy + g_box.hgt;
    //dbg console.log( "bot y = " + farmzoidOne.y );
    farmzoidOne.y %= g_box.hgt;
    //dbg console.log( "bot x,y = " + farmzoidOne.x + "," + farmzoidOne.y );
    console.log( "Call g_l4job.draw_fn for mousePressed" );
    g_l4job.draw_fn( );
}