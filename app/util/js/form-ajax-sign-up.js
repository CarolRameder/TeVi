let submitBtn2 = document.getElementById("fetchBtnLog");
let name = document.getElementById("name");
let user = document.getElementById("user");
let password = document.getElementById("password");
let logdata;
let fetched2=false;
let signDiv=document.getElementById("idSign");
let wrongg=document.getElementById("wrong");
submitBtn2.addEventListener("click", onClick);
let section1=document.getElementById("section1");

function onClick(){
   
    var payload = {
        name: name.value,
        user : user.value,
        password : password.value
        
    
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    
    fetch("api/signUp",{ method:"POST", body: JSON.stringify(payload)})
        .then( function(resp) {
            clearSignUpFields();
            if(resp.status == 400){
                alert("Username is not available");
            }
            
        })
    
        .catch(function (err) {
            console.log(err);
        })
    
    
   
    
}

function clearSignUpFields (){
    name.value = "";
    user.value = "";
    password.value = "";
}