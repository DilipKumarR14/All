<?php
class customException extends Exception {
  public function errorMessage() {
    //error message
    $errorMsg = "Error on line ".$this->getLine()." \n in ".$this->getFile()
    ."\n".$this->getMessage()."\n is not a valid E-Mail address\n";
    return $errorMsg;
  }
}

$email = "someoneexample.com";

try {
  //check if
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
    //throw exception if email is not valid
    throw new customException($email);
  }else {
      echo "Valid Email Address\n";
  }
}

catch (customException $e) {
  //display custom message
  echo $e->errorMessage();
}
?>