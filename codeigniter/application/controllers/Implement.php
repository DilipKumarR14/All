<?php
require "jwt.php";
class ImplementedJwt
{
    
    
    public function generateToken($data){
        $key = "HelloWorld";
        $jwt = JWT::encode($data,$key);
        return $jwt;
    }

    public function decodeToken($token){
        $decoded = JWT::decode($this->$token,$this->$key,array('HS256'));
        $decodedData = (array)$decoded;
        return $decodedData;
    }
}
?>