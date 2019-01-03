<?php
  include '../config.php';

  $database = "breakfast";
  $tablename = "order_list";
?>
<?php
  $order_id = $_POST["OrderId"];
  $all_item = $_POST["OrderList"];
  $total = $_POST["Total"];
  
  // $all_item_list = json_encode( $all_item , JSON_UNESCAPED_UNICODE );

  /*
  $aOrder = [
    'order_id' => $_POST["OrderId"],
    'all_item' => $_POST["OrderList"],
    'total' => $_POST["Total"]
  ];
  echo json_encode( $aOrder , JSON_UNESCAPED_UNICODE );
  */

  /* $connect = new mysqli( $localhost , $username , $password , $database ); */
  $connect = mysqli_connect( $localhost , $username , $password , $database );

  /* if ( $connect->connect_error ) */
  if ( !$connect ) {
    /* die("Connection failed: " . $connect->connect_error; */
    die("Connection failed: " . mysqli_connect_error($connect));
  }

  
  /* $connect->query("SET NAMES 'UTF8'"); */
  mysqli_query( $connect , "SET NAMES 'UTF8'" );

  // Other method
  /* $connect->query("SET CHARACTER SET UTF8"); */
  /* mysqli_set_charset( $connect , "utf-8" ); */

  /*
  $sql = "INSERT INTO `$database`.`$tablename` ( `order_id`, `all_item_list`, `total` ) VALUES ( '$order_id', '$all_item_list', '$total' )";
  echo $sql;
  */

  // upload data
  foreach ( $all_item as $key => $item ) {
    $item_no = $item["No"];
    $item_group = $item["BreakfastType"];
    $item_name = $item["ItemName"];
    $unit_price = $item["UnitPrice"];
    $qty = $item["Quantity"];
    $subtotal = $item["Subtotal"];
    
    $sql = "INSERT INTO `$database`.`item_list` ( `order_id`, `item_no`, `item_group`, `item_name`, `unit_price`,`qty`, `subtotal` ) 
                                         VALUES ( '$order_id', '$item_no', '$item_group', '$item_name', '$unit_price','$qty', '$subtotal' )";
    
    /* $result = $connect->query($sql); */
    $result = mysqli_query( $connect , $sql );

    if ( $result === TRUE ) {
      echo "\nShopping Item: " . $item_name . " => success upload to database!\n";
    } else {
      echo "\nShopping Item: " . $item_name . " => failed upload to database!\n";
    }
  }
  $sql = "INSERT INTO `$database`.`list_total` ( `order_id`, `total` ) VALUES ( '$order_id', '$total' )";
  echo $sql . "\n";
  
  /* $result = $connect->query($sql); */
  $result = mysqli_query( $connect , $sql );

  /* $connect->close(); */
  mysqli_close($connect);
?>
<?php
  // table create
  /*
  CREATE TABLE `breakfast`.`order_list` 
  ( `order_id` INT(12) NOT NULL , 
    `all_item_list` VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL , 
    `total` INT NOT NULL , 
    PRIMARY KEY(`order_id`) 
  ) ENGINE = InnoDB
  */
?>