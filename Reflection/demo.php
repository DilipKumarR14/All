<?php
interface ing{
    public function foo($bar);
}
    class myparent implements ing {
        public function foo($bar) {
            // do stuff
        }
    }

    class mychild extends myparent {
        public $val;

        private function bar(myparent &$baz) {
            // do stuff
        }

        public function __construct($val) {
            $this->val = $val;
        }
    }

    $child = new mychild('hello world');
    $child->foo('test');
?>