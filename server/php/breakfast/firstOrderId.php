<?php
  include '../config.php';

  $database = "breakfast";
  $tablename = "order_list";
?>
<?php
  $first_order_id = $_POST["FirstOrderId"];
  $second_order_id = $_POST["SecondOrderId"];
  
  $connect = mysqli_connect( $localhost , $username , $password , $database );

  if ( !$connect ) {
    die("Connection failed: " . mysqli_connect_error($connect));
  }

  mysqli_query( $connect , "SET NAMES 'UTF8'" );

  $sql = "SELECT `order_id` FROM `list_total` WHERE `order_id` > '$first_order_id' && `order_id` < '$second_order_id' ORDER BY `order_id` DESC LIMIT 1";
  $result = mysqli_query( $connect , $sql );

  if ( $result ) {
    $row = mysqli_fetch_array($result);
    echo $row['order_id'];
  } else {
    echo $first_order_id;
  }

  mysqli_close($connect);
?>