<?php
include_once("configs.php");
/**
 * check the whether data is entered by the user 
 */
if (isset($_POST['name']) && isset($_POST['age'])) {
    deleted($_POST['name'],$_POST['age']);
} else {
    echo "empty Data";
}
/**
*   @method : enable to delete the employee information
*   @var Object con : holds the object the connection
*   @var row : fetch the data inform of associated array from database
*   @var query : holds the Query to Fetch the data from DB
*/
function deleted($name,$age)
{
    $con = new Config();
    $con = $con->configs();
    $fetched = mysqli_query($con, "select id from emp where name='$name' and age='$age' ");
    $row = $fetched->fetch_assoc();
    $res=$row['id'];
    $resname = mysqli_query($con, "select name from emp where name='$name' and age='$age'");
    // $resage = mysqli_query($con, "select age from emp where name='$age'");
    if ($name == "" && $age = "") {
        echo "empty data";
    } else if (mysqli_num_rows($resname) > 0) {
        $query = "DELETE FROM emp WHERE id='$res' ";
        mysqli_query($con, $query);
        echo "Deleted record  successfully";
    } else {
        echo "Record not Exist ";
    }
}
?>