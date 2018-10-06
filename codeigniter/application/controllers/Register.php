<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Register extends CI_Controller
{
    public function Register1()
    {
        $firstname=$_POST['username'];
        $lastname=$_POST['lastname'];
        echo"register from  ".$firstname. "   last ".$lastname;
        echo "from register";
    }


}
