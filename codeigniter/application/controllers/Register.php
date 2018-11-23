<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

//Load Composer's autoloader
require 'vendor/autoload.php';
require 'PHPMailerAutoload.php';

class Register
{
    public function hello()
    {
        $mail = new PHPMailer(); // create a new object
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->Mailer = "smtp";
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
        $mail->Host = "ssl://smtp.gmail.com:587";
        $mail->Port = 465; // or 587
        $mail->SMTPAuth = true;
        $mail->IsHTML(true);
        $mail->Username = "dilipkumar14inc@gmail.com";
        $mail->Password = "DILLIPKUMAR@GMAIL.COM";

        $mail->From = "dilipkumar14inc@gmail.com";
        $mail->FromName = "dilip";

        $mail->AddAddress("dilipkumar14inc@gmail.com");
        $mail->addReplyTo("dilipkumar14inc@gmail.com");

        $mail->SetFrom("dilipkumar14inc@gmail.com");
        $mail->Subject = "Test";
        $mail->Body = "hello";

        if (!$mail->Send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
            echo "\nMail NOt SEnt\n";
        } else {
            echo "Message has been sent";
        }
        echo "\n";
    }
}
$r = new Register();
$r->hello();
