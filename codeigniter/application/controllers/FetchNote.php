<?php
header('Access-Control-Allow-Origin: *');
include_once "NoteStoreConfig.php";
class FetchNote
{
    public function note()
    {
        $title = $_POST['title'];
        $note = $_POST['note'];
        $email = "dilipkumar14inc@gmail.com";
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stm = $conn->prepare("INSERT INTO note(title,note,email) VALUES('$title','$note','$email')");
        $stm->execute();

        $stmt = $conn->prepare("select * from note where email = '$email' ");
        $stmt->execute();

        $title = "";
        $note = "";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $title = $row['title'];
            $note = $row['note'];
        }

        // $res = "{'title':$title,'note':$note}";
        $res= array(
            "title"=> $title,
            "note"=> $note,
        );
        $res = json_encode($res);
        print $res;
    }
}
