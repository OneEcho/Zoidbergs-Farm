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
        this.color = "";            // Color of cell (red, black, purple...)
        this.obstacle = false;      // Is it passable terrain?
    }

    // Fill cells
    show_dirt() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('tan');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "dirt";
        this.obstacle = false;
    }

    show_plots() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('peru');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "plot";
    }

    show_cave() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        fill('black')
        rect(x, y, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "cave"
        this.obstacle = true;
    }

    show_barn() {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill('DarkRed')
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.color = "barn";
    }

    show_river() {
        let x = this.col * g_canvas.cell_size;
        let y = this.row * g_canvas.cell_size;
        let sz = g_canvas.cell_size;
        stroke(255);
        fill('blue');
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        
        // Bridge paths
        fill('grey')
        rect(6*sz, 30*sz, sz, sz)
        rect(7*sz, 30*sz, sz, sz)
        rect(11*sz, 35*sz, sz, sz)
        rect(12*sz, 35*sz, sz, sz)
    }

    // Different functions for farmzoids 1-4?
    show_farmzoids(color) {
        let y = this.col * g_canvas.cell_size;
        let x = this.row * g_canvas.cell_size;
        stroke(255);
        fill(color);
        rect(y, x, g_canvas.cell_size, g_canvas.cell_size);
        this.obstacle = true;
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