<?php
$res=2;
if($res>=1){
    // die("value is >1\n");
    trigger_error("value should be less tha 1\n",E_USER_ERROR);
    echo "\n";
}

?>