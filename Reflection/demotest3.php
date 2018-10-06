<?php
include "demo3.php";

/**
* School interface information
*/
echo "interafce information\n\n";
$rc4=new ReflectionClass("School");
if($rc4->isInterface())
{
echo $rc4->getName() . " class is an Interface\n";
}
echo "\n\n\n";
/**
* Principle class information
*/
echo "priciple class information\n\n";
$rc1=new ReflectionClass("Principle");
if($rc1->isAbstract())
{
echo $rc1->getName() . " class is Abstract class\n";
}
if($rc1->hasMethod("principle"))
{
echo $rc1->getName() . " class has principle method\n";
}
echo "\n\n\n";
/**
* student class information
*/
echo "Student class information\n\n";
$rc3= new ReflectionClass("Student");
echo $rc3->getName() . " class details \n";
$userrefs=new Student();
echo "class methods\n";
print_r(get_class_methods($userrefs));
echo "class members\n";
print_r($rc3->getProperties());
echo "\n\n\n";
/**
* Student class info using reflection class method
*/
echo "Student class method information\n\n";
$rm1= new ReflectionMethod("Student","schoolname");
if($rm1->isPublic())
{
echo $rm1->getName() . " is a public method\n";
}
if(!$rm1->isStatic())
{
echo $rm1->getName() . " is not a static method\n";
}
$rm1->invoke(new Student());
echo "\n\n\n";
/**
* Student class info using reflection property 
*/
echo "Student class data memeber information\n\n";
$rp1= new ReflectionProperty("Student","marks");
echo $rp1->getName() . "\n";
if($rp1->isPublic())
{
echo $rp1->getName() . " is a Public data member\n";
}
print_r($rp1->getValue(new Student()));
echo "\n\n\n";
/**
* Student class info using reflection parameter 
*/
echo "Stduent class method parameter information\n\n";
$rp1= new ReflectionParameter(["Student","setClass"],0);
echo $rp1->getName() . "\n";
if(!($rp1->isOptional()))
{
echo $rp1->getName() . " is not an optional parameter\n";
}
echo "\n\n\n";
/**
* Parent class information
*/
echo "Parent class information\n\n";
$rc2=new ReflectionClass("Parents");
echo $rc2->getName() . " Class parent class is " . $rc2->getParentClass() . "\n";
echo $rc2->getConstructor();
echo "\n\n\n";

