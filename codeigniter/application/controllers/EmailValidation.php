<?php
header('Access-Control-Allow-Origin: *');
/**
 * @description this api used for emailvalidation purpose
 */
class EmailValidation
{
    /**
     * @method used for validating the email after registeration of the form
     */

    public function emailValid()
    {
        // header('Access-Control-Allow-Origin: *');

        require_once "Config.php";

        $email = $_POST['email'];
        $token = $_POST["token"];
        // echo $token;

        $conf = new Config();
        $conn = $conf->configs();
        try {
            $stmt = $conn->prepare("select * from users where emailval='$token'");
            $stmt->execute();

        } catch (PDOException $e) {
            // echo $e->getMessage();
        }
        $mail1 = "";
        $pass = "";
        $tok = "";
        $id = "";
        $val = "";
        $stmt = $conn->prepare("select * from users where email = '$email' ");
            $stmt->execute();// already validated
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $mail1 = $row['email'];
            $tok = $row['emailval'];
        }

        if ($tok != "Validated") {// tok is validated
            if ($id != "") {
                if ($tok == $token) {
                    if ($mail1 == $email) {

                        $stmt = $conn->prepare("UPDATE users SET emailval = 'Validated' WHERE email = '$email'");
                        $stmt->execute();
                        $res = '{"status":"200"}'; // validated successfully
                        print $res;
                    } else {
                        $res = '{"status":"498"}'; // token expired
                        print $res;
                    }
                }
            } else {
                $res = '{"status":"204"}'; // email id not found
                print $res;
            }
        } else {
            $res = '{"status":"304"}'; // already validated
            print $res;
        }

    }

#main
}
