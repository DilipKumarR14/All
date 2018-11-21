<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @description api for the archive the notes
 */
class Archived
{
    /**
     * @description to check whether it is archived
     * @var id which store the id of the archive card
     */
    public function isArchive()
    {

        $id = $_POST['id'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE  note  SET isArchive = 'true' where id = '$id' ");

        $stmt->execute();

        $stmt = $conn->prepare("SELECT * FROM note where isArchive = 'false' ");
        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);
    }
    /**
     * @description to check whether it is archived
     * @var id which store the id of the unarchive card
     */
    public function unArchive(){
        $id = $_POST['id'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE  note  SET isArchive = 'false' where id = '$id' ");

        $stmt->execute();

        $stmt = $conn->prepare("SELECT * FROM note where isArchive = 'true' ");
        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);
    }

    public function receiveArchive()
    {
        /**
         * to store the archive the cards into the database
         */

        $headers = apache_request_headers();

        $jwt = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt); // bearer
        require "Account.php";

        $validate = new Account();
        if ($validate->verify($jwttoken[1])) 
        {
            if ($_POST['email'] != null) 
            {

                $email = $_POST['email'];
                $title = $_POST['title'];
                $note = $_POST['note'];
                $date = $_POST['date'];
                $color = $_POST['color'];
                $arch = $_POST['archive'];
                $conf = new NoteStoreConfig();
                $conn = $conf->configs();

                /**
                 * insert the title and note into databse based on the emailid
                 */
                $stm = $conn->prepare("INSERT INTO note(title,note,email,date,colorcode,isArchive) VALUES('$title','$note','$email','$date','$color','$arch')");
                $stm->execute();
                /**
                 * fetch all the values from the  database based on the email
                 */
                $stmt = $conn->prepare("select * from note where email = '$email' and isArchive = 'true' order by id desc ");
                $stmt->execute();

                /**
                 * return the array of all the field like note,title,email etc
                 */
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $res = json_encode($row);

                print($res);
            } else 
            {
                /**
                 * email not found (content-not found)
                 */
                $res = '{"status":"204"}';
                print $res;
            }
        } 
        else 
        {
            $res = json_encode(array(
                "status" => "404",
            ));
            print $res;
        }
    }

    /**
     * @description for the store the archive card 
     */
    public function storearchive(){

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
        $stmt = $conn->prepare("select * from note where email = '$email' and isArchive = 'true' order by id desc ");
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
?>