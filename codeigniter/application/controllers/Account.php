<?php
defined('BASEPATH') or exit('No direct script access allowed');
// if not set we will not get back the response back to front-end(rest calls)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Expose-Headers: Authorization');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');

include_once "Config.php";
include_once "Implement.php";
/**
 * @description Account API which is used for register and login
 */
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
                // require_once("EmailValidation.php");
                $stm->execute(
                    array(
                        ':name' => '$name',
                        ':email' => '$email',
                        ':mobile' => '$mobile',
                        ':password' => '$password',
                    )
                );

                $stm = $conn->prepare("select * from users");
                $stm->execute();
                $mail1 = "";
                $n = "";
                $nm = "";
                while ($row = $stm->fetch(PDO::FETCH_ASSOC)) {
                    $id = $row['id'];
                    $mail1 = $row['email'];
                    $nm = $row['name'];
                }
                $token = md5($mail1);
                $mail1 = "";
                $n = "";
                $nm = "";
                // to update the emailval column in db for validation purpose
                $stmt = $conn->prepare("UPDATE users SET emailval = '$token' WHERE email = '$email'");
                $stmt->execute();

                if (!class_exists('PHPMailer')) {
                    require 'phpmailer/class.phpmailer.php';
                    require 'phpmailer/class.smtp.php';
                }
                require_once "mailconfig.php";
                $mail = new PHPMailer();

                $emailBody = "<div>" . $nm . ",<br>
                    <p>Click this link to recover your password<br>
                    <a href='" . PROJECT_VALIDATE . "?token=" . $token . "'>"
                    . PROJECT_VALIDATE .
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
                $mail->Subject = "Verification of Email";
                $mail->MsgHTML($emailBody);
                $mail->IsHTML(true);

                $stmt = $conn->prepare("select * from users where email='$email'");
                $stmt->execute();

                if (!$mail->Send()) {
                    // 'Problem in Sending Password Recovery Email';
                    $res = '{"status":"2"}'; // error in sending email
                    print $res;
                } else {
                    // 'Please check your email to reset password!';
                    $res = '{"status":"1"}'; //successs
                    print $res;
                }

            } catch (PDOException $e) {
                echo "NOt SAved" . $e->getMessage();
            }
        }
    }


/**
 * for the token to be stored generated
 */

    public static  function  createJwtToken($email)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'sha256']);
        $payload = json_encode(['user_id' => $email]);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        return $jwt;
    }

    /**
     * to verfity the token
     */
    public function verify($jwt): bool
    {
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);

        $dataEncoded = "$headerEncoded.$payloadEncoded";

        $signature = Account::base64UrlDecode($signatureEncoded);

        $rawSignature = hash_hmac('sha256', $dataEncoded, 'abC123!', true);

        return hash_equals($rawSignature, $signature);
    }
    /**
     * convert to base64 encode
     */
    public static function base64UrlDecode($data): string
    {
        $urlUnsafeData = strtr($data, '-_', '+/');

        $paddedData = str_pad($urlUnsafeData, strlen($data) % 4, '=', STR_PAD_RIGHT);

        return base64_decode($paddedData);
    }



    public function logins()
    {
        /**
         * @var email holds the email from form
         * @var password holds the password from form
         */

        $objOfJwt = new ImplementedJwt();
        header('Content-Type:application/json');

        $email = $_POST['email'];
        $password = $_POST['password'];

        //tokens

        $tokenData['email'] = $email;

        $jwtToken = Account::createJwtToken($email);

        $conf = new Config();
        $conn = $conf->configs();

        try {
            $stmt = $conn->prepare("select * from users where email='$email'");
            $stmt->execute();

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        $pass = "";
        $mail = "";
        $validation = "";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $pass = $row['password'];
            $mail = $row['email'];
            $emailval = $row['emailval'];
        }
        if ($emailval == "Validated") {
            if ($pass == $password && $email == $mail) {
                // Registered User;
                // $res = '{"status":"1"}';

                $res = json_encode(array(
                    "status" => "200",
                    "token" => "$jwtToken",
                ));

                print $res;

            } else if ($pass == "" && $mail == "") {
                $res = '{"status":"null"}';
                // print $myjson;
                print $res;
                // echo "Not Registred\n";
            } else if ($pass = !$pass && $mail = !$mail) {
                $res = '{"status":"403"}';
                // print $myjson;
                print $res;
            } else {
                $res = '{"status":"404"}'; //page not found error
                // print $myjson;
                print $res;
            }
        } else {
            $res = '{"status":"401"}';
            // print $myjson;
            print $res;
        }

    }

    #main ends
}
