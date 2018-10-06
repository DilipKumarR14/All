<?php
include_once("demo1.php");
interface ICurrencyConverter
{
    public function convert($currency, $amount);
}

class GBPCurrencyConverter implements ICurrencyConverter
{
    public $name = "GBPCurrencyConverter";
    public $rates = array("USD" => 0.622846,
                          "AUD" => 0.643478);
    protected $var1;
    private $var2;

    function __construct() {}

    function convert($currency, $amount) {
        return $rates[$currency] * $amount;
    }
}

if (interface_exists("ICurrencyConverter")) {
    echo "ICurrencyConverter interface exists.n";
}

$classes = get_declared_classes();
echo "The following classes are available:n";
print_r($classes);

if (in_array("GBPCurrencyConverter", $classes)) {
    print "GBPCurrencyConverter is declared.n";
 
    $gbpConverter = new GBPCurrencyConverter();

    $methods = get_class_methods($gbpConverter);
    echo "The following methods are available:n";
    print_r($methods);

    $vars = get_class_vars("GBPCurrencyConverter");
    echo "The following properties are available:n";
    print_r($vars);

    echo "The method convert() exists for GBPCurrencyConverter: ";
    var_dump(method_exists($gbpConverter, "convert"));
}
$reflection = new ReflectionClass("GBPCurrencyConverter");
$interfaceNames=$reflection->getInterfaceNames();
echo $interfaceNames[0]."\n";

?>