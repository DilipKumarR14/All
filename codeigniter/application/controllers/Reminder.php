<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @desc card having the reminder will be displayed
 * @var email to store the email
 */
 class Reminder{
     public function reminderNotes(){
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];
        if($email!=""){
            $stm = $conn->prepare("select * from note where isDelete = 'false' and isArchive='false' and date!='' order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
            
        }         
     }
 }



?>