$(document).ready(function() {
  $("#color").load("./client/html/changeColor.html",main_changeColor);
  $("#calculator_v1").load("./client/html/calculator_v1.html",main_calculator_v1);
  $("#order").load("./client/html/order.html",main_order);
  $("#orderList").load("./client/html/orderList.html",main_order_list);
  $("#settings").load("./client/html/settings.html")
});
