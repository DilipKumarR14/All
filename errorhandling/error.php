<?php
if (!file_exists('file.txt')){
    die("file not found\n");
}
else{
    $file=fopen('file.txt','r');
}

?>