// attacks update fields
let updateAttackBtn = document.getElementById("update-attack");
let getRecordButton = document.getElementById("uget-attack");
let uid = document.getElementById("uid");
let uyear = document.getElementById("uiyear");
let umonth = document.getElementById("uimonth");
let uday = document.getElementById("uiday");
let ucountry = document.getElementById("ucountry_txt");
let ucity = document.getElementById("ucity");
let ulatitude = document.getElementById("ulatitude");
let ulongitude = document.getElementById("ulongitude");
let usuccess = document.getElementById("usuccess");
let usuicide = document.getElementById("usuicide");
let uattacktype1_txt = document.getElementById("uattacktype1_txt");
let utargtype1_txt = document.getElementById("utargtype1_txt");
let uweaptype1_txt = document.getElementById("uweaptype1_txt");


let year = document.getElementById("iyear");
let month = document.getElementById("imonth");
let day = document.getElementById("iday");
let country = document.getElementById("country_txt");
let city = document.getElementById("city");
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");
let success = document.getElementById("success");
let suicide = document.getElementById("suicide");
let attacktype1_txt = document.getElementById("attacktype1_txt");
let targtype1_txt = document.getElementById("targtype1_txt");
let weaptype1_txt = document.getElementById("weaptype1_txt");

let id = document.getElementById("id");
let username = document.getElementById("user");

//attacks pannel
let insertAttack = document.getElementById("insert-attack");
let deleteAttack = document.getElementById("delete-attack");
insertAttack.addEventListener("click", insertAtt);
deleteAttack.addEventListener("click", deleteAtt);

//users pannel
let dUser = document.getElementById("del-user");
let mAdmin = document.getElementById("make-admin");
let rAdmin = document.getElementById("unmake-admin");
dUser.addEventListener("click", deleteUser);
mAdmin.addEventListener("click", makeAdmin);
rAdmin.addEventListener("click", removeAdmin);
getRecordButton.addEventListener("click", getUpdateRecord);
updateAttackBtn.addEventListener("click", updateAttack);

var authHeader = getCookie('authHash');
if(authHeader === ""){
    authHeader = 'none';
}
function updateAttack(){
    var payload = {
        id : uid.value,
        iyear : uyear.value,
        imonth : umonth.value,
        iday : uday.value,
        country_txt : ucountry.value,
        city : ucity.value,
        latitude : ulatitude.value,
        longitude : ulongitude.value,
        success : usuccess.value,
        suicide : usuicide.value,
        attacktype1_txt : uattacktype1_txt.value,
        targtype1_txt : utargtype1_txt.value,
        weaptype1_txt : uweaptype1_txt.value
    };
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    
    fetch("../../api/attack",{ method:"PUT",
                                headers: new Headers({ 'Authorization': authHeader}), 
       body: JSON.stringify(payload)})
         .then(function (resp) {
            if(resp.status == 200){
                alert('Attack sucessfully updated');
            }
            else if(resp.status == 401){
                alert('You must have admin privileges to modify database');
            }
            else{
                alert('Unkown error');
            }
            clearUpdateFields();
           
         })
       
        
}


//user functions
function deleteUser(){

    //endp?
    let getEndPoint="../../api/users/";
    getEndPoint = getEndPoint.concat(username.value);
    fetch(getEndPoint,{ method:"DELETE" ,headers: new Headers({
        'Authorization': authHeader
      }) })
    .then(function (resp) {
        if(resp.status == 200){
            alert('User successfully deleted');
        }
        else if(resp.status == 204){
            alert('Invalid username');
        }
        else if(resp.status == 401){
            alert('You must have admin privileges to modify database');
        }
        else{
            alert('Unkown error');
        }
    
    })
   
}

function makeAdmin(){
    operateAdmin(1);
}

function removeAdmin(){
    operateAdmin(0);
}

