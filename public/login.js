$("document").ready(function(){

//for login

$('#mark_safe').on("submit",function(){
    $(".overlay").show();
  
    var email = $('#log_email');
    var pass = $('#log_password');
    var status = [0,0];
    if (email.val() == "")
    {
      email.addClass("border-danger")
      $("#e_error").html("<span class='text-danger'>  please enter Email Address </span>");
      status[0] = 0;
      $(".overlay").hide();
  
    }else{
      email.removeClass("border-danger")
      $("#e_error").html("");
      status[0] = 1;
    }
  
    if (pass.val() == "")
    {
      pass.addClass("border-danger")
      $("#p_error").html("<span class='text-danger'>  please enter Password </span>");
      status[1] = 0;
      $(".overlay").hide();
  
    }else{
      pass.removeClass("border-danger")
      $("#p_error").html("");
      status[1] = 1;
    }
    if(status.filter(x=> x == 0).length == 0)
    {   

        async function sendLogin(email,pass){
            const cridentials = {email,pass};
            const options ={
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(cridentials)
            };
            const response = await fetch('/login',options);
            const data = await response.json();
            
            if(data == "NOT_REGISTER")
        {

            $('#log_email').addClass("border-danger")
            $("#e_error").html("<span class='text-danger'>  Your email is not registered </span>");
            $(".overlay").hide();
            
        }else if(data == "PASSWORD_NOT_MATCHED"){
            $('#log_password').addClass("border-danger");
            $("#p_error").html("<span class='text-danger'>  please enter correct Password </span>");
            $(".overlay").hide();
        }else if(data == "REMOVED"){
          $('#log_email').val("");
          $('#log_password').val("");
            $("#alert").show();
            $(".card").hide();

        }else{
          alert(data);
        }
            
        }
        
         sendLogin(email.val(),pass.val());

        
      
    }
  })

  $("#understood").click(function(){
    $(".card").show();

        $("#alert").hide();
  });

});

