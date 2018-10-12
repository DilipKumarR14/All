<?php
// defined('BASEPATH') or exit('No direct script access allowed');
// if not set we will not get back the response back to front-end(rest calls)
header('Access-Control-Allow-Origin: *');
include_once "Config.php";
class Account
{
    public function register()
    {
        /**
         * @var name holds the name from form
         * @var email holds the email from form
         * @var mobile holds the mobile from form
         * @var password holds the password from form
         */

        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $password = $_POST['password'];
        $conf = new Config();
        $conn = $conf->configs();
        // echo"hey";
        // $res=$conn->prepare("SELECT email where email='$email'");
        $sqlmail = "select email from users where email='$email'";
        $sqlmobile = "select mobile from users where mobile='$mobile'";
        // return true is value is present else false(query/fetch)
        $qm = $conn->query($sqlmobile)->fetch();
        $qe = $conn->query($sqlmail)->fetch();

        // Create connection
        if ($qm == true || $qe == true) {
            // echo "Already EXist\n";
            $res = '{"status":"0"}';
            print $res;
        } else if ($name == "undefined" || $email == "undefined" || $mobile == "" || $password == "undefined") {
            $res = '{"status":"null"}';
            print $res;
        } else {
            try {
                $conf = new Config();
                $conn = $conf->configs();

                $stm = $conn->prepare("INSERT INTO users(name,email,mobile,password) VALUES('$name','$email','$mobile','$password')");

                $stm->execute(
                    array(
                        ':name' => '$name',
                        ':email' => '$email',
                        ':mobile' => '$mobile',
                        ':password' => '$password',
                    )
                );
                $res = '{"status":"1"}';
                print $res;
            } catch (PDOException $e) {
                echo "NOt SAved" . $e->getMessage();
            }
        }
    }
    public function logins()
    {
        /**
         * @var email holds the email from form
         * @var password holds the password from form
         */

        $email = $_POST['email'];
        $password = $_POST['password'];
        $conf = new Config();
        $conn = $conf->configs();
        // $sqlmail = "select email from users where email='$email'";
        // $sqlmobile = "select password from users where password='$password'";
        // return true is value is present else false(query/fetch)
        // $qm = $conn->query($sqlmobile)->fetch();
        // $qe = $conn->query($sqlmail)->fetch();

        try {
            $stmt = $conn->prepare("select * from users where email='$email'");
            // $count1 = $conn->prepare("select id from users where password=:passwords");
            $stmt->execute();
            // $stmt1->bindParam(':passwords', $password);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        $pass = "";
        $mail = "";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $pass = $row['password'];
            $mail = $row['email'];
        }

        if ($pass == $password && $email == $mail) {
            // echo "Registered User\n";
            // $myjson = '{"email":' . '"' . $email . '","password":' . $password . "}";
            $res = '{"status":"1"}';
            // print $myjson;
            print $res;
            // echo "REG";
        } else if ($pass == "" && $mail == "") {
            $res = '{"status":"null"}';
            // print $myjson;
            print $res;
            // echo "Not Registred\n";
        } else if ($pass =! $pass && $mail =! $mail){
            $res = '{"status":"2"}';
            // print $myjson;
            print $res;
        }
        else {
            $res = '{"status":"0"}';
            // print $myjson;
            print $res;
        }
    }
    #main ends
}


?>