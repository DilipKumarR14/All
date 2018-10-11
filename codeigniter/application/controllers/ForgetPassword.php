<?php
class ForgetPassword
{


    public function forgotPassword()
    {
        require_once("Config.php");
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
        $mail = "";
        $n = "";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $mail = $row['email'];
            $n = $row['name'];
        }
        if ($email == $mail) { 
            $m = md5($mail);
            $n = md5($n);
            $res = '{"status":"1"}';
            print $res;
            if (!class_exists('PHPMailer')) {
                require('phpmailer/class.phpmailer.php');
                require('phpmailer/class.smtp.php');
            }
            require_once("mailconfig.php");
            $mail = new PHPMailer();

            $emailBody = "<div>" . $n .
                ",<br><br><p>
              Click this link to recover your password<br>
              <a href='" . PROJECT_HOME . "?name=" .
                $n . "'>" . PROJECT_HOME .
                "php-forgot-password-recover-code/reset_password.php?name=" .
                $n . "</a><br><br></p>Regards,<br> Dilip.</div>";

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
            $mail->AddAddress($mail);
            $mail->Subject = "Forgot Password Recovery";
            $mail->MsgHTML($emailBody);
            $mail->IsHTML(true);

            if (!$mail->Send()) {
                // $error_message = 'Problem in Sending Password Recovery Email';
                $res = '{"status":"1"}';
                print $res;
            } else {
                // $success_message = 'Please check your email to reset password!';
                $res = '{"status":"0"}';
                print $res;
            }

        } else {
            $res = '{"status":"2"}';
            print $res;
        }
    }

    public function reset()
    {



    }
}
?>