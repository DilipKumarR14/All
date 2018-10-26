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
            $conf = new NoteStoreConfig();
            $conn = $conf->configs();

            $stm = $conn->prepare("INSERT INTO note(title,note,email) VALUES('$title','$note','$email')");
            $stm->execute();

            $stmt = $conn->prepare("select * from note where email = '$email' order by id desc ");
            $stmt->execute();

            $title = "";
            $note = "";
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);

            print($res);

    }
}
