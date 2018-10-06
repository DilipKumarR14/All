<?php
$res=readline("enter the value < 1 : ");
if($res>=1){
    // die("value is >1\n");
    throw new Exception("value should be less tha 1\n",E_USER_ERROR);
    echo "\n";
}

?>