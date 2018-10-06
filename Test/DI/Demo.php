<?php
/**
 * @description : Demo for the Dependecy Injection
 */
class Message{
     public function msg($message){
        echo $message;
    }
}
/**
 * @description : Creates/Updates/Deletes User Profiles
 */
class UserProfile{
    private $profile;
    public function __construct($login){
        $this->profile=$login;
    }
    /**
     * @method creates the user profile
     * @return void
     */
    public function createUser(){
        $this->profile->msg("User is Created\n");
    }
    /**
     * @method Updates the user profile
     * @return void
     */
    public function updateUser(){
        $this->profile->msg("User is Updated the Profile\n");
    }
    /**
     * @method Delete the user profile
     * @return void
     */
    public function deleteUser(){
        $this->profile->msg("User is Deleted his Profile\n");
    }
}
/**
 * @var logged Holds the Object of Message Class
 */
$logged=new Message();
/**
 * @var profiles Holds the OBject of UserProfile
 * @param logged Object of Message Class Dependency Is Injected
 */
$profiles=new UserProfile($logged);

$profiles->createUser();
$profiles->updateUser();
$profiles->deleteUser();

?>