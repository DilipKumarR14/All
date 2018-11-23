<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @description API For the Trash COmponent
 */
class Trash
{
    /**
     * @method deleteRecover()
     * to recover the card from the trash
     * @return the all the card after updating
     */
    public function deleteRecover()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];
        if ($id != "") {
            $stm = $conn->prepare("update note set isDelete = 'false' where id = '$id' ");
            $stm->execute();
            $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);

        }
    }
    /**
     * @method delete()
     * to move the card to the trash
     * @return the all the card after updating
     */
    public function delete()
    {
        $email = $_POST['email'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
        $stm->execute();

        $row = $stm->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);
    }
    /**
     * @method deleteForever()
     * to delete the card from the  trash permanently
     * @return the all the card after updating
     */
    public function deleteForver()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];

        $stm = $conn->prepare("delete from note where id = '$id' ");
        $stm->execute();

        $stm = $conn->prepare("select * from note where isDelete = 'true' order by id desc");
        $stm->execute();

        $row = $stm->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);

    }
}
