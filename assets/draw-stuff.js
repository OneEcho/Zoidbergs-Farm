// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-02-02 14:46:00 Chuck Siska>
// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.



function draw_grid( rminor, rmajor) 
{
    stroke( "gray" );
    fill( "gray" );
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
    fill('DarkRed')
    rect(19 * sz , 19 * sz, sz, sz)

    // Draw the cave
    fill('black')
    for(var x = 14; x < 19; x += 1)
    {
        for(var y = 26; y < 30; y += 1)
        {
            rect(x * sz, y * sz, sz, sz)
        }
    }

    // Draw the plots
    fill('peru')
    rect(8 * sz, 13 * sz, sz, sz) // plot 1 at 8, 13
    rect(8 * sz, 10 * sz, sz, sz) // plot 2 at 8, 10
    rect(11* sz, 13 * sz, sz, sz) // plot 3 at 11, 13
    rect(11* sz, 10 * sz, sz, sz) // plot 4 at 11, 10

    rect(15* sz, 10 * sz, sz, sz) // plot 5 at 8, 13
    rect(15* sz, 13 * sz, sz, sz) // plot 6 at 15, 13
    rect(18* sz, 13 * sz, sz, sz) // plot 7 at 18, 13
    rect(18* sz, 10 * sz, sz, sz) // plot 8 at 18, 10

    rect(22* sz, 10 * sz, sz, sz) // plot 9 at 22, 10
    rect(25* sz, 10 * sz, sz, sz) // plot 10 at 25, 10
    rect(22* sz, 13 * sz, sz, sz) // plot 11 at 22, 13
    rect(25* sz, 13 * sz, sz, sz) // plot 12 at 25, 13

    rect(29* sz, 10 * sz, sz, sz) // plot 13 at 29, 10
    rect(32* sz, 10 * sz, sz, sz) // plot 14 at 32, 10
    rect(29* sz, 13 * sz, sz, sz) // plot 15 at 29, 13
    rect(32* sz, 13 * sz, sz, sz) // plot 16 at 32, 13

}
