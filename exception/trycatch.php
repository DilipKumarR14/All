<?php
function check($num){
    if($num >= 1){
        throw new Exception("number should be less than 1\n", 1);
    }else {
        echo "ok\n";
    }
}
try{
    $num=readline("enter the no less tha 1 : ");
    check($num);
}
catch(Exception $e){
echo "Message : ".$e->getMessage();
}
?>