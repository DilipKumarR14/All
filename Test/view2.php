<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<head>
<!-- <meta http-equiv="refresh" content="5"> -->
</head>
<script>
  function read()
    {
        var res="";
        $.ajax({
            type:'GET', 
            url:"v1.php",
            dataType: 'json',
            success: function(response){
               /// alert(JSON.srin response);
                // alert(JSON.stringify(response));

                var jsondata= JSON.stringify(response);
               if(response.status=="success")
               {
             res+= "<div>";
             res+= "<table width='20%'>";
             res+=  "<tr bgcolor='grey'>" +
                        "<th align='center'>name</th>" +
                        "<th align='center'>age</th>" +
                        "</tr>";
            $.each(response.data, function(key,data) {
                debugger;
                 res+='<tr><td align="center">'+data.name+'</td>'+'<td align="center">'+data.age+'</td>'+'</tr>';
            });
            res+= "</table>";
            res+= "</div>";
            $("#container").html(res);
        }else{
            $("#container").html('No Result Found');
          }
           }
        });   
    }
</script>
<body>
    <center>
    <!-- Creating th table -->
        <h2>Employee Information</h2>
        <td align="center"><input type="button" value="Home" onClick="document.location.href='test.php'" /></td>
        <br>
        <br>    
<td colspan="2" align="center"> <button type="button" onclick="read();">Read</button></td>

<br>
<br>
<div id="container" align="center">

</div>

    </center>

</body>
</html>

