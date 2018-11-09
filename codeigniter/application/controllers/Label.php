<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
class Label
{
    public function addLabel()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];
        $label = $_POST['label'];

        /**
         * insert the label into databse based on the emailid
         */
        if ($email != ""){
            $stm = $conn->prepare("INSERT INTO label(email,label) VALUES('$email','$label')");
            $stm->execute();
            $stm = $conn->prepare("select * from label order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
        }


    }

    public function fetchLabel(){
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];

        if ($email != ""){
            $stm = $conn->prepare("select * from label order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
        }
        
    }
}
