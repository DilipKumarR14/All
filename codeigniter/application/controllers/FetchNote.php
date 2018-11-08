<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

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

        $headers = apache_request_headers();

        $jwt = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt); // bearer
        require "Account.php";

        $validate = new Account();
        if ($validate->verify($jwttoken[1])) {
            if ($_POST['email'] != null) {

                $email = $_POST['email'];
                $title = $_POST['title'];
                $note = $_POST['note'];
                $date = $_POST['date'];
                $color = $_POST['color'];

                $conf = new NoteStoreConfig();
                $conn = $conf->configs();

                /**
                 * insert the title and note into databse based on the emailid
                 */
                $stm = $conn->prepare("INSERT INTO note(title,note,email,date,colorcode) VALUES('$title','$note','$email','$date','$color')");
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
            } else {
                /**
                 * email not found (content-not found)
                 */
                $res = '{"status":"204"}';
                print $res;
            }
        } else {
            $res = json_encode(array(
                "status" => "404",
            ));
            print $res;
        }

    }

    public function fetch()
    {
        $res = apache_request_headers();

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
   
    public function editReminderCard()
    {

        $idcard = $_POST['idcard'];
        $timecard = $_POST['date'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $res = $timecard;

        $stmt = $conn->prepare("UPDATE note SET date = '$timecard' where id = '$idcard' ");
        $stmt->execute();

    }

    public function deleteReminderCard()
    {

        $idcard = $_POST['idcard'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE note SET date = '' where id = '$idcard' ");
        $stmt->execute();

    }


    public function popCardEditReminder(){
        $idcard = $_POST['id'];
        $timecard = $_POST['dateandtime'];
        $email = $_POST['email'];
        $title = $_POST['title'];
        $note = $_POST['note'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE note SET date = '$timecard',note = '$note',title = '$title' where id = '$idcard' ");
        $stmt->execute();
      
    }


}
