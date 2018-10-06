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
    public function __construct(){
        $this->profile=new Message();
    }
    /**
     * @method creates the user profile
     * @return void
     */
    public function createUser(){
        // $newObj =new Message();
        // $newObj->msg("User is created\n"); IOC
        $this->profile->msg("User is Created\n");
    }
      /**
     * @method Updates the user profile
     * @return void
     */
    public function updateUser(){
        // $newObj =new Message();
        // $newObj->msg("User is Updated ProfileP\n"); IOC
        $this->profile->msg("User is Updated the Profile\n");
    }
    /**
     * @method Delete the user profile
     * @return void
     */
    public function deleteUser(){
        // $newObj =new Message();
        // $newObj->msg("User is Deleted ProfileP\n"); IOC
        $this->profile->msg("User is Deleted his Profile\n");
    }
}

$profiles=new UserProfile();
$profiles->createUser();
$profiles->updateUser();
$profiles->deleteUser();
?>