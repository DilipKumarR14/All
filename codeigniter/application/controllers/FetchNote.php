<?php
header('Access-Control-Allow-Origin: *');
include_once "NoteStoreConfig.php";
/**
 * @description this api is used for storing and fetching the note
 * @method method that fetch the note from database
 */
class FetchNote
{
    public function createNote()
    {
        /**
         * @var title holds the title entered by the user
         * @var note holds the note entered by the user
         */
        if($_POST['email']!=null){

            $email = $_POST['email'];
            $title = $_POST['title'];
            $note = $_POST['note'];
            $date = $_POST['date'];
            $conf = new NoteStoreConfig();
            $conn = $conf->configs();

            /**
             * insert the title and note into databse based on the emailid
             */
            $stm = $conn->prepare("INSERT INTO note(title,note,email,date) VALUES('$title','$note','$email','$date')");
            $stm->execute();
            /**
             * fetch all the values from the  database based on the email
             */            
            $stmt = $conn->prepare("select * from note where email = '$email' order by id desc ");
            $stmt->execute();

            /**
             * return the array of all the field like note,title,email etc
             */
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
        }else{
            /**
             * email not found (content-not found)
             */
            $res = '{"status":"204"}';
            print $res;

        }

    }

    public function fetch(){
        
        /**
         * @var email holds the title entered by the user and stored in cookie while login
         */
        $email = $_POST['email'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();
        /**
         * fetch all the values from the  database based on the email
         */
        $stmt = $conn->prepare("select * from note where email = '$email' order by id desc ");
        $stmt->execute();
        /**
         * return the array of all the field like note,title,email etc
         */
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $res = json_encode($row);
        /**
         * return the result response
         */
        print($res);
    }

}
