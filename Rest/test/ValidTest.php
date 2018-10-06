<?php
class ValidationTest extends PHPUnit_Framework_TestCase{
    function testInt(){
        $validator=new Ints();
        $this->assertTrue($validator->isValid(2));
    }
}