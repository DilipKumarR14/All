<?php

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
        $passwd = $_POST['passwd'];

             // Create connection
        $conn = mysqli_connect("localhost", "root","admin", "account");
        $duplicate = mysqli_query($conn, "select * from users where name='$name' and email='$email' and mobile='$mobile");
        echo "hello";
            // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            if(mysqli_num_rows($duplicate) > 0){
                echo "User Exist<br>";
            }
            else{
            echo "Connected successfully<br>";
            $sql = "INSERT INTO users (name, email, mobile, password)
            VALUES ('$name','$email','$mobile','$passwd')";
            if ($conn->query($sql) === true) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }

        }
    }
}
