// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-02-02 14:46:00 Chuck Siska>
// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.

function draw_grid( rminor, rmajor) 
{
    stroke( "black" );
    fill( "black" );;
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz;
    let zz = sz - 2;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        // if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        // if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
    }


    // Draws the river
    fill('blue');
    var iy = 25
    for(var ix = 1; ix <= 15; ix += 1)
    {
        if(ix < 16 && iy < 39)
        {
            rect(ix*sz, iy*sz, sz, sz);
            rect((ix + 1)*sz, iy*sz, sz, sz)
            iy += 1;
        }
    }

    // Draws the bridges
    fill('tan')
    rect(6*sz, 30*sz, sz, sz)
    rect(7*sz, 30*sz, sz, sz)
    rect(11*sz, 35*sz, sz, sz)
    rect(12*sz, 35*sz, sz, sz)

    // Draw the Barn
    fill('red')
    rect(19 * sz , 19 * sz, sz, sz)
}
