<?php
include_once("demo.php");
$childreflect = new ReflectionClass('mychild');
echo "This class is abstract: ", (int)$childreflect->isAbstract(), "\n";
echo "This class is final: ", (int)$childreflect->isFinal(), "\n";
echo "This class is actually an interface: ", (int)$childreflect->isInterface(), "\n";

echo "\$child is an object of this class: ", (int)$childreflect->isInstance($child), "\n";

$parentreflect = new ReflectionClass('myparent');
echo "This class inherits from myparent: ", (int)$childreflect->isSubclassOf($parentreflect), "\n";

$reflect = new ReflectionClass('mychild');

echo "\nPrinting all methods in the 'mychild' class:\n";
echo "============================================\n";

foreach($reflect->getMethods() as $reflectmethod) {
    echo "  {$reflectmethod->getName()}()\n";
    echo "  ", str_repeat("-", strlen($reflectmethod->getName()) + 2), "\n";

    foreach($reflectmethod->getParameters() as $num => $param) {
        echo "    Param $num: \$", $param->getName(), "\n";
        echo "      Passed by reference: ", (int)$param->isPassedByReference(), "\n";
        echo "      Can be null: ", (int)$param->allowsNull(), "\n";

        echo "      Class type: ";
        if ($param->getClass()) {
            echo $param->getClass()->getName();
        } else {
            echo "N/A";
        }
        echo "\n\n";
    }
}
?>