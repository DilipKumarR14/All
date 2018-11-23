<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @desc for the collabed email to added to the card
 */
class Collabortor
{
    /**
     * @method collabortors()
     * @description for adding the email to the card
     */
    public function collabortors()
    {
        /**
         * @var email to store the email
         * @var id for thhe id of the card
         * @var owner fetch the owner of the card
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $owner = $_POST['owner'];
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();
        $stmt = $conn->prepare("SELECT email from users ");

        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $allemail = $row;

        if ($_POST['owner'] != "" && $_POST['email'] != "" && $_POST['id'] != "") {

            $stmt = $conn->prepare("SELECT * from users where email = '$email' ");

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $allemail = $row;

            if ($row['email'] == $email) {
                $stmt = $conn->prepare("INSERT INTO  collaborators (email ,  noteid , owner) VALUES ('$email','$id','$owner') ");

                $stmt->execute();

                $res = json_encode(array(
                    "res" => "200",
                    "allemail" => $allemail,
                ));
                print($res);
            } else {
                return;
            }

        } else {
            return;
        }

    }
    /**
     * @method getOwner()
     * to fetch the owner of the card
     * @return jsondata
     */
    public function getOwner()
    {
        /**
         * @var id for thhe id of the card
         */
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];

        $stmt = $conn->prepare("SELECT owner from collaborators WHERE noteid = '$id' ");

        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);

        print($jsondata);
    }

    /**
     * for the adding the all the collabed email to the card,for the getting all email for adding to collab
     * @return jsondata
     */
    public function getCollabEmail()
    {

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];
        $id = $_POST['id'];
        $owner = $_POST['owner'];
        // for the inavlid email
        $stmt = $conn->prepare(" select distinct email from users");

        $stmt->execute();

        $allemail = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $res = "";
        for ($i = 0; $i < sizeof($allemail); $i++) {
            $qqw = $allemail[$i]['email'];
            if ($email == $qqw && $email != "") {

// for the owner add/delete
                $stmt = $conn->prepare("select owner from collaborators where noteid = '$id' ");

                $r = $stmt->execute();

                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row['owner'] == $owner && $owner != "" && $owner != $email) {

                    if ($_POST['email'] != "" && $_POST['id'] != "" && $_POST['owner']) {

                        $stmt = $conn->prepare("INSERT INTO collaborators(email, noteid, owner) VALUES ('$email','$id','$owner')");

                        $stmt->execute();

                        // $stmt = $conn->prepare("SELECT  email from collaborators ");

                        //  $stmt->execute();

                        $stmt = $conn->prepare("SELECT DISTINCT email,noteid from collaborators");

                        $stmt->execute();

                        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        if ($row != "" && $row != null) {
                            $res = json_encode(array(
                                "status" => "true",
                                "email" => $row,
                            ));
                            break;
                        } else {
                            $res = json_encode(array(
                                "status" => "false",
                            ));
                        }
                        break;

                    }
                }
                // if the email and owner or same
                else if ($row['owner'] == $email) {
                    $res = json_encode(array(
                        "status" => "owner",
                    ));

                    break;
                } else {
// not a owner
                    $res = json_encode(array(
                        "status" => "notaowner",
                    ));

                    break;
                }
            } else {
                $res = json_encode(array(
                    "status" => "invalidemail",
                ));
            }

        }
        print($res);
    }
    /**
     * @method getCollabedEmail()
     * to get all email and display in the card,to display all the collabed mailid
     * @var id that holds the id of the card
     */
    public function getCollabedEmail()
    {

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];

        $stmt = $conn->prepare("SELECT DISTINCT email from collaborators where noteid = '$id' ");

        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row != "" && $row != null) {
            $res = json_encode(array(
                "status" => "true",
                "email" => $row,
            ));
        } else {
            $res = json_encode(array(
                "status" => "false",
            ));
        }

        print($res);

    }
// delete button for collabs
    /**
     * @desc to delete the collabed email to delete from the card
     * @var id to store the id of the card
     * @var email to store the email of the card
     * @var owner tp store the owner of the card
     * @return jsondata containing the email to be returned
     */
    public function deleteCollab()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];
        $email = $_POST['email'];
        $owner = $_POST['owner'];

        $stmt = $conn->prepare("SELECT owner from collaborators where noteid = '$id' ");

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['owner'] == $owner && $owner != "") {

            $stmt = $conn->prepare("DELETE from collaborators where noteid = '$id' and email = '$email' ");

            $stmt->execute();

            // $stmt = $conn->prepare("SELECT DISTINCT email from collaborators where noteid = '$id' ");

            // $stmt->execute();

            $stmt = $conn->prepare("SELECT DISTINCT email,noteid from collaborators");

            $stmt->execute();

            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($row != "" && $row != null) {
                $res = json_encode(array(
                    "status" => "true",
                    "email" => $row,
                ));
            } else {
                $res = json_encode(array(
                    "status" => "false",
                ));
            }

            print($res);
        }
        // myself delete
        else if ($owner == $email && $owner != "") {
            $stmt = $conn->prepare("DELETE from collaborators where noteid = '$id' and email = '$email' ");

            $stmt->execute();

            // $stmt = $conn->prepare("SELECT DISTINCT email from collaborators where noteid = '$id' ");

            // $stmt->execute();

            $stmt = $conn->prepare("SELECT DISTINCT email,noteid from collaborators");

            $stmt->execute();

            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($row != "" && $row != null) {
                $res = json_encode(array(
                    "status" => "deletemyself",
                    "email" => $row,
                ));
            } else {
                $res = json_encode(array(
                    "status" => "false",
                ));
            }

            print($res);
        } else {
            // not a authorised person
            $res = json_encode(array(
                "status" => "nap",
            ));
            print($res);
        }

    }

    /**
     * @method displayForNoteCard()
     * @desc for the display the note card
     * @return jsondata containing the email to be returned
     */
    public function displayForNoteCard()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stmt = $conn->prepare("SELECT DISTINCT email,noteid from collaborators");

        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row != "" && $row != null) {
            $res = json_encode(array(
                "status" => "true",
                "email" => $row,
            ));
        } else {
            $res = json_encode(array(
                "status" => "false",
            ));
        }

        print($res);

    }
/**
 * @desc to get the email of the card
 * @var owner of the card
 * @var email of thhe card
 * @var jsondata containing the email to be returne
 */
    public function getEmail()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $owner = $_POST['owner'];
        $email = $_POST['email'];
        if ($email != "") {
            $stmt = $conn->prepare("SELECT DISTINCT email from users where email!='$owner' ");
            $stmt->execute();
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($row as $key => $value) {
                if ($value['email'] == $email) {
                    $res = json_encode(array(
                        "status" => "false",
                    ));
                    break;
                } else {
                    $res = json_encode(array(
                        "status" => "true",
                    ));
                }
            }

            print($res);
        }

    }

}
