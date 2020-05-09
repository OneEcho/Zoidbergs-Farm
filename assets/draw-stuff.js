// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-02-02 14:46:00 Chuck Siska>
// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.

// Cell object
class Cell {
    constructor(row, col) {
        this.row = row;             // Row number
        this.col = col;             // Col number
        this.color = "";            // Dirt, plot, barn, river, cave, farmzoid
        this.isObstacle = false;    // Is it passasble terrain?
        this.heur_val = 0;          // Heuristic value forr BFS
    }

    // Fill background with dirt dells
    show_dirt() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('tan');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "dirt";
        this.isObstacle = false;
    }

    // Color plot cells
    show_plots() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('peru');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "plot";
    }

    // Color cave cell
    show_cave() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        fill('black')
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "cave"
        this.isObstacle = true;
    }

    // Color barn cell
    show_barn() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('DarkRed')
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "barn";
    }

    // Color river cells
    show_river() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        fill('blue');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "river";
        this.isObstacle = true;
    }

    show_bridge() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        fill('grey');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "bridge";
        this.isObstacle = false;
    }

    // Color a farmzoid
    show_farmzoid(color) {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill(color);
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.isObstacle = true;
    }

    // Reset the current cell position of the bot, so other bots can consider moving to this
    // location after this bot has determined its bestFS move
    reset_farmzoidCell() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);

        if(this.color === "barn") {
            fill('DarkRed')
            this.color === "barn";
        }
        else if(this.color === "plot") {
            fill("peru");
            this.color === "plot";
        }
        else {
            fill("tan");
            this.color = "dirt";
        }

        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.heur_val = 0;
        this.isObstacle = false; 
    }

}

// Return 2D coords into 1D index
function index(i, j) {
    // Check out of bounds
    if (i < 0 || j < 0 || j > cols-1 || i > rows -1) {
        return false;
    }

    return j + i * cols;
}