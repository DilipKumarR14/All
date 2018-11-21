<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";

class Trash{
    public function deleteRecover(){
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];
        if($id!=""){
            $stm = $conn->prepare("update note set isDelete = 'false' where id = '$id' ");
            $stm->execute();
            $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
            
        }
    }

    public function delete(){
        $email = $_POST['email'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
        $stm->execute();

        $row = $stm->fetchAll(PDO::FETCH_ASSOC);
        
        $jsondata = json_encode($row);
        print($jsondata);
    }

    public function deleteForver(){
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];

        $stm = $conn->prepare("delete from note where id = '$id' ");
        $stm->execute();

        $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
        $stm->execute();

        $row = $stm->fetchAll(PDO::FETCH_ASSOC);
        
        $jsondata = json_encode($row);
        print($jsondata);

    }
}



?>