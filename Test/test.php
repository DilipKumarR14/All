<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<head>
<!-- <meta http-equiv="refresh" content="5"> -->
</head>
<script>
/**
*@method : fetch the data entred by the user from form
* @var firstname: holds te data name from the form
* @var age : holds te data age from the form
*/
    function insert() {
        
        var firstname = document.getElementById("fname").value;
        var ages = document.getElementById("age").value;
        var data = {name:firstname,age:ages,store:'emp'};
        $.ajax({
         data: data,
         type: "POST",
         url: "emp.php",
         success: function(data){
    alert(data)
    setTimeout(function(){  // wait for 0.5 secs(2)
           location.reload(); // then reload the page.(3)
      }, 100); 

         }
});
}
</script>
<body>
    <center>
    <!-- Creating th table -->
        <h2>Create Employee Information</h2>
            <table cellpadding="10">
                <tr>
                        <td>Name: <input type="text" name="firstname" required id="fname" placeholder="Enter the Name" autofocus></td>
                        <br>

                        <td>Age: <input type="text" name="age" id="age" required placeholder="Enter The Age"><br></td>
                        <br>
                      
                </tr>
                <tr></tr>
                 <td colspan="2" align="center"> <button type="button" onclick="insert();">INSERT</button></td>
                <tr></tr>
            </table>
            <hr>
            <td>
            <!-- To read the employee Information -->
                <h2>To Read The Employee Information</h2>
                <button type=button onClick="parent.location='view2.php'" value='View'>View All Information</button>
            </td>
            <hr> 
            <!-- To delete the information -->
            <h2>To Delete The Information</h2>
            <button type=button onClick="parent.location='delete.php'" value='View'>View All Information</button>
            <hr> 
            <!-- To update the information -->
            <h2>To Update The Information</h2>
            <button type=button onClick="parent.location='update.php'">Update</button>

    </center>

</body>
</html>
