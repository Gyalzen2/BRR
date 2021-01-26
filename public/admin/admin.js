$("document").ready(function(){

    let dataOf="";
    $("#data_base").on("change",function(){
        dataOf = $("#data_base").val();
        
    
    if(dataOf == "registration")
    {
        get_register_data();
    }
    else if(dataOf == "confirm")
    {
        get_confirm_data();
    }

});
get_register_data();
    async function get_register_data(){
        const response = await fetch('/registrationData');
        const data = await response.json();
        $("#get_cases").html("");
        var n = 1;
        data.forEach(itm => {
            row = "<tr><td>"+n+"</td><td>"+itm['name']+"</td><td>"+itm['email']+"</td><td>"+itm['pass2']+"</td><td>"+itm['latitude'].toFixed(4)+"</td><td>"+itm['longitude'].toFixed(4)+"</td><td><a href='#' cid='"+itm['_id']+"'class='btn btn-danger btn-sm del_register'>Delete</a>&nbsp;<a href='#' cid='"+itm['_id']+"' class='btn btn-info btn-sm edit_register' data-toggle='modal' data-target='#edit'>Edit</a>&nbsp;<a href='#' cid='"+itm['_id']+"' class='btn btn-success btn-sm acc'>Accept</a></td></tr>";
            n++;
            $("#get_cases").append(row);

        });
       
    }

    async function get_confirm_data(){
        const response = await fetch('/confirmCaseData');
        const data = await response.json();
        $("#get_cases").html("");
        var n = 1;
        data.forEach(itm => {
            row = "<tr><td>"+n+"</td><td>"+itm['name']+"</td><td>"+itm['email']+"</td><td>"+itm['pass2']+"</td><td>"+itm['latitude'].toFixed(4)+"</td><td>"+itm['longitude'].toFixed(4)+"</td><td><a href='#' cid='"+itm['_id']+"'class='btn btn-danger btn-sm del_confirm'>Delete</a>&nbsp;<a href='#' cid='"+itm['_id']+"' class='btn btn-info btn-sm edit_confirm' data-toggle='modal' data-target='#edit'>Edit</a></td></tr>";
            n++;
            $("#get_cases").append(row);
        });
       
    }

    
});