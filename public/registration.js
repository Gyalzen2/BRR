$("document").ready(function(){
  $("#alert").hide();
      //register
      $("#register_form").on("submit",function() {
        $(".overlay").show();
       // var status = false;
        var name = $("#username");
        var email = $("#email");
        var pass1 = $("#password1");
        var pass2 = $("#password2");
        var status = [0,0,0,0]
        var e_patt = new RegExp(/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z]{2,4})$/);
        if(name.val() == "" || name.val().length < 6){
          name.addClass("border-danger");
          $("#u_error").html("<span  class='text-danger'> Please enter name and it should be consisted of atleast 6 characters </span>");
          $(".overlay").hide();
          status[0] = 0;
        }else{
          name.removeClass("border-danger");
          $("#u_error").html("");
          status[0] = 1;
        }
  
        if(!e_patt.test(email.val())){
          email.addClass("border-danger");
          $("#e_error").html("<span  class='text-danger'> Please enter valid email address </span>");
          $(".overlay").hide();
          status[1] = 0;
        }else{
          email.removeClass("border-danger");
          $("#e_error").html("We'll never share your email with anyone else.");
          $(".overlay").hide();
          status[1] = 1;
        }
  
        if(pass1.val() == "" || pass1.val().length < 9){
          pass1.addClass("border-danger");
          $("#p1_error").html("<span  class='text-danger'> Please enter more that 9 digit password </span>");
          $(".overlay").hide();
          status[2] = [0];
        }else{
          pass1.removeClass("border-danger");
          $("#p1_error").html("");
          status[2] = [1];
        }
  
        if(pass1.val() == "" || pass1.val().length < 9){
          pass2.addClass("border-danger");
          $("#p2_error").html("<span  class='text-danger'> Please enter more that 9 digit password </span>");
          $(".overlay").hide();
          status[3] = 0;
        }else if(pass2.val() != pass1.val()  )
        {
          pass2.addClass("border-danger");
          $("#p2_error").html("<span  class='text-danger'> Password not matched </span>");
          $(".overlay").hide();
          status[3] = 0;
        }
        else{
          pass2.removeClass("border-danger");
          $("#p2_error").html("");
          status[3] = 1;
        }
  
  
        
        
        if(status.filter(x=> x == 0).length == 0)
        {
            sendData(name.val(),email.val(),pass2.val());
            name.val("");
            pass1.val("");
            pass2.val("");
            email.val("");
            $(".card").hide();

            $("#alert").show();
            function sendData(name,email,pass2) {
            
                async function success(position) {
                    const mylocation =[position.coords.latitude,position.coords.longitude];
                   
                    
                    //sending latitude and longitude to server
                    const latitude = mylocation[0];
                    const longitude = mylocation[1];
                    const data = {name,email,pass2, latitude,longitude};
                    console.log(data)
                    const options ={
                        method:'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(data)
                    };
                    const response = await fetch('/api',options);
                    const json = await response.json();
                    console.log(json);
                    
                }
    
                function error() {
                   alert( 'Unable to retrieve your location');
                }
    
                if(!navigator.geolocation) {
                    alert( 'Geolocation is not supported by your browser');
                } else {
                    //status.textContent = 'Locating…';
                    navigator.geolocation.getCurrentPosition(success, error);
                }
    
            }
            
        }
        
      });

      $("#understood").click(function(){
        $(".card").show();

            $("#alert").hide();
      });

  
})