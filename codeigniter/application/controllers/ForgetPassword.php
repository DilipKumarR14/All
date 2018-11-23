<?php
require_once "Config.php";
header('Access-Control-Allow-Origin: *');
class ForgetPassword
{
/**
 * description - an API that receives the request for the forgot password from the user
 *  @var email holds the email from form
 * @var conf Holds the  Object of the PDO Connection
 * @return the success/failure
 */
    public function forgotPassword()
    {
        /**
         * Allow the Acces to any one using this API By using * operator
         * or for specific http://www.example.com
         */
        header('Access-Control-Allow-Origin: *');
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
            //update the resetkey column in the database for the particular email
            $stmt = $conn->prepare("UPDATE users SET resetkey = '$token' WHERE email = '$email'");
            $stmt->execute();

            if (!class_exists('PHPMailer')) {
                require 'phpmailer/class.phpmailer.php';
                require 'phpmailer/class.smtp.php';
            }
            require_once "mailconfig.php";
            $mail = new PHPMailer();

            $emailBody = "<div>" . $nm . ",<br>
            <p>Click this link to recover your password<br>
            <a href='" . PROJECT_HOME . "?token=" . $token . "'>"
                . "Link" .
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
                $res = '{"status":"400"}';
                print $res;
            } else {
                // $success_message = 'Please check your email to reset password!';
                $res = '{"status":"200"}';
                print $res;
            }

        } else {
            $res = '{"status":"204"}';
            print $res;
        }
    }
/**
 * description - an API that receives the request for the reset password from the user
 * by the link send to the user emailid
 * @return the success/failure of password reset
 */
    public function reset()
    {
        header('Access-Control-Allow-Origin: *');

        require_once "Config.php";
        $rr = "";
        // $email = $_POST['email'];
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
                if ($pass == $pass1) {

                    $stmt = $conn->prepare("UPDATE users SET password = '$pass' WHERE resetkey = '$token'");
                    $stmt->execute();

                    $stmt1 = $conn->prepare("UPDATE users SET resetkey = null WHERE resetkey = '$token'");
                    $stmt1->execute();

                    $res = '{"status":"200"}'; // success
                    print $res;
                }

            } else {
                $res = '{"status":"498"}'; // token is invalid
                print $res;
            }
        } else {
            $res = '{"status":"401"}'; // linked expire
            print $res;
        }
    }

    /**
     * @method getEmailId()
     * fetch all the email
     * @return josndata containing the email
     */
    public function getEmailId()
    {
        require_once "Config.php";
        $conf = new Config();
        $conn = $conf->configs();
        $token = $_POST["token"];
        $res = "";

        $stmt = $conn->prepare("SELECT email FROM users where resetkey='$token'");
        $stmt->execute();

        $arr = $stmt->fetch(PDO::FETCH_ASSOC);

        $res = $arr['email'];

        $data = array(
            'key' => $res,
        );
        print json_encode($data);

    }

#main
}
