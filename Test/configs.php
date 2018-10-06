<?php
/*******************************
 * @desciption : Connect to the database
 * @method : establish the connection to database
 *******************************/
class Config
{
	/**
	 * @method Establish the Connection 
	 * @var conn Establish the Connection with DataBase
	 * @return Object
	 */
	function configs()
	{
// Create connection
		$conn = new mysqli("localhost","root","admin","emp");

// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}else{
			return $conn;
		}
	}
}
?>