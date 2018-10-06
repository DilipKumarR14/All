<?php
include_once("configs.php");
view();

function view()
{
    $con = new Config();
    $con = $con->configs();
    $result = mysqli_query($con, "SELECT * FROM emp");
    echo "<center>";
echo "<h2>Employee Information</h2>";
echo "</center>";
    echo "<br><table border='0' width='30%' align='center'>
<tr bgcolor='grey'>
<th>Firstname</th>
<th>Age</th>
</tr>";
    while ($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['age'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    mysqli_close($con);
}
?>
<!DOCTYPE html>
<html>
<body>
    <center>
 <table cellpadding="10">
     <tr>
     <td align="center"><input type="button" value="Home" onClick="document.location.href='test.php'" /></td>
     </tr>
 
</table>
    </center>
</body>
</html>