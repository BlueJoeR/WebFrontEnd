<?php
  include '../config.php';

  $database = "breakfast";
  $tablename = "order_list";
?>
<?php
  $connect = mysqli_connect( $localhost , $username , $password , $database );

  if ( !$connect ) {
    die("Connection failed: " . mysqli_connect_error($connect));
  }

  mysqli_query( $connect , "SET NAMES 'UTF8'" );

  $sql = "SELECT `order_id` FROM `list_total`";
  $result = mysqli_query( $connect , $sql );

  if ( mysqli_num_rows($result) > 0 ) {
    $output = array();
    while ( $row = mysqli_fetch_assoc($result) ) {
      array_push( $output , $row['order_id'] );
    }
    $json = json_encode($output);
    echo $json;
  } else {
    echo $json;
  }

  mysqli_close($connect);
?>