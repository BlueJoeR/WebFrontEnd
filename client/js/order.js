function changeOrderId() {
    NowId += 1;

    var num0 = "0";
    var newNowId = "" + NowId;
    var needFixLength = 4 - newNowId.length;
    newNowId = num0.repeat(needFixLength) + newNowId;

    $("#OrderId").val(TodayId+newNowId); 
    $("#TextOrder").text(TodayId+newNowId);
}

function payMoney() {
    if ( No == 1 ) {
        return;
    }

    // Fix OrderList
    function sortOrderList( a , b ) {
        return a.ItemName < b.ItemName ? -1 : 1 ;
    }
    OrderList.sort(sortOrderList)
    
    for ( var i = 0 ; i < OrderList.length ; ++i ) {
        // console.log( OrderList[i] );
        var key = i;
        for ( var j = 0 ; j < i ; ++j ) {
            if ( OrderList[i]["ItemName"] == OrderList[j]["ItemName"] ) {
                key = j;
                break;
            }
        }
        if ( key != i ) {
            // OrderList[key]["Quantity"] = OrderList[key]["Quantity"]*1 + OrderList[i]["Quantity"]*1;
            // OrderList[key]["Subtotal"] = OrderList[key]["Subtotal"]*1 + OrderList[i]["Subtotal"]*1;
            OrderList[key]["Quantity"] += OrderList[i]["Quantity"];
            OrderList[key]["Subtotal"] += OrderList[i]["Subtotal"];
            OrderList.splice(i,1);
            --i;
            continue;
        }
        
        OrderList[i]["No"] = ( OrderList[i]["No"] != i+1 ? i+1 : OrderList[i]["No"] );
    }
    // console.log(OrderList);
    
    $.ajax({
        url: "./server/php/breakfast/uploadList.php",
        type: "post",
        data: {
            OrderId : $("#OrderId").val()*1,
            OrderList,
            Total: parseInt( $("#Total").text() , 10)
        },
        success : function(data) {
            // console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
    
    changeOrderId();
    clearOrderList();
}

function changeTotal( Subtotal ) {
    if ( Subtotal == 0 ) {
        $("#Total").text(Subtotal);
    } else {
        var newTotal = parseInt( $("#Total").text() , 10);
        newTotal += Subtotal;
        $("#Total").text(newTotal);
    }
    
}

function addToOrderList() {
    BreakfastType = $("input[name='BreakfastType']:checked").val();
    ItemName = BreakfastOption[BreakfastType][ $("#BF_Item option:selected").index() ];
    UnitPrice = $("#UnitPrice").val()*1;
    Quantity = $("#Quantity").val()*1;
    Subtotal = $("#Subtotal").val()*1;
    if ( Subtotal == "0" ) {
        return;
    }

    var object = {
        No,
        BreakfastType,
        ItemName,
        UnitPrice,
        Quantity,
        Subtotal
    };
    OrderList.push(object);
    //var output = "<tr><th>" + No + "</th><td>" + ItemName + "</td><td>" + UnitPrice + "</td><td>" + Quantity + "</td><td>" + Subtotal + "</td><td>" + "</td></td>"; 
    // ES6 Templeate
    var output = `
        <tr id="data_${No}">
            <th id="index_${No}">${No}</th>
            <!-- <td>${ItemName.substring(4)}</td> -->
            <td>${ItemName}</td>
            <td>${UnitPrice}</td>
            <td>${Quantity}</td>
            <td>${Subtotal}</td>
            <td>
                <button type="button" id="UnitDelete_${No}" class="btn btn-danger">
                    <i class="fas fa-minus"></i>
                </button>
            </td>
        </tr>
    `;
    $("#OrderList").append(output);
    
    var btnId = "#UnitDelete_" + No;
    $(btnId).on("click",unitDelete);
    
    No += 1;
    changeTotal( parseInt(Subtotal,10) );
    // console.log(object);
}

function clearOrderList() {
    for ( var i in OrderList ) {
        var target = "#UnitDelete_" + (i*1+1);
        $(target).off("click",unitDelete);
    }
    //$("#OrderList tr").remove();
    $("#OrderList").empty();
    OrderList.length = 0;
    No = 1;
    changeTotal(0);
}

function unitDelete() {
    // console.log(this.id);
    var nowId = parseInt(this.id.split("_")[1]);
    
    var btnId = "#" + this.id;
    $(btnId).off("click",unitDelete);
    
    var dataId = "#data_" + nowId;
    $(dataId).remove();
    
    var indexId = "";
    for ( var i = nowId+1 ; i < No ; ++i ) {
        dataId = "#data_" + i;
        indexId = "#index_" + i;
        btnId = "#UnitDelete_" + i;

        $(btnId).off("click",unitDelete);
        $(indexId).text(i-1);

        newDataId = "data_" + (i-1);
        newIndexId = "index_" + (i-1);
        newBtnId = "UnitDelete_" + (i-1);
        
        $(dataId).attr("id",newDataId);
        $(indexId).attr("id",newIndexId);
        $(btnId).attr("id",newBtnId);

        OrderList[i-1]["No"] = i-1;
        
        newBtnId = "#" + newBtnId;
        $(newBtnId).on("click",unitDelete);
    }
    nowId = nowId - 1;
    changeTotal( OrderList[nowId]["UnitPrice"]*(-1) );
    OrderList.splice(nowId,1);
    // console.log(OrderList);
    
    No = No - 1;
}

function changeTodayId() {
    var d = new Date();
    var newOrderId = "" + d.getFullYear(); // year
    newOrderId += ( d.getMonth() < 9 ? "0" : "") + (d.getMonth() + 1); // 0~11
    newOrderId += ( d.getDate() < 10 ? "0" : "") + d.getDate(); // 1~31
    TodayId = newOrderId;

    var tomorrow = new Date();
    tomorrow.setDate(d.getDate()+1);
    var nextOrderId = "" + tomorrow.getFullYear();
    nextOrderId += ( tomorrow.getMonth() < 9 ? "0" : "") + (tomorrow.getMonth() + 1);
    nextOrderId += ( tomorrow.getDate() < 10 ? "0" : "") + tomorrow.getDate();
    $.ajax({
        url: "./server/php/breakfast/firstOrderId.php",
        type: "post",
        data: {
            FirstOrderId : newOrderId+"0000",
            SecondOrderId : nextOrderId+"0000" 
        },
        success : function(data) {
            // console.log(data);
            NowId = data.substring(8)*1;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    }).done(changeOrderId);
}

function changeSubtoal() {
    UnitPrice = $("#UnitPrice").val();
    Quantity = $("#Quantity").val();
    Subtotal = UnitPrice*Quantity;
    if ( isNaN(Subtotal) ) {
        Subtotal = 0;
        $("#Quantity").val("");
    }
    $("#Subtotal").val(Subtotal);
}

function showStatus() {
    BreakfastType = $("input[name='BreakfastType']:checked").val();
    $("#UnitPrice").val(Price[BreakfastType][ $("#BF_Item option:selected").index() ]);
    changeSubtoal();
}

function changeBreakfastType() {
    var BreakfastType = ( typeof(this.value)=="string" ? this.value : "0" );
    $("#BF_Item option").remove(); // clear Breakfast Selection option

    for ( var i in BreakfastOption[BreakfastType] ) {
        var newOption = new Option( BreakfastOption[BreakfastType][i] , Price[BreakfastType][i] );
        $("#BF_Item").append(newOption);
    }
    Quantity = $("#Quantity").val();
    $("#Quantity").val( (Quantity=="" ? "1" : Quantity) );
    showStatus();
}

function clearItemList() {
    if ( Mode != '1' ) {
        for ( var i in OrderList ) {
            var btnId = "#UnitDelete_" + (i*1+1);
            $(btnId).off("click",unitDelete);
        }
    }
    $("#OrderList").empty();
    changeTotal(0);
}

function showItemList() {
    clearItemList();
    switch( Mode ) {
        case 0:
            // Search
            SearchId = OrderListId[$("#OrderListId option:selected").val()];
            // getOrderItemList();
            $.ajax({
                url: "./server/php/breakfast/getOrderItemList.php",
                type: "POST",
                data: {
                    OrderId: SearchId
                },
                success: function(response) {
                    console.log(response);
                    ressult = JSON.parse(response);
                    OrderListItem = ressult.order_list;
                    console.log(OrderListItem);
                    changeTotal(ressult.order_total.total*1);
                }
            }).done(function(){
            console.log(OrderListItem);
            for ( var i in OrderListItem ) {
                console.log(OrderListItem[i]);
                var output = `
                    <tr>
                        <th>${OrderListItem[i].item_no}</th>
                        <td>${OrderListItem[i].item_name}</td>
                        <td>${OrderListItem[i].unit_price}</td>
                        <td>${OrderListItem[i].qty}</td>
                        <td>${OrderListItem[i].subtotal}</td>
                        <td></td>
                    </tr>
                `;
                $("#OrderList").append(output);
            }
        });
            break;
        case 1:
            // Order
            for ( var i in OrderList ) {
                var thisNo = i*1 + 1;
                var output = `
                    <tr id="data_${thisNo}">
                        <th id="index_${thisNo}">${thisNo}</th>
                        <td>${OrderList[i].ItemName}</td>
                        <td>${OrderList[i].UnitPrice}</td>
                        <td>${OrderList[i].Quantity}</td>
                        <td>${OrderList[i].Subtotal}</td>
                        <td>
                            <button type="button" id="UnitDelete_${thisNo}" class="btn btn-danger">
                                <i class="fas fa-minus"></i>
                            </button>
                        </td>
                    </tr>
                `;
                $("#OrderList").append(output);
                
                var btnId = "#UnitDelete_" + thisNo;
                $(btnId).on("click",unitDelete);
                
                changeTotal( parseInt(Subtotal,10) );
            }
            break;
    }
}

// function getOrderItemList() {
//     $.ajax({
//         url: "./server/php/breakfast/getOrderItemList.php",
//         type: "POST",
//         data: {
//             OrderId: SearchId
//         },
//         success: function(response) {
//             console.log(response);
//             ressult = JSON.parse(response);
//             OrderListItem = ressult.order_list;
//             console.log(OrderListItem);
//             changeTotal(ressult.order_total.total*1);
//         }
//     });
// }

function setSelectId() {
    $("#OrderListId option").remove();
    for ( var i in OrderListId ) {
        var newOption = new Option(OrderListId[i],i,(i==0),(i==0));
        $("#OrderListId").append(newOption);
    }
}

function getSelectId() {
    $.ajax({
        url: "./server/php/breakfast/orderId.php",
        type: "POST",
        success: function( response ) {
            // console.log(JSON.parse(response));
            OrderListId = JSON.parse(response);
        }
    });
}

function changeMode() {
    Mode = ($("#ChangeMode").val()*1 + 1) % 2

    if ( OrderListId.length == 0 ) {
        getSelectId();
    }
    switch(Mode) {
        case 0:
            // Search
            $("#OrderId").hide();
            $("#OrderSystem").hide();
            $("#OrderListId").show();
            setSelectId();
            break;
        case 1:
            // Order
            $("#OrderId").show();
            $("#OrderSystem").show();
            $("#OrderListId").hide();
            break;
    }
    
    $("#ChangeMode").val(Mode);
    showItemList();
}

function main_order() {
    //console.log("main order start ...");
    /** Mode **/
    $("#OrderListId").on("change",showItemList);
    $("#ChangeMode").on("click",changeMode);

    /** Breakfast Type **/ 
    $("#BF_chinese").on("click",changeBreakfastType) // 中式
    $("#BF_british").on("click",changeBreakfastType) // 英式
    $("#BF_french ").on("click",changeBreakfastType) // 法式

    /** Breakfast Item **/ 
    $("#BF_Item").on("change",showStatus);
    $("#Quantity").on("change",changeSubtoal);

    /** Function Button **/
    $("#AddToList").on("click",addToOrderList);
    $("#ClearList").on("click",clearOrderList);
    $("#PayMoney").on("click",payMoney); 
    // $(".table #OrderList tr:last td:last .btn .btn-danger").on("click",showItemList);

    changeMode();
    changeBreakfastType();
    changeTodayId();
}

var BreakfastOption,Price;
BreakfastOption = [ ['00->燒餅','01->油條','02->豆漿'],
                    ['10->漢堡','11->薯條','12->可樂','13->奶茶'],
                    ['20->馬鈴薯泥','21->玉米濃湯','22->起司培根','23->奶昔']
                  ];
Price = [ [10,15,12],
          [20,25,15,25],
          [50,35,25,15]
        ];

/** Order system **/
var OrderList = [];
var TotalPrice = 0;
var No = 1;

/** Search system **/
var OrderListId = [];
var OrderListItem = [];
var SearchId = "";

var Mode = 0;
var TodayId = "";
var NowId = 0;