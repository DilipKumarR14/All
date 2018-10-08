<?php
// if not set we will not get back the response back to front-end(rest calls)
header('Access-Control-Allow-Origin: *');
include_once("Config.php");
class Account
{
    public function register()
    {
        /**
         * @var name holds the name from form
         * @var email holds the email from form
         * @var mobile holds the mobile from form
         * @var passwd holds the password from form
         */
        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $password = $_POST['password'];

        // Create connection
        $flag=1;
        $conf= new Config();
        $conn=$conf->configs();
        $dupli=mysqli_query($conn,"select mobile,email from users where email='$email' or mobile='$mobile'  ");
        if(mysqli_num_rows($dupli) > 0){
            // $data = array("duplicate\n");
            // print (json_encode("Duplicate Entry "));
            print ("Duplicate Record");
            
          }else {
           
            $sql = "INSERT INTO users (name, email, mobile, password)
            VALUES ('$name','$email','$mobile','$password')";
            if ($conn->query($sql) === true) {
                //echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $dupli=mysqli_query($conn,"select mobile,email from users where email='$email' or mobile='$mobile'  ");
            $myjson='{"name":'.'"'.$name.'",".email":'.'"'.$email.'","mobile":'.$mobile."}"; 
            print $myjson;
        }
    }
}
