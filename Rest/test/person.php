<?php

class Person
{
/**
* @var string
* @required
* @length(50)
* @text('label' => 'Full Name')
*/
public $name;
/**
* @var string
* @length(50)
* @text('label' => 'Street Address')
*/
public $address;
/**
* @var int
* @range(0, 100)
*/
public $age;
}

abstract class Widget
{
protected $object;
protected $property;
public $value;
public $errors = array();
public function __construct($object, $property)
{
$this->object = $object;
$this->property = $property;
$this->value = $object->$property;
}
public function addError($message)
{
$this->errors[] = $message;
}
protected function getMetadata($type, $name, $default = null)
{
$a = Annotations::ofProperty($this->object, $this->property, $type);
if (!count($a)) {
return $default;
}
return $a[0]->$name;
}
abstract public function update($input);
public function validate()
{
if (empty($this->value)) {
if ($this->isRequired()) {
$this->addError("Please complete this field");
} else {
return;
}
}
if (is_string($this->value)) {
$min = $this->getMetadata('@length', 'min');
$max = $this->getMetadata('@length', 'max');
if ($min !== null && strlen($this->value) < $min) {
$this->addError("Minimum length is {$min} characters");
} else {
if ($max !== null && strlen($this->value) > $max) {
$this->addError("Maximum length is {$max} characters");
}
}
}
if (is_int($this->value)) {
$min = $this->getMetadata('@range', 'min');
$max = $this->getMetadata('@range', 'max');
if (($min !== null && $this->value < $min) || ($max !== null && $this->
value > $max)) {
    $this->addError("Please enter a value in the range {$min} to {$max}");
}
}
}
abstract public function display();
public function getLabel()
{
return $this->getMetadata('@text', 'label', ucfirst($this->property));
}
public function isRequired()
{
return count(Annotations::ofProperty($this->object, $this->property,
˓ → '@required')) > 0;
}
}


?>