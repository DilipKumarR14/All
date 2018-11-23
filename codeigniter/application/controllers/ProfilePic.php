<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @desc card having the reminder will be displayed
 */
class ProfilePic
{
    /**
     * @method upload()
     * @var email to store the email
     * @return path of the profile pic
     */
    public function upload()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];

        if ($email != null) {
            $a = $_FILES["fileKey"]["tmp_name"];
            $b = $_FILES["fileKey"]["name"];
            $filecheck = move_uploaded_file($a, "profilepics/" . $b);

            $filePath = 'http://localhost/codeigniter/profilepics/' . $_FILES["fileKey"]["name"];

            $stmt = $conn->prepare("UPDATE users SET profilepic = '$filePath' where email='$email' ");
            $stmt->execute();

            if ($stmt->execute()) {
                $data = array(
                    "path" => $filePath
                );
                print json_encode($data);

            } else {
                $data = array(
                    "status" => "401"
                );
                print json_encode($data);
            }
        }
    }

    /**
     * @method getPic()
     * get the profile pic of particular email
     * @return path of profile pic
     */
    public function getPic()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];

        if ($email != "") {
            $stmt = $conn->prepare("select profilepic from users where email = '$email' ");
            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                print json_encode($row);

            } else {
                $data = array(
                    "status" => "401"
                );
                print json_encode($data);
            }
        }
    }
}
