<?php
namespace mindplay\demo;

use Composer\Autoload\ClassLoader;
use mindplay\annotations\AnnotationCache;
use mindplay\annotations\Annotations;
use mindplay\demo\annotations\Package;

class Foo{
    /**
     * @var integer
     */
    public $bar;

    /**
     * Get the value of bar
     *
     * @return  integer
     */ 
    public function getBar()
    {
        return $this->bar;
    }

    /**
     * Set the value of bar
     *
     * @param  integer  $bar
     *
     * @return  self
     */ 
    public function setBar($bar)
    {
        $this->bar = $bar;

        return $this;
    }
}

$f=new Foo();
$f->setBar("hello world\n");
echo $f->getBar();
?>