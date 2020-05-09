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
    // let x = mouseX;
    // let y = mouseY;
    // //dbg console.log( "mouse x,y = " + x + "," + y );
    // let sz = g_canvas.cell_size;
    // let gridx = round( (x-0.5) / sz );
    // let gridy = round( (y-0.5) / sz );
    // //dbg console.log( "grid x,y = " + gridx + "," + gridy );
    // //dbg console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    // farmzoidOne.x = gridx + g_box.wid; // Ensure its positive.
    // //dbg console.log( "bot x = " + farmzoidOne.x );
    // farmzoidOne.x %= g_box.wid; // Wrap to fit box.
    // farmzoidOne.y = gridy + g_box.hgt;
    // //dbg console.log( "bot y = " + farmzoidOne.y );
    // farmzoidOne.y %= g_box.hgt;
    // //dbg console.log( "bot x,y = " + farmzoidOne.x + "," + farmzoidOne.y );
    // console.log( "Call g_l4job.draw_fn for mousePressed" );
    g_l4job.draw_fn( );
}