function main_order_list() {
    console.log("main order list start ...");
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

var OrderList = [];
var TotalPrice = 0;
var No = 1;

var TodayId = "";
var NowId = 0;