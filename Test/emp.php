<?php
/**
 * check the whether value is set before calling the Method
 */
include_once("configs.php");
if (isset($_POST['store']) && function_exists($_POST['store'])) {
    emp();    
}
/**
*   @method : enable to emp the employee information
*   @var Object con : holds the object the connection
*   @var row : fetch the data inform of associated array from database
*   @var query : holds the Query to Fetch the data from DB
*/
function emp(){
        
    $con=new Config();
    $con=$con->configs();
    $fname = $_POST['name'];
    $age = (int)$_POST['age'];
    $duplicatename = mysqli_query($con, "select * from emp where name='$fname' and age='$age'");
    // $duplicateage = mysqli_query($con, "select * from emp where age='$age'");
    // integer validation 
    if(!$age>0 && is_string($fname)){
        echo "Invalid Entry";
    }
    else 
    {
    if (is_int((int)$age) && is_string($fname)) {
    if($_POST['name'] == ""|| $_POST['age'] == ""){
        echo "empty data";
    }
    else if (mysqli_num_rows($duplicatename) > 0) { 
        echo "DUPLICATE entry data not saved";
    }
    
    else{
    $query="INSERT INTO emp(name,age) VALUES ('$fname','$age')";
    mysqli_query($con, $query);
    echo "New record created successfully";
    }
}
}
}
?>