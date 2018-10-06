<?php
interface School
{
    public function schoolname();
}
abstract class Principle implements School
{
    abstract function getTeacherDetails();
    public function principle()
    {
        return "Bala Gangadhara Bhatta Charya";
    }
}
class TeacherA extends Principle
{
    public $teacherName = "moorthi";
    public $subject = "maths";
    public function schoolname()
    {
        return $this->teacherName . "studying " . $this->subject . "in SBG high School\n";
    }
    public function getTeacherDetails()
    {
        echo "Teacher name :" . $this->teacherName . "\n";
        echo "Handling " . $this->subject . "\n";
    }
}
class TeacherB extends Principle
{
    public $teacherName = "shwetha";
    public $subject = "physics";
    public function schoolname()
    {
        return $this->teacherName . "studying " . $this->subject . "in SBG high School\n";
    }
    public function getTeacherDetails()
    {
        echo "Teacher name :" . $this->teacherName . "\n";
        echo "Handling " . $this->subject . "\n";
    }
}
class Student implements School
{
    public $studentName = "pankaj";
    public $marks = ["maths" => 87, "physics" => 90];
    public $class = "10th";
    public function getName()
    {
        echo $this->studentName . "\n";
    }
    public function getClass()
    {
        echo $this->class . " standard\n";
    }
    public function setClass($data)
    {
        $this->class = $data;
    }
    public function schoolname()
    {
        $sub1 = new TeacherB();
        echo $this->studentName . " studying " . $this->class . " standard in SBG high School\n";
        echo "Principle of the class is " . $sub1->principle() . "\n";

    }
    public function getClassTeacher()
    {
        $teacher = new TeacherB();
        echo $teacher->teacherName . " is class teacher for " . $this->class . "\n";
    }
    public function getSubTeacher()
    {
        $sub1 = new TeacherB();
        $sub2 = new TeacherA();
        $sub1->getTeacherDetails();
        $sub2->getTeacherDetails();
    }

}
class Parents extends Student
{
    public function __construct()
    {
        echo "Parent class construct";
    }
    public function sonDetails()
    {
        $ch = 0;
        do {
            echo "enter 1: Sonname :\n";
            echo "enter 2: Son school name :\n";
            echo "enter 3: son class teacher :\n";
            echo "enter 4: Son subject teachers ;\n";
            echo "enter 5: exit ;\n";
            $choose = Parents::getInt();
            switch ($choose) {
                case 1:
                    Parents::getName();
                    break;
                case 2:
                    Parents::schoolname();
                    break;
                case 3:
                    Parents::getClassTeacher();
                    break;
                case 4:
                    Parents::getSubTeacher();
                    break;
                case 5:
                    $ch = 1;
                    break;
                default:
                    echo "invalid entry";
                    break;
            }
            echo "\n";
        } while ($ch == 0);
    }
    public function getInt()
    {
        fscanf(STDIN, '%d', $num);
        if (filter_var($num, FILTER_VALIDATE_INT)) {
            return $num;
        } else {
            echo "enter valid number \n";
//recursion
            return ShoppingCartClient::getInt();
        }
    }
}