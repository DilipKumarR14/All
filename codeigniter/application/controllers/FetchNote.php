<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include_once "NoteStoreConfig.php";
/**
 * @description this api is used for storing and fetching the note
 * @method method that fetch the note from database
 * @return the jsondata data if success / failure response
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
                $arch = $_POST['archive'];
                $label = $_POST['label'];
                $collabrr = $_POST['collab'];
                $owner = $_POST['owner'];

                $conf = new NoteStoreConfig();
                $conn = $conf->configs();

                /**
                 * insert the title and note into databse based on the emailid
                 */
                $stm = $conn->prepare("INSERT INTO note(title,note,email,date,colorcode,isArchive,label) VALUES('$title','$note','$email','$date','$color','$arch','$label')");
                $stm->execute();

                $stm = $conn->prepare("SELECT MAX(id) from note");
                $stm->execute();

                $row = $stm->fetch(PDO::FETCH_ASSOC);

                $id = $row['MAX(id)'];

                $emailres = explode(",", $collabrr);

                for ($i = 0; $i < sizeof($emailres); $i++) {
                    $stm = $conn->prepare("INSERT INTO  collaborators (email ,  noteid ,  owner ) VALUES ('$emailres[$i]','$id','$owner')");
                    $stm->execute();
                }

                /**
                 * fetch all the values from the  database based on the email
                 */
                $stmt = $conn->prepare("select * from note where isArchive = 'false' and isDelete = 'false' and (email = '$email' or id in (select noteid from collaborators where email = '$email' ) ) order by id desc ");
                $stmt->execute();

                /**
                 * return the array of all the field like note,title,email etc
                 */
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $res = json_encode($row);

                $stmt = $conn->prepare("SELECT DISTINCT email,noteid from collaborators");
                $stmt->execute();

                $rowcolla = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $rescollab = json_encode($rowcolla);

                $all = array(
                    "res" => $row,
                    "rescolla" => $rowcolla,
                );

                print json_encode($all);
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
/**
 * @method fetch()
 * to get all the card for the particular email
 * @return all the cards
 */
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

        $stmt = $conn->prepare("select * from note where isArchive = 'false' and isDelete = 'false' and (email = '$email' or id in (select noteid from collaborators where email = '$email' ) ) order by id desc ");
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
    /**
     * @desc for the edit the reminder
     * @var idcard for store the id of the card
     * @var timecard for store the time set on card
     * @return void
     */
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
/**
 * @desc for the delete  the remindeer on the card
 * @return void
 */
    public function deleteReminderCard()
    {

        $idcard = $_POST['idcard'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE note SET date = '' where id = '$idcard' ");
        $stmt->execute();

    }
/**
 * @desc for the popCard edit the reminder
 * @var idcard for the id
 * @var timecard for the timecard
 * @var email for the email
 * @var title for the title
 * @return void
 */

    public function popCardEditReminder()
    {
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
/**
 * @desc for the delete the card and store in trash
 * @var idcard for the id
 *  @return jsondata having all the note
 */
    public function delete()
    {
        $idcard = $_POST['idcard'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE note set isDelete='true' where id = '$idcard' ");
        $stmt->execute();

        // $stmt = $conn->prepare("DELETE from note where id = '$idcard' ");
        // $stmt->execute();

        $stmt = $conn->prepare("SELECT * FROM note where isDelete = 'false' and isArchive = 'false'  ");
        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);

    }
/**
 * @desc for the title and note of the particular id
 * @var idcard for the id
 * @var title for the title
 * @var note for the note
 * @return void
 */
    public function save()
    {
        $idcard = $_POST['id'];
        $note = $_POST['note'];
        $title = $_POST['title'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("UPDATE note SET note = '$note',title = '$title' where id = '$idcard' ");
        $stmt->execute();
    }

}
