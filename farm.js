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

// random type of blight shuffler
function shuffleBlight(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

// call to change day, and also check to see if the growing season has ended
function dayCounter(dayCount) {
    dayCount = dayCount + 1;

    if( dayCount == 41){
        // growing season ends
    }
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
        this.dayCount = 0;
        this.temperature = "warm";
        this.blight = null;
        this.moveCounter = 0;
        this.plots = validPlots;
    }

    updateWeather() {
        this.randCloudy();
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
        let blight_chance = Math.floor((Math.random() * 10) + 1);  // 1 - 10, 2% chance of having blight and stalling growth
        var blightType = ["corn", "berry", "apple"];
        shuffleBlight(blightType);
        if(blight_chance === 1 || blight_chance === 2) {    
            console.log("\tBlight occurred");
            this.blight = blightType[0];
        }
        else {
            console.log("\tBlight didnt occur");
        }
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
        this.plantType = "apple";
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
        this.taskDone = 0;   // up to 50 tasks
        this.task = null;
        this.taskCompleted = false;
        this.equipment = null;
        this.x = x;
        this.y = y;
        this.barnX = 19;
        this.barnY = 19;
        this.color = color;
        this.plotLocations = plotLocations;
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
        console.log(validPlots);
        this.nature = nature;
        this.fms = fms;
        this.farmzoid = [new Farmzoid(21, 19), new Farmzoid(17, 19), new Farmzoid(19, 21), new Farmzoid(19, 17)];
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

    setupTasks() {
        for(let i = 0; i < 20; i++) {
            if(validPlots[i].hasPlot === false){
                fms.addTasks(new Task("place plot", validPlots[i], "plot equipment"));
            }
        }
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

var farmzoidOne = new Farmzoid(21, 19, "green");
var farmzoidTwo = new Farmzoid(17, 19, "blue");
var farmzoidThree = new Farmzoid(19, 21, "pink");
var farmzoidFour = new Farmzoid(19, 17, "yellow");

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
var count = 0;

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
    frameRate(0.5)

    do_btn( ); 
}

// Main farm loop?
function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    console.log("draw()");
    count++;
    console.log("count = " + count);

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
    for(let x = 14; x < 19; x++)
    {
        for(let y = 26; y < 30; y++)
        {
            grid[index(x, y)].show_cave();
        }
    }

    // Color barn
    grid[index(19, 19)].show_barn();

    // Update daily nature changes
    workingmem.natureEffects();
    workingmem.setupTasks();
    console.log(workingmem.fms.taskList);
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