<?php
header('Access-Control-Allow-Origin: *');
class EmailValidation
{

    public function emailValid()
    {
        header('Access-Control-Allow-Origin: *');

        require_once "Config.php";

        $email = $_POST['email'];
        $token = $_POST["token"];
        echo $token;


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
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $mail1 = $row['email'];
            $tok = $row['emailval'];
        }
            if ($tok == $token) {
                if ($mail1 == $email) {

                        $stmt = $conn->prepare("UPDATE users SET emailval = 'validated' WHERE email = '$email'");
                        $stmt->execute();
                        $res = '{"status":"1"}';
                    print $res;
                } else {
                    $res = '{"status":"0"}';
                print $res;
                }
            } 
    }


#main
}
