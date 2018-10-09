<?php
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
        // $res=$conn->prepare("SELECT email where email='$email'");
        $sqlmail = "select email from users where email='$email'";
        $sqlmobile = "select mobile from users where mobile='$mobile'";
        // return true is value is present else false(query/fetch)
        $qm = $conn->query($sqlmobile)->fetch();
        $qe = $conn->query($sqlmail)->fetch();

        // Create connection
        if ($qm == true || $qe == true) {
            echo "Already EXist\n";
        } else {
            try {
                //echo "Success";
                $conf = new Config();
                $conn = $conf->configs();

                $stm = $conn->prepare("INSERT INTO users(name,email,mobile,password) VALUES('$name','$email','$mobile','$password')");

                $stm->execute(
                    array(
                        ':name' => '$name',
                        ':email' => '$email',
                        ':mobile' => '$mobile',
                        ':password' => '$password')
                );
                $myjson = '{"name":' . '"' . $name . '","email":' . '"' . $email . '","mobile":' . $mobile . "}";
                print $myjson;
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

        $count=$conn->prepare("select email from users where email=:emails");
        $count1=$conn->prepare("select password from users where password=:passwords");
        $count1->bindParam(":passwords",$password);
        $count->bindParam(":emails",$email);
        $count->execute();
        $count1->execute();
        $no1=$count1->rowCount();
        $no=$count->rowCount();

        // Create connection
        if ($no > 0 && $no1 > 0 ) {
            // echo "Registered User\n";
            $myjson = '{"email":' . '"' . $email . '","password":' . $password . "}";
                print $myjson;
                // echo "REG";
        } else {
                
                echo "Not Registred\n";
        }
    }
}
