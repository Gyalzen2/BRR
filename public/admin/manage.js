$("document").ready(function(){

    $("body").delegate(".del_register","click",function(){
        var cid = $(this).attr("cid");
        if(confirm("Are you sure you want to delete...!!!")){
            async function del(id){
                const cridentials = {id};
                
                const options ={
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(cridentials)
                };
                const response = await fetch('/deleteRegisterCase',options);
                const data = await response.json(); 
                window.location.href = "";
                
            }
            
            del(cid);
        }
    });

    
    $("body").delegate(".del_confirm","click",function(){
        var cid = $(this).attr("cid");
        if(confirm("Are you sure you want to delete...!!!")){
            async function del(id){
                const cridentials = {id};
                
                const options ={
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(cridentials)
                };
                const response = await fetch('/deleteConfirmCase',options);
                const data = await response.json(); 
                window.location.href = "";
                
            }
            
            del(cid);
        }
    });
    $("body").delegate(".acc","click",function(){
        var cid = $(this).attr("cid");
        if(confirm("Are you sure you want to Accept...!!!")){
            async function accept(id){
                const cridentials = {id};
                
                const options ={
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(cridentials)
                };
                const response = await fetch('/acceptCase',options);
                const data = await response.json(); 
                window.location.href = "";
                
            }
            
            accept(cid);
        }
    });

    $('body').delegate(".edit_confirm","click",function(){
        var cid = $(this).attr("cid");
        async function edit(id){
            const cridentials = {id};
            
            const options ={
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(cridentials)
            };
            const response = await fetch('/getSingleConfirmCase',options);
            const data = await response.json(); 
            
            $("#edit_username").val(data[0]['name']);
            $("#edit_email").val(data[0]['email']);
            $("#edit_password1").val(data[0]['pass2']);
            $("#edit_password2").val(data[0]['pass2']);
            $("#edit_latitude").val(data[0]['latitude']);
            $("#edit_longitude").val(data[0]['longitude']);
            $("#id").val(data[0]['_id']);

            
        }
        edit(cid);

    });

    $('body').delegate(".edit_register","click",function(){
        var cid = $(this).attr("cid");
        async function edit(id){
            const cridentials = {id};
            
            const options ={
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(cridentials)
            };
            const response = await fetch('/getSingleRegisterCase',options);
            const data = await response.json(); 
            
            $("#edit_username").val(data[0]['name']);
            $("#edit_email").val(data[0]['email']);
            $("#edit_password1").val(data[0]['pass2']);
            $("#edit_password2").val(data[0]['pass2']);
            $("#edit_latitude").val(data[0]['latitude']);
            $("#edit_longitude").val(data[0]['longitude']);
            $("#id").val(data[0]['_id']);

            
        }
        edit(cid);

    });
    $('#edit_form').on('submit',function(){

        async function updateConfirmCase(id,name,email,pass2,latitude,longitude){
            const dataUpdate = {id,name,email,pass2,latitude,longitude};
            
            const options ={
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(dataUpdate)
            };
            const response = await fetch('/updateConfirmCase',options);
            const data = await response.json(); 
            if(data == "UPDATED")
            {
                window.location.href = "";
            }
        };
        async function updateRegistrationCase(id,name,email,pass2,latitude,longitude){
            const dataUpdate = {id,name,email,pass2,latitude,longitude};
            
            const options ={
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(dataUpdate)
            };
            const response = await fetch('/updateRegisterCase',options);
            const data = await response.json(); 
            if(data == "UPDATED")
            {
                window.location.href = "";
            }
        };
        
        const name = $("#edit_username");
        const email = $("#edit_email");
        const pass2 = $("#edit_password2");
        const latitude = $("#edit_latitude");
        const longitude = $("#edit_longitude");
        const id = $("#id");

        if($("#data_base").val() == "registration")
        {
            updateRegistrationCase(id.val(), name.val(),email.val(),pass2.val(),latitude.val(),longitude.val());

        }
        else{
            updateConfirmCase(id.val(), name.val(),email.val(),pass2.val(),latitude.val(),longitude.val());
        }
        

    });
    
});