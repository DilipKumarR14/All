<?php
namespace Validation;

use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\Common\Annotations\AnnotationRegistry;

class AnnotationValidator
{
    private $reader;

    public function __construct()
    {
        AnnotationRegistry::registerLoader(function ($name) {
            return class_exists($name, true);
        });
        $this->reader = new AnnotationReader();
    }

    function isValid($obj)
    {
        $refl = new \ReflectionClass($obj);
        foreach ($refl->getProperties() as $props) {
            $annoations = $this->reader->getPropertyAnnotations($props);

            foreach ($annoations as $annoation) {
                $validator = $annoation->validator();
                $isValid = $validator->isValid($props->getValue($obj));
                if (!isValid) {
                    return false;
                }
            }

        }
        return true;
    }
}
?>