<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');

include_once "ConfigColor.php";
/**
 * @desc for the change the color of each card
 * @var id store the id
 * @var colorcode to store the colorcode of the color
 */
class GetColor
{
    public function fetchColor()
    {
        $conf = new ConfigColor();
        $conn = $conf->configs();

        $id = $_POST['idcard'];
        $colorcode = $_POST['colorcard'];
        try {
            $stmt = $conn->prepare("UPDATE note SET colorcode = '$colorcode' where id = '$id' ");
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    #main ends
}