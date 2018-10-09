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
        $sqlmail="select email from users where email='$email'";
        $sqlmobile="select mobile from users where mobile='$mobile'";
        // return true is value is present else false(query/fetch)
        $qm=$conn->query($sqlmobile)->fetch();
        $qe=$conn->query($sqlmail)->fetch();

        // Create connection
        if($qm == true && $qe == true){
            echo "Already EXist\n";

        }
        else{
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
        // if (mysqli_num_rows($dupli) > 0) {
        //     // $data = array("duplicate\n");
        //     // print (json_encode("Duplicate Entry "));
        //     print("Duplicate Record");

        // } else {
        //     echo "hello world";
        //     $sql = "INSERT INTO users (name, email, mobile, password)
        //     VALUES ('$name','$email','$mobile','$password')";
        //     if ($conn->exec($sql) === true) {
        //         echo "New record created successfully";
        //     } else {
        //         echo "Error: " . $sql . "<br>" . $conn->error;
        //     }
        //     $dupli = mysqli_query($conn, "select mobile,email from users where email='$email' or mobile='$mobile'  ");
        //     $myjson = '{"name":' . '"' . $name . '",".email":' . '"' . $email . '","mobile":' . $mobile . "}";
        //     print $myjson;
        // }
    }
    public function logins()
    {
        /**
         * @var email holds the email from form
         * @var passwd holds the password from form
         */
        $email = $_POST['email'];
        $password = $_POST['password'];
        $conf = new Config();
        $conn = $conf->configs();
        echo "Hello world\n";
        $dupli = mysqli_query($conn, "select password,email from users where email='$email' or mobile='$password'  ");
        if (mysqli_num_rows($dupli) > 0) {

            print("Registered User\n");
            $dupli = mysqli_query($conn, "select mobile,email from users where email='$email' or mobile='$password'  ");
            $myjson = '{"email":' . '"' . $email . '","password":' . '"' . $password . '"}';
            print $myjson;

        } else {
            print("User Is Not Registered\n");
        }
    }
}
