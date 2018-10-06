<?php
include_once("configs.php");
if (isset($_POST['name']) && isset($_POST['age']) && isset($_POST['uname']) && isset($_POST['uage'])) {
    updated($_POST['name'],$_POST['age'],$_POST['uname'],$_POST['uage']);
} else {
    echo "empty Data";
}
/**
 *  @method void updated(string,string,string,string)
 *  @var Object con Holds the Object of Config Class
 *  @var fetched Establish the Connection with DB and return the Result
 *  @var row fetches the result of db in associated array
 */
function updated($name,$age,$uname,$uage)
{
    $con = new Config();
    $con = $con->configs();
    $fetched = mysqli_query($con, "select id from emp where name='$name' and age='$age' ");
    $row = $fetched->fetch_assoc();
    $res=$row['id'];
    $resname = mysqli_query($con, "select name,age from emp where name='$name' and age='$age'");
    // $resage = mysqli_query($con, "select age from emp where name='$age'");
    if ($name == "" && $age == "" && $uname == "" && $uage == "") {
        echo "empty data";
    } else if (mysqli_num_rows($resname) > 0) {
        $query = "UPDATE emp SET name='$uname',age='$uage' WHERE id=$res ";
        mysqli_query($con, $query);
        echo "updated record  successfully";
    } else {
        echo "Record not Exist ";
    }
}
?>