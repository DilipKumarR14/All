<?php
class Introspection
{
    public function description() {
        echo "I am a super class for the Child class.n\n";
    }
}

class Child extends Introspection
{
    public function description() {
        echo "I'm " . get_class($this) , " class.n\n";
        if(get_parent_class($this)){
        echo "I'm " . get_parent_class($this) , "'s child.n\n";
        }else {
            echo "I'm not " . get_parent_class($this) , "'s child.n\n";
        }
    }
}

if (class_exists("Introspection")) {
    $introspection = new Introspection();
    echo "The class name is: " . get_class($introspection) . "n\n"; 
    $introspection->description();
}

if (class_exists("Child")) {
    $child = new Child();
    $child->description();

    if (is_subclass_of($child, "Introspection")) {
        echo "Yes, " . get_class($child) . " is a subclass of Introspection.n\n";
    }
    else {
        echo "No, " . get_class($child) . " is not a subclass of Introspection.n\n";
    }
}
echo "\n";
$child=new ReflectionClass("Child");
$parent=$child->getParentClass();
echo $child->getName()."\n";
echo $parent->getName()."\n";;
echo "\n";

?>