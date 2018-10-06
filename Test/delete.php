<?php include "view.php"?>
<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<head>

    <script>
    /**
    *@method : fetch the data entred by the user from form to delete
    * @var firstname: holds te data name from the form
    * @var age : holds te data age from the form
    */
     function deletes() {
        var firstname = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var data = {name:firstname,age:age};
        $.ajax({
         data: data,
         type: "POST",
         url: "delete1.php",
         success: function(data){
         // if true (1)
         alert(data);
        setTimeout(function(){  // wait for 0.5 secs(2)
           location.reload(); // then reload the page.(3)
      }, 100); 
}
})
}    
    </script>
</head>
<br><br>
<body>
    <center>
    <h2>Delete The Information</h2>
 <table cellpadding="10">

    <tr>
         <td align="center"> Name : <input type="text" id="name" required></td>
     </tr>

      <tr>
         <td align="center"> Age  : <input type="text" id="age" required></td>
     </tr>

     <tr>
         <td align="center"><button type="button" onclick="deletes();">Delete</button>
     </tr>
     <tr>
     <td align="center"><input type="button" value="Home" onClick="document.location.href='test.php'" /></td>
     </tr>
 
</table>
    </center>
</body>
</html>