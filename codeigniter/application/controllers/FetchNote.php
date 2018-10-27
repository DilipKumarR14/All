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
            $email = $_POST['email'];
            $title = $_POST['title'];
            $note = $_POST['note'];
            $time = $_POST['time'];
            $date = $_POST['date'];
            $conf = new NoteStoreConfig();
            $conn = $conf->configs();

            $stm = $conn->prepare("INSERT INTO note(title,note,email,date,time) VALUES('$title','$note','$email','$date','$time')");
            $stm->execute();

            $stmt = $conn->prepare("select * from note where email = '$email' order by id desc ");
            $stmt->execute();

            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
    


            print($res);

    }

    public function fetch(){
        /**
         * @var email holds the title entered by the user and stored in cookie while login
         */
        $email = $_POST['email'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();
        
        $stmt = $conn->prepare("select * from note where email = '$email' order by id desc ");
        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $res = json_encode($row);

        print($res);
    }

}
