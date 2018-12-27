function colorChange( event ) {
    // console.log(event.target.id);
    var color = event.target.id.substr(3);
    
    if ( color == "Blue" ) { 
        $('#tittle').attr("class","text-primary");
    }
    if ( color == "Green" ) { 
        $('#tittle').attr("class","text-success");
    }
    if ( color == "Reset" ) { 
        $('#tittle').attr("class","");
    }
}

function main_changeColor() {
    //console.log("main change color start ...");

    $("#btnBlue").on("click",colorChange);
    $("#btnGreen").on("click",colorChange);
    $("#btnReset").on("click",colorChange);
}