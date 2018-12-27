function doCalculation( index ) {
    sel = eval(index);
    $("#answer").val(sel);
}

function clearCalculation() {
    $("#calculation").val("");
    $("#answer").val("");
}

function deleteCalculation() {
    if ( $("#answer").val() != "NULL" ) {
        $("#answer").val("");
    }

    sel = $("#calculation").val();
    sel = sel.substring(0,sel.length-1);
    $("#calculation").val(sel);
}

function setCalculation(e) {
    //console.log(this);

    var Ops = {
        "Add":"+",
        "Sub":"-",
        "Mul":"*",
        "Div":"/",
        "LeftPT":"(",
        "RightPT":")"
    };

    newCalculation = $("#calculation").val();
    sel = this.id.substring(3);
    
    switch ( sel ) {
        case "Add":
        case "Sub":
        case "Mul":
        case "Div":
        case "Dot":
        case "LeftPT":
        case "RightPT":
            sel = Ops[sel];
            break;

        case "Calculate":
            doCalculation(newCalculation);
            return;
            break;
        case "Cls":
            clearCalculation();
            return;
            break;
        case "Del":
            deleteCalculation();
            return;
            break;        

         default:

    }

    newCalculation = newCalculation + sel;
    $("#calculation").val(newCalculation);
}

function main_calculator_v1() {
    //console.log("main calculator v1 start ...");

    $("#calculate").on("click");
    $("#calculator_v1 .btn").on("click",setCalculation);
}