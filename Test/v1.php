<?php
if(isset($_GET)){
call();
}
/**
 * @method establish the connection fetch the data inform of associated array, result in json format from DB
 * @var conn Establish the Connection 
 * @var result query the db for result
 * @var row holds the empty array
 */
function call(){
$conn=new mysqli("localhost","root","admin","emp");
$result=$conn->query("select * from emp");
$row=array();
while ($r=mysqli_fetch_assoc($result)) {
    $row[]=$r;
}
if(empty($row)){
    $result=array('status'=>'error','data'=>$row);
}else {
    $result=array('status'=>'success','data'=>$row);
}
echo json_encode($result);
}
?>