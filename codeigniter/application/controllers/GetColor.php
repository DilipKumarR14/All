<?php
include_once("ConfigColor.php");
class GetColor{
    public function fetchColor(){
    
        $conf = new ConfigColor();
        $conn = $conf->configs();

        try {
            $stmt = $conn->prepare("select * from colors where color='$red' ");
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        $pass = "";

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $pass = $row['rgb'];
        }
        $res = "{status :'$pass'}";
        return $res;
    }


    #main ends
}

?>