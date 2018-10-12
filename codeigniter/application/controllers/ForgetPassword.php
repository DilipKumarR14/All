<?php
header('Access-Control-Allow-Origin: *');
class ForgetPassword
{

    public function forgotPassword()
    {
        header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: OPTIONS, HEAD, GET,POST');
        // header("Access-Control-Allow-Headers", "X-Requested-With");

        require_once "Config.php";
        /**
         * @var email holds the email from form
         * @var password holds the password from form
         */
        $email = $_POST['email'];
        $conf = new Config();
        $conn = $conf->configs();
        try {
            $stmt = $conn->prepare("select * from users where email='$email'");
            $stmt->execute();

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        $mail1 = "";
        $n = "";
        $nm = "";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $mail1 = $row['email'];
            $n = $row['name'];
            $nm = $row['name'];
        }
        if ($email == $mail1) {
            $token = md5($mail1);
            $n = md5($n);
            $stmt = $conn->prepare("UPDATE users SET resetkey = '$token' WHERE email = '$email'");
            $stmt->execute();
            // $res = '{"status":"1"}';
            // print $res;
            if (!class_exists('PHPMailer')) {
                require 'phpmailer/class.phpmailer.php';
                require 'phpmailer/class.smtp.php';
            }
            require_once "mailconfig.php";
            $mail = new PHPMailer();

            $emailBody = "<div>" . $nm . ",<br>
            <p>Click this link to recover your password<br>
            <a href='" . PROJECT_HOME . "?token=" . $token . "'>"
                . PROJECT_HOME .
                "</a><br></p>Regards,<br> Dilip.</div>";

            $mail->IsSMTP();
            $mail->SMTPDebug = 1;
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = "tls";
            $mail->Port = PORT;
            $mail->Username = MAIL_USERNAME;
            $mail->Password = MAIL_PASSWORD;
            $mail->Host = MAIL_HOST;
            $mail->Mailer = MAILER;

            $mail->SetFrom(SENDER_EMAIL, SENDER_NAME);
            $mail->AddReplyTo(SENDER_EMAIL, SENDER_NAME);
            $mail->ReturnPath = SENDER_EMAIL;
            $mail->AddAddress($email);
            $mail->Subject = "Forgot Password Recovery";
            $mail->MsgHTML($emailBody);
            $mail->IsHTML(true);

            if (!$mail->Send()) {
                // $error_message = 'Problem in Sending Password Recovery Email';
                $res = '{"status":"0"}';
                print $res;
            } else {
                // $success_message = 'Please check your email to reset password!';
                $res = '{"status":"1"}';
                print $res;
            }

        } else {
            $res = '{"status":"2"}';
            print $res;
        }
    }

    public function reset()
    {
        header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: OPTIONS, HEAD, GET,POST');
        // header("Access-Control-Allow-Headers", "X-Requested-With");

        require_once "Config.php";
        $rr="";
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $pass1 = $_POST['pass1'];
        $token = $_POST["token"];
        
            $conf = new Config();
            $conn = $conf->configs();
            try {
                $stmt = $conn->prepare("select * from users where resetkey='$token'");
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
                $tok = $row['resetkey'];
            }
            $pass = $_POST['pass'];
            $pass1 = $_POST['pass1'];
            if ($tok != "") {
                if ($tok == $token) {
                    if ($mail1 == $email) {
                        if ($pass == $pass1) {

                            $stmt = $conn->prepare("UPDATE users SET password = '$pass' WHERE email = '$email'");
                            $stmt->execute();

                            $stmt1 = $conn->prepare("UPDATE users SET resetkey = 'null' WHERE email = '$email'");
                            $stmt1->execute();

                            $res = '{"status":"1"}';// success
                            print $res;
                        }
                    } else {
                        $res = '{"status":"2"}';// not a valid email
                        print $res;
                    }
                } else {
                    $res = '{"status":"3"}';// token is invalid
                    print $res;
                }
            } else {
                $res = '{"status":"4"}';// linked expire
                print $res;
            }
    }

#main
}