function operateAdmin(control){

    var payload = {
        isAdmin : control,
        user : username.value
    };

    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    
    fetch("../../api/users",{ method:"PUT", headers: new Headers({
        'Authorization': authHeader
      }), 
      body: JSON.stringify(payload)})
         .then(function (resp) {
             username.value = '';
           if(resp.status == 200){
               alert('User permissions updated');
           }
           else if(resp.status == 204){
               alert("Invalid username");
           }
           else if(resp.status == 401){
            alert('You must have admin privileges to modify database');
            }
            else{
                alert('Unkown error');
            }
         
         })
        
       
}


//attacks functions
function insertAtt(){

    var payload = {

        iyear : year.value,
        imonth : month.value,
        iday : day.value,
        country_txt : country.value,
        city : city.value,
        latitude : latitude.value,
        longitude : longitude.value,
        success : success.value,
        suicide : suicide.value,
        attacktype1_txt : attacktype1_txt.value,
        targtype1_txt : targtype1_txt.value,
        weaptype1_txt : weaptype1_txt.value
    
    };

   
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    fetch("../../api/attacks",{ method:"POST",
     headers: new Headers({
        'Authorization': authHeader
      }),  
      body: JSON.stringify(payload)})
         .then(function (resp) {
           clearInsertFields();
             if(resp.status == 200){
                 alert('Attack successfully inserted');
             }
             else if(resp.status == 401){
                alert('You must have admin privileges to modify database');
            }
            else{
                alert('Unkown error');
            }
         })
        
         
         
    
}

function deleteAtt()
{

    let getEndPoint="../../api/attacks/";
    getEndPoint = getEndPoint.concat(id.value);
    fetch(getEndPoint,{ method:"DELETE" ,
    headers: new Headers({
        'Authorization': authHeader
      })})
    .then(function (resp) {
        if(resp.status == 200){
            alert('Attack successfully deleted');
        }
        else if(resp.status == 204){
            alert('Invalid attack ID');
        }
        else if(resp.status == 401){
            alert('You must have admin privileges to modify database');
        }
        else{
            alert('Unkown error');
        }
        id.value='';
       
    
    })
   
    
}

function getUpdateRecord(){
    let getEndPoint="../../api/attack/";
    getEndPoint = getEndPoint.concat(uid.value);
    fetch(getEndPoint,{ method:"GET"}) 
    .then(function (resp) {
        if(resp.status == 204){
            alert('Invalid attack ID');
            
            return null;
        }
        else if(resp.status == 200){
            return resp.json();
        }
        else{
            alert('Unkown error');
            return null;
        }
        
        
    })
    .then(function(resp){
        if(resp != null){
            setUpdateFields(resp);
        }
        

    })
}

function setUpdateFields(json){
    uyear.value =  json['iyear'];
    umonth.value=  json['imonth'];
    uday.value=  json['iday'];
    ucountry.value=  json['country_txt'];
    ucity.value=  json['city'];
    ulatitude.value=  json['latitude'];
    ulongitude.value=  json['longitude'];
    usuccess.value=  json['success'];
    usuicide.value=  json['suicide'];
    uattacktype1_txt.value=  json['attacktype1_txt'];
    utargtype1_txt.value=  json['targtype1_txt'];
    uweaptype1_txt.value=  json['weaptype1_txt'];
}

function clearUpdateFields(){
    uid.value = ''; 
    uyear.value = '';
    umonth.value=  '';
    uday.value=  '';
    ucountry.value=  '';
    ucity.value=  '';
    ulatitude.value=  '';
    ulongitude.value=  '';
    usuccess.value=  '';
    usuicide.value=  '';
    uattacktype1_txt.value= '';
    utargtype1_txt.value= '';
    uweaptype1_txt.value= '';
}
function clearInsertFields(){
    year.value = "";
    month.value = "";
    day.value = "";
    country.value = "";
    city.value = "";
    latitude.value = "";
    longitude.value = "";
    success.value = "";
    suicide.value = "";
    attacktype1_txt.value = "";
    targtype1_txt.value = "";
    weaptype1_txt.value = "";

}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }



