<?php
namespace Validation\Annotations;
/**
 * @Annotation
 * @Target("PROPERTY)
 */
class Ints
{
    function validator(){
        return \Validation\Int();
    }
}






?>