<?php
  include '../config.php';

  $database = "breakfast";
  $tablename = "order_list";
?>
<?php
  $order_id = $_POST["OrderId"];

  $connect = mysqli_connect( $localhost , $username , $password , $database );

  if ( !$connect ) {
    /* die("Connection failed: " . $connect->connect_error; */
    die("Connection failed: " . mysqli_connect_error($connect));
  }

  mysqli_query( $connect , "SET NAMES 'UTF8'" );

  $output = array();
  $sql = "SELECT * FROM `$database`.`list_total` WHERE `order_id`='$order_id'";
  $result = mysqli_query( $connect , $sql );
  $output["order_total"] = mysqli_fetch_assoc($result);
  
  $sql = "SELECT * FROM `$database`.`item_list` WHERE `order_id`='$order_id'";
  $result = mysqli_query( $connect , $sql );
  $order_list = array();
  if ( mysqli_num_rows($result) > 0 ) {
    while( $row = mysqli_fetch_assoc($result) ) {
      $order_list[] = $row;
    }
    $output["order_list"] = $order_list;
    echo json_encode($output);
  } else {
    echo "{}";
  }

  mysqli_close($connect);
?>