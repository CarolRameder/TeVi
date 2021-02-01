let submitBtn3 = document.getElementById("fetchBtnLogIn");
let user1 = document.getElementById("topfield");
let password1 = document.getElementById("password1");
let logdata1;
let fetched3=false;
let signDiv2=document.getElementById("idSign");
let wrongPassword=document.getElementById("wrong");
let section11=document.getElementById("section1");
let loginLI = document.getElementById("loginLI");
let section12=document.getElementById("section1");
let adminLI=document.getElementById("adminLI");
let savedName;
let savedDisplay;
let header = document.getElementById("head");

submitBtn3.addEventListener("click", onClick);

handleLogoutHover();

function onClick(){
    adminLI.style.display='inline';
    submitBtn3.setAttribute("disabled", true);
   
    var payload = {
        user : user1.value,
        password : password1.value
    
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    
    fetch("api/logIn",{ method:"POST", body: JSON.stringify(payload)})
        .then(function (resp) {
           
            return resp.json();
        })
        .then(function (jsonResp) {
            if(jsonResp.userFound)
            {
            savedDisplay = section11.style.display;
            section11.style.display='none';
            loginLI.removeAttribute('href');
            loginLI.innerHTML = jsonResp.name;

            }
            else{
                wrongPassword.style.visibility='visible';
            }
            clearSignInFields();
            submitBtn3.removeAttribute("disabled");
            submitBtn3.textContent = 'Log in';
           
        })
        
       
        .catch(function (err) {
            console.log(err);
        })
    
   
    
}

function clearSignInFields (){
    user1.value = "";
    password1.value = "";
}

function handleLogoutHover(){
    if(getCookie('authHash') !== ""){
        loginLI.innerHTML = getCookie('name');
        savedDisplay = section12.style.display;
        section12.style.display='none';
        adminLI.style.display='inline';
        
    }
    loginLI.addEventListener('click', function(){
        if(getCookie('authHash') !== ""){
            document.cookie = "authHash=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";    
            document.cookie = "name=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";    
            section11.style.display = savedDisplay;
            loginLI.setAttribute('href', '#section1');
            loginLI.innerHTML = 'Log in';    
            adminLI.style.display='none';
            location.reload();
            header.scrollIntoView();
        }
    })

    loginLI.onmouseover = function(){
        if(getCookie('authHash') !== ""){
            savedName = loginLI.innerHTML;
            loginLI.style.cursor = 'pointer';
            loginLI.innerHTML = "Log out";
        }
        
    };
    loginLI.onmouseout = function(){
        if(getCookie('authHash') !== ""){
            loginLI.innerHTML = savedName;
        }
    };
}


