<?php

$db=mysqli_connect('localhost','root','admin','emp');
function insert(){
    if(isset($_POST['save'])){
        $name=$_POST['usrnames'];
        $age=$_POST['ages'];
        $query = "INSERT INTO emp.emps(name,age),VALUES($name,$age);";
        if(mysqli_query($db,$query)){

        echo "Address added\n";
        }else {
            echo "Not added\n";
        }
        header('location: index.php');
    }
}

?>