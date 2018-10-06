<?php
session_start();
//initialize the variable
$name="";
$address="";
$id=0;
//upadte
$edit_state=false;
//connect to database

$db=mysqli_connect('localhost','root','admin','crud');

//if save button is clicked
if(isset($_POST['save'])){
    $name=$_POST['name'];
    $address=$_POST['address'];

    $query="INSERT INTO info(name,address) VALUES('$name','$address')";
    mysqli_query($db,$query);
    $_SESSION['msg']="Address Saved";
    header('location: index.php');// redirect to index page after inserting
}

//update records
if(isset($_POST['update'])){
    $name = $_POST['name'];
    $address=$_POST['address'];
    $id=$_POST['id'];

    mysqli_query($db,"UPDATE info SET name='$name',address='$address' WHERE id=$id");
    $_SESSION['msg']="Address updated";
    header('location: index.php');// redirecting the user to index.php
}
//delete records
if(isset($_GET['del'])){
    $id=$_GET['del'];
    mysqli_query($db,"DELETE FROM info where id=$id");
    $_SESSION['msg']="Address Deleted";
    header('location:index.php');
}

//retrive records
$result=mysqli_query($db,"SELECT * FROM info");
// print_r($result);
?>