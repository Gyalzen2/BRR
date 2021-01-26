$("document").ready(function(){
    
        //register
        $("#register_form").on("submit",function() {
          $(".overlay").show();
         // var status = false;
          var name = $("#username");
          var email = $("#email");
          var pass1 = $("#password1");
          var pass2 = $("#password2");
          var latitude = $("#latitude");
          var longitude = $("#longitude");
          var status = [0,0,0,0,0,0]
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
    
          if(latitude.val() == ""){
            latitude.addClass("border-danger");
            $("#la_error").html("<span  class='text-danger'> Please enter latitude </span>");
            $(".overlay").hide();
            status[4] = 0;
          }else{
            latitude.removeClass("border-danger");
            $("#la_error").html("");
            status[4] = 1;
          }

          if(longitude.val() == ""){
            longitude.addClass("border-danger");
            $("#lo_error").html("<span  class='text-danger'> Please enter longitude</span>");
            $(".overlay").hide();
            status[5] = 0;
          }else{
            longitude.removeClass("border-danger");
            $("#lo_error").html("");
            status[5] = 1;
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
              sendData(name.val(),email.val(),pass2.val(),latitude.val()-0,longitude.val()-0);
              name.val("");
              pass1.val("");
              pass2.val("");
              email.val("");
              latitude.val("");
              longitude.val("");

              async function sendData(name,email,pass2,latitude,longitude) {

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
                  if (json['status'] == "success"){
                    $("#status").html("<span class='text-success'>*New case added</span>");  
                    window.location.href = "";
                  }
                  if (json['status'] == "EMAIL_ALREADY_REGISTERED"){
                    $("#status").html("<span class='text-danger'>*email alredy registered</span>");  
                  }
                  
                  
              }
  
          }
          
        });
  
       
  
    
  })