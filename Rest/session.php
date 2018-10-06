<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html>
<body>

<?php
// Set session variables
echo $_SESSION["favcolor"]."<br>";
$_SESSION["favcolor"] = "green";
$_SESSION["favanimal"] = "cat";
echo "Session variables are set.<br>";
echo $_SESSION["favcolor<br>"];
print_r($_SESSION);
session_unset();
session_destroy();

print_r($_SESSION)."\n";
?>

</body>
</html>