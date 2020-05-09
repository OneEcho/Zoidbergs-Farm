// farm.js
// Farm objects

const plotLocations = [
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

const riverLocations = [
    [25, 1], [25, 2],
    [26, 2], [26, 3],
    [27, 3], [27, 4],
    [28, 4], [28, 5],
    [29, 5], [29, 6],
    [30, 6], [30, 7],
    [31, 7], [31, 8],
    [32, 8], [32, 9],
    [33, 9], [33, 10],
    [34, 10], [34, 11],
    [35, 11], [35, 12],
    [36, 12], [36, 13],
    [37, 13], [37, 14],
    [38, 14], [38, 15],
];

const barnLocation = {x: 19, y: 19};

const plantStageColors = {
    yellowPlantColor: "#d9cf14",
    brownPlantColor: "#61390f",
    deadPlantColor: "#0a0602"
};

function heur_val(row, col, goal_row, goal_col){
    return Math.abs(row - goal_row) + Math.abs(col - goal_col)
}


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
        this.plantType = "apple";   // Apple, corn, or berry 
        this.growthCycle = "seed";  // Seed -> stalk -> bush
        this.waterReserve = 0;      // Water reserve
        this.fruitingState = null;  // 
        this.fertilized = false;
        this.blight = null;
        this.taskDone = null;
        this.age = 0;
        this.plantColor = null  // RGB color value
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
        this.hasPlot = false;
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
        this.taskCounter = 0;     // up to 50 tasks
        this.task = null;         // Assign a task object
        this.hasTask = false;     // Done a task yet?
        this.equipment = null;
        this.x = x;         // X position
        this.y = y;         // Y position
        this.barnX = 19;    // Know where the bar X,Y is
        this.barnY = 19;
        this.color = color; // Color of the farmzoid
        this.plotLocations = plotLocations; // Know where the plot locations are

        this.goal_row = null;
        this.goal_col = null;
    }

    // Set the farmzoids goal 
    setGoal(goal_row, goal_col) {
        this.goal_row = goal_row;
        this.goal_col = goal_col;
    }

    // OR ... Set the farmzoids goal based on the task given
    setGoalFromTask() {
        this.goal_row = task.row;   // Maybe not task.row, but plotLocation.row?
        this.goal_col = task.col;
    }

    setTask(task) {
        this.task = task;
    }

    grabTask(task) {
        if(this.x && this.y === this.barnX && this.barnY){
            this.task = task;
        }
    }

    doTask(plantPlot) {
        if(plantPlot.x === this.x && plantPlot.y === this.y && plantPlot.plant != null) {
            currPlot.doPlotTask();
        }
        if(platPlot.x === this.x && plantPlot.y === this.y && plantPlot.plant == null) {
            plantPlot.plant.doPlantTask();
        }
    }

    // TODO: Choosing random move / neighbors, maybe move based on goal (tasks, plant locations)?????
    bestFS() {
        let row, col;
        let top, topLeft, topRight, right, bottomRight, bottom, bottomLeft, left;
        let validHerusitics = [];
        let neighbors = []

        // Get row and col numbers
        row = this.x;
        col = this.y;

        // Index the grid and find the cell position
        topLeft     = grid[index(row-1, col-1)];    
        top         = grid[index(row-1, col)];     
        topRight    = grid[index(row-1, col+1)];    
        right       = grid[index(row, col+1)];     
        bottomRight = grid[index(row+1, col+1)];    
        bottom      = grid[index(row+1, col)];     
        bottomLeft  = grid[index(row+1, col-1)];    
        left        = grid[index(row, col-1)];     

        // If the cell is undefined and not an obstacle
        // Top left
        if(topLeft && topLeft.isObstacle === false) {
            topLeft.heur_val = heur_val(row-1, col-1, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(topLeft.heur_val);                                        // Add to valid heuristic values
            neighbors.push(topLeft);
            console.log("top left");
        }
        // Top
        if(top && top.isObstacle === false) {
            top.heur_val = heur_val(row-1, col, this.goal_row, this.goal_col);          // Generate h(n)
            validHerusitics.push(top.heur_val);                                          // Add to valid heuristic values
            neighbors.push(top);
            console.log("top");
        }
        // Top right
        if(topRight && topRight.isObstacle === false) {
            topRight.heur_val = heur_val(row-1, col+1, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(topRight.heur_val);                                           // Add to valid heuristic values
            neighbors.push(topRight);
            console.log("top right");
        }
        // Right
        if(right && right.isObstacle === false) {
            right.heur_val = heur_val(row, col+1, this.goal_row, this.goal_col);        // Generate h(n)
            validHerusitics.push(right.heur_val);                                              // Add to valid heuristic values
            neighbors.push(right);
            console.log("right");
        }
        // Bottom right
        if(bottomRight && bottomRight.isObstacle === false) {
            bottomRight.heur_val = heur_val(row+1, col+1, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(bottomRight.heur_val);                                           // Add to valid heuristic values
            neighbors.push(bottomRight);
            console.log("bottom right");
        }
        // Bottom
        if(bottom && bottom.isObstacle === false) {
            bottom.heur_val = heur_val(row+1, col, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(bottom.heur_val);                                         // Add to valid heuristic values
            neighbors.push(bottom);
            console.log("bottom");
        }
        // Bottom left
        if(bottomLeft && bottomLeft.isObstacle === false) {
            bottomLeft.heur_val = heur_val(row+1, col-1, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(bottomLeft.heur_val);                                            // Add to valid heuristic values
            neighbors.push(bottomLeft);
            console.log("bottom left");
        }
        // Left
        if(left && left.isObstacle === false) {
            left.heur_val = heur_val(row, col-1, this.goal_row, this.goal_col);      // Generate h(n)
            validHerusitics.push(left.heur_val);                                          // Add to valid heuristic values
            neighbors.push(left);
            console.log("left");
        }

        // Pushes the cell with the lowest Heuristic value into neighbors list
        if(neighbors.length > 0) {
            //console.log("neighbors are: " + JSON.stringify(neighbors));
            let min = Math.min.apply(Math, neighbors.map(function(o) { return o.heur_val; }))
            //console.log(min);
            let index = neighbors.map(function(e) { return e.heur_val; }).indexOf(min);
            //console.log(index);
            return neighbors[index];
        } else {
            return null;
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
    constructor(dayCount) {
        this.taskList = [];
        this.taskCount = 0;
        this.dayCounter = dayCount;
    }

    addTasks(task) {
        if(this.taskCount <= 200) {
            this.taskList.push(task);
            this.taskCount++;
        }
        else {
            this.checkNewDay();
        }
    }

    checkNewDay() {
        if(this.taskCount === 200) {
            console.log("Task count is 200 ... Starting new day");
            this.taskList.clear;
            this.taskCount = 0;

            if(this.dayCounter <= 40) { 
                //alert("Day 40 reached!");
            }
            this.dayCounter++;
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
        this.nature = nature;
        this.fms = fms;
        this.farmzoids = [new Farmzoid(21, 19, "green"), new Farmzoid(17, 19, "blue"), 
                          new Farmzoid(19, 21, "pink"), new Farmzoid(19, 17, "yellow")];
    }

    natureEffects() {
        console.log("natureEffects()");
        nature.updateWeather();

        // Loop through all plots
        for(let i = 0; i < 20; i++) {

            // If there is a plant in the plot
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
                if(validPlots[i].plant.fruitingState === "red" && validPlots[i].plant.age == validPlots[i].plant.age + 2) {
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

    setupTasks() {
        for(let i = 0; i < 20; i++) {
            if(validPlots[i].hasPlot === false){
                fms.addTasks(new Task("place plot", validPlots[i], "plot equipment"));
            }
        }
        for(let i = 0; i < fms.taskList.length; ++i) {

        }
    }

    // Randomly check for neighbors in all 8 directions?
    checkNeighbors() { 
        console.log("checkNeighbors()");
        let randomNum;
        let row;
        let col;
        let top, topLeft, topRight, right, bottomRight, bottom, bottomLeft, left;

        // Check and calc best neighbors for all farmZoIDs
        for(let i = 0; i < this.farmzoids.length; ++i) {
            let next = this.farmzoids[i].bestFS();  // Check all 8 adjacent cells

            // If valid cell
            if(next) {
                // Reset the current cell where bot is
                //grid[index(this.farmzoids[i].x, this.farmzoids[i].y)].reset_farmzoidCell();    
                
                // Update new position to move from heuristic 
                this.farmzoids[i].x = next.row; 
                this.farmzoids[i].y = next.col;
                console.log("current: " + this.farmzoids[i].x + " " + this.farmzoids[i].y);
                console.log("next: " + next.row + " " + next.col);

                // Redraw bot
                grid[index(this.farmzoids[i].x, this.farmzoids[i].y)].show_farmzoid(this.farmzoids[i].color);
            }
        } // End for loop
        
    }

    // Color farmzoids
    drawFarmZoids() {
        for(let i = 0; i < workingmem.farmzoids.length; ++i) {
            let x = workingmem.farmzoids[i].x;
            let y = workingmem.farmzoids[i].y;
            let color = workingmem.farmzoids[i].color;
            console.log("Farmzoid # " + i + " at " + x + ", " + y);
            grid[index(x, y)].show_farmzoid(color);
        }
    }

    // Color dirt, plots, river, cave
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
        for(let i = 0; i < riverLocations.length; i++) {
            let x = riverLocations[i][0];
            let y = riverLocations[i][1];
            grid[index(x, y)].show_river();
        }
        // let iy = 25
        // let sz = g_canvas.cell_size;
        // for(let ix = 1; ix <= 15; ix++)
        // {
        //     if(ix < 16 && iy < 39)
        //     {
        //         grid[index(ix, iy)].show_river();
        //         grid[index(ix+1, iy)].show_river();
        //         iy++;
        //     }
        // }

        // Color cave
        for(let x = 26; x < 30; x++) {
            for(let y = 14; y < 19; y++) {
                grid[index(x, y)].show_cave();
            }
        }

        // Color barn
        grid[index(barnLocation.x, barnLocation.y)].show_barn();

        // Color bridge
        grid[index(30, 6)].show_bridge();
        grid[index(30, 7)].show_bridge();
        grid[index(35, 11)].show_bridge();
        grid[index(35, 12)].show_bridge();
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
var fms = new FMS(1);
var workingmem = new WorkingMem(nature, fms, validPlots);

var cols, rows;

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

    // TESTING goals... Delete later!!!!!!
    workingmem.farmzoids[0].setGoal(0, 0);
    workingmem.farmzoids[1].setGoal(39, 39);
    workingmem.farmzoids[2].setGoal(39, 0);
    workingmem.farmzoids[3].setGoal(0, 39);

    workingmem.drawGrid();
    workingmem.drawFarmZoids();

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
    workingmem.checkNeighbors();    // Draw farmzoids
    
    let dayCount = 1;
    console.log("current day:" + dayCount);
    if(dayCount > workingmem.fms.dayCounter){
        console.log("it's a new day")
        workingmem.natureEffects();
        workingmem.setupTasks();
        workingmem.fms.checkNewDay();
        dayCount = workingmem.fms.dayCounter;
        console.log("new day is: " + dayCount)
    }
    // Update daily nature changes
    // workingmem.natureEffects();
    // workingmem.setupTasks();
    // workingmem.fms.checkNewDay();

    console.log(workingmem.fms.taskList);
}
