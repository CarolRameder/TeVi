<?php
 
include_once "../model/mchart.php";
include_once "../model/mBD.php";
include_once "../model/madmin.php";

 
$chartRoutes = [
    // statistics for chart
    [
        "method" => "POST",
        "middlewares" => ["isLoggedIn"],
        "route" => "charts",
        "handler" => "getChartData"
    ],

    // all data about events that happened in a country
    [
        "method" => "GET",
        "route" => "attacks/:country",
        "handler" => "getChartDataByCountry"
    ],
      
    //delete an attack by id
    [
        "method" => "DELETE",
        "middlewares" => ["isAdmin"],
        "route" => "attack/:id",
        "handler" => "deleteAttack"
    ],

    //add an attack
    [
        "method" => "POST",
        "middlewares" => ["isAdmin"],
        "route" => "attacks",
        "handler" => "addAttack"
    ],
   
    // update one attack
    [
        "method" => "PUT",
        "middlewares" => ["isAdmin"],
        "route" => "attack",
        "handler" => "updateAttack"
    ],
      // get attack by id for update
      [
        "method" => "GET",
        "route" => "attack/:id",
        "handler" => "getAttackById"
    ],

    //delete user by username
    [
        "method" => "DELETE",
        "middlewares" => ["isAdmin"],
        "route" => "users/:user",
        "handler" => "deleteUser"
    ],

    //update user privileges
    [
        "method" => "PUT",
        "middlewares" => ["isAdmin"],
        "route" => "users",
        "handler" => "operateAdmin"
    ]
   
];
 
function updateAttack($req){
    $payload = $req['payload'];
    $model = new MAdmin();
    $response = $model->updateAttack($payload);
    if (!$response){
        Response::status(400);
        Response::json(['response' => 'invalid id']);
        exit();
    }
    Response::status(200);
    Response::json(['response' => 'attack updated']);


}

function processRawData($raw_data){
    $index = 0;
    $data = array();
    foreach($raw_data as $line){
        $data[$index] = array();
        foreach($line as $key => $value){

            if (!is_numeric($key)){
                $data[$index][$key] = $value;
            }
        }
        $index = $index + 1;
    }
    return $data;
}

function getAttackById($req){
    $id = $req['params']['id'];
    $model = new MAdmin();
    $raw_data = $model->getAttackById($id);

    if($raw_data==NULL){
        
        Response::status(204); // no content
        exit();
    }
     $data = array();
        foreach($raw_data[0] as $key => $value){

            if (!is_numeric($key)){
                $data[$key] = $value;
            }
        }    
        
    Response::status(200);
    Response::json($data); 


    
}
 
function addAttack($req)
{
   $model = new MAdmin();
   $payload = $req['payload'];  
   $response = $model->insertAtt($payload);
   if($response){
    Response::status(200);
    Response::json(['response' => 'attack inserted']);
    exit();
    }
  
   Response::status(400);
   Response::json(['response' => 'unknown error']);

}

function deleteAttack($req)
{
   $model = new MAdmin();
   $id=$req['params']['id'];
   $response = $model->deleteAtt($id);
   if($response){
    Response::status(200);
    Response::json(['response' => 'attack deleted']);
    exit();
    }
  
   Response::status(204);
   Response::json(['response' => 'invalid attack id']);
   
}

 //----------------------------------------------------
function deleteUser($req)
{
   $model = new MAdmin();
   $id=$req['params']['user'];
   $response = $model->deleteUser($id);
   if($response){
    Response::status(200);
    Response::json(['response' => 'user deleted']);
    exit();
   }
   Response::status(204);
   Response::json(['response' => 'unvalid user id']);
   
   
}

function operateAdmin($req)
{
    $model = new MAdmin();
    $payload = $req['payload'];  
    $response = $model->operateUser($payload);
    if($response){
        Response::status(200);
        Response::json(['response' => 'user type updated']);
        exit();
       }
       Response::status(204);
       Response::json(['response' => 'invalid user id']);
   
}

 
function getChartData($req) {
    $modifiedPayload = $req['payload'];
    $model = new MChart();
    $raw_data = $model->getDistinctAndCount($modifiedPayload);

    if($raw_data==NULL){
        Response::status(204); // no content
    }

    $data = array();
    $index = 0;
    foreach($raw_data as $line){
        $data[$index] = array();
        $data[$index]['to_graph'] = $line['to_graph'];
        $data[$index]['value'] = intval($line['value']);  
        $index++;
    }
    
    Response::status(200);
    Response::json($data);
}

function getChartDataByCountry($req){
    $country = $req['params']['country']; 
    
    $model = new MChart();
    $raw_data = $model->getByCountry($country);

    if($raw_data==NULL){
        Response::status(204); // no content
        exit();
    }
    $data = processRawData($raw_data);
    
    Response::status(200);
    Response::json($data);
   
}

