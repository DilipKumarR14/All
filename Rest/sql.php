
<?php
class Sql
{
    function establishConnection()
    {
        /**
         * @var Object
         */
        // Check connection
        $con = mysqli_connect("localhost", "root", "admin", "cust");
        if($con == null)
        die("Connection Failed\n");
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
    }
    function insert()
    {
        $conn = new mysqli("localhost", "root", "admin", "cust");
        $sql = "INSERT INTO `cust`.`customers` (`name`) VALUES ('hrithik')";

        if (mysqli_query($conn, $sql)) {
            echo "New record created successfully \n";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        $conn->close();
    }
    function delete()
    {
        $conn = new mysqli("localhost", "root", "admin", "cust");
        $sql = "DELETE FROM `cust`.`customers` WHERE Id='3'";

        if ($conn->query($sql) === true) {
            echo "Record deleted successfully \n";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
        $conn->close();
    }
    function update()
    {
        $conn = new mysqli("localhost", "root", "admin", "cust");

        $sql = "UPDATE `cust`.`customers`SET Name='prashanth'  WHERE Id='4'";

        if ($conn->query($sql) === true) {
            echo "Record update successfully \n";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
        $conn->close();
    }
    function fetchParticularOrAll()
    {
        $conn = new mysqli("localhost", "root", "admin", "cust");
    // $sql = "SELECT * FROM cust.customers WHERE ID='1'";
        $sql = "SELECT * FROM cust.customers";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
    // output data of each row
            while ($row = $result->fetch_assoc()) {
                echo "id: " . $row["id"] . "\nName: " . $row["name"] . "\n";
            }
        } else {
            echo "results not Fetched\n";
        }
        $conn->close();
    }
    function closeConnection()
    {
        $conn = new mysqli("localhost", "root", "admin", "cust");
        $conn->close();
    }
}

$s=new Sql();
// $s->establishConnection();
$s->fetchParticularOrAll();
?>