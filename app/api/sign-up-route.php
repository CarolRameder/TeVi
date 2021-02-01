<?php
 include_once "../model/mlogin.php";
include_once "../model/mBD.php";

$chartRoutes = [
    [
        "method" => "POST",
        "route" => "signUp",
        "handler" => "insertUser"
    ]

   
];


function insertUser($req) {
    
	$model= new MLogIn();
    $data = $req['payload'];
    print_r($data);
	if ($model->insertUser($data->name, $data->user,$data->password)){
        Response::status(200);
        Response::json(['response' => 'user inserted']);
    }
    else{
        Response::status(400);
        Response::json(['response' => 'username not unique']);
    }
    
}

