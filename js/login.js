$(document).ready(function(){
    //hide error panel on ready
	$("#login_error").hide();
    //hide welcome panel on ready
	$("#welcome-panel").hide();
});

//form submit
$("#login_form").submit(function(event){
    event.preventDefault();
    //check for validations
	var checkLogin =  validateLogin();
	if(checkLogin){
		var post_url = "https://reqres.in/api/login";
		var request_method = "POST"; 
		var form_data = { email : $("#login_email").val(), password : $("#login_password").val()};
        // API call validate user details
		$.ajax({
			url : post_url,
			type: request_method,
			data : JSON.stringify(form_data),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(res) { //success handler
				$("#welcome-msg").html('<div class="alert alert-success" role="alert">Hello, you are logged in successfully and your Token is ::  <strong>'+res.token+'</strong></div>');
				$("#signin-panel").hide(); //hide signin panel
				$("#welcome-panel").show(); //show welcome message
			},
			error: function(xhr, status, error) { // error handler
				var res = JSON.parse(xhr.responseText);
				$("#login_error").show(); //show error panel
				$("#login_error").html("<ul><li>"+res.error+"</li></ul>");
			}
		
		}); 
		
	}
});

//login validation
function validateLogin(){
	var isValid = false,
	email = $("#login_email").val(),
	password = $("#login_password").val(),
	errorMsg = "";
    //email validation
	var emailValidation = emailValidCheck(email);
    //password validation
	var pwdValidation = pwdValidCheck(password);
    //email error/ success display & syles
	if(emailValidation != ""){
		errorMsg = errorMsg + emailValidation;
		$("#login_email").removeClass("is-valid");	
		$("#login_email").addClass("is-invalid is-invalid-error");		
	}else{
		$("#login_email").removeClass("is-invalid is-invalid-error");	
		$("#login_email").addClass("is-valid");
	}
    //passord error/ success display & syles
	if(pwdValidation != ""){
		errorMsg = errorMsg + pwdValidation;
		$("#login_password").removeClass("is-valid");	
		$("#login_password").addClass("is-invalid is-invalid-error");	
	}else{
		$("#login_password").removeClass("is-invalid is-invalid-error");	
		$("#login_password").addClass("is-valid");	
	}
    //error message panle
	if(errorMsg != ""){
		$("#login_error").show();
		$("#login_error").html("<ul>"+errorMsg+"</ul>");
		isValid = false;
	}else{
		$("#login_error").hide();
		isValid = true;
	}	
	return isValid;
}

//email validation check
function emailValidCheck(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  errorMsg = "";
  if(!email){
	errorMsg = errorMsg + "<li>Please enter your E-mail</li>";
  }
  if(!regex.test(email)){
    errorMsg = errorMsg + "<li>Please enter a valid E-mail</li>";
	}
	return errorMsg;
}

//password Validation check
function pwdValidCheck(password) {
  var errorMsg = "";
  if(!password){
	errorMsg = errorMsg + "<li>Please enter your password</li>";
  }
  if(password.length < 6){
    errorMsg = errorMsg + "<li>Your password must be at least 6 characters</li>";
	}
	return errorMsg;
}