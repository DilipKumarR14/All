<?php
//including the database connection file
include_once("config.php");

//fetching data in descending order (lastest entry first)
$result = $dbConn->query("SELECT * FROM users");
?>

<html>
<head>	
	<title>Homepage</title>
</head>

<body>
<a href="add.html">Add User</a><br/><br/>

	<table cellpadding="10" border=0>

	<tr bgcolor='grey'>
		<td>Name</td>
		<td>Age</td>
		<td>Email</td>
		<td>Update</td>
	</tr>
	<?php 	
	while($row = $result->fetch(PDO::FETCH_ASSOC)) { 		
		echo "<tr>";
		echo "<td>".$row['name']."</td>";
		echo "<td>".$row['age']."</td>";
		echo "<td>".$row['email']."</td>";	
		//onclick on edit button pass the row id along with it
		echo "<td><a href=\"edit.php?id=$row[id]\">Edit</a> | 
				  <a href=\"delete.php?id=$row[id]\" 
				  onClick=\"return confirm('Are you sure you want to delete?')\">
				  Delete</a></td>";		
	}
	?>
	</table>
</body>
</html>