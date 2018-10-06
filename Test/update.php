<?php include "view.php"?>
<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<head>
    <script>
/**
* @method : fetch the data entred by the user from form to update
* @var firstname: holds the data name from the form
* @var age : holds the data age from the form
* @var uname: holds the data updated name from the form
* @var firstname: holds the data updated age from the form

*/
     function updates() {
        var firstname = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var uname = document.getElementById("uname").value;
        var uage = document.getElementById("uage").value;
        
        var data = {name:firstname,age:age,uname:uname,uage:uage};
        $.ajax({
         data: data,
         type: "POST",
         url: "update1.php",
         success: function(data){
            if(data.success == true){ // if true (1)
         
        }
     else{
        alert(data); 
    setTimeout(function(){  // wait for 0.5 secs(2)
           location.reload(); // then reload the page.(3)
      }, 100); 
   }      
}
});
}    
    </script>
</head>
<br><br>
<body>
    <center>
    <h2>Update The Information</h2>
 <table  cellpadding="10" cellspacing="10">

    <tr>
        <td>Enter the existing name</td>
         <td align="center"> Name : <input type="text" id="name" required></td>
     </tr>

      <tr>
      <td>Enter the existing age </td>
         <td align="center"> Age  : <input type="text" id="age" required></td>
     </tr>
    <tr>
    <td>Enter the name </td>
         <td align="center">  Name : <input type="text" id="uname" required></td>
     </tr>

      <tr>
      <td>Enter the age</td>
         <td align="center">  Age  : <input type="text" id="uage" required></td>
     </tr>

     <tr>
         <td align="center" colspan="2"><button type="button" onclick="updates();">Update</button>
     </tr>
     <tr>
     <td align="center" colspan="2"><input type="button" value="Home" onClick="document.location.href='test.php'" /></td>
     </tr>

 
</table>
    </center>
</body>
</html>